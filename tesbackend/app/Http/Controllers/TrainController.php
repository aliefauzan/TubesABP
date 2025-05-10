<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Train;
use App\Services\SupabaseService;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class TrainController extends Controller
{
    protected $supabase;
    
    public function __construct(SupabaseService $supabase)
    {
        $this->supabase = $supabase;
    }
    
    public function search(Request $request)
    {
        try {
            $request->validate([
                'departure_station' => 'required|exists:stations,id',
                'arrival_station' => 'required|exists:stations,id|different:departure_station',
                'date' => 'required|date|after_or_equal:today',
            ]);
            
            // Hybrid query - Laravel Eloquent with Supabase realtime
            $trains = Train::with(['departureStation', 'arrivalStation'])
                ->where('departure_station_id', $request->departure_station)
                ->where('arrival_station_id', $request->arrival_station)
                ->whereDate('departure_time', $request->date)
                ->where('available_seats', '>', 0)
                ->orderBy('departure_time')
                ->get();
                
            if ($trains->isEmpty()) {
                return response()->json([
                    'message' => 'No trains found for the selected criteria',
                    'trains' => []
                ], 200);
            }
                
            return response()->json([
                'trains' => $trains
            ], 200);
        } catch (ValidationException $e) {
            Log::warning('Train search validation failed', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Train search error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            return response()->json(['error' => 'An error occurred while searching for trains'], 500);
        }
    }
    
    public function getPromoTrains()
    {
        try {
            // Use Supabase directly for complex queries
            $response = $this->supabase->postgrest
                ->from('trains')
                ->select('*,departure_station_id(*),arrival_station_id(*)')
                ->gt('available_seats', 10)
                ->where('is_promo', true)
                ->order('price')
                ->limit(3)
                ->execute();
                
            if (empty($response->getData())) {
                return response()->json([
                    'message' => 'No promotional trains available',
                    'trains' => []
                ], 200);
            }
                
            return response()->json($response->getData());
        } catch (\Exception $e) {
            Log::error('Promo trains fetch error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'An error occurred while fetching promotional trains'], 500);
        }
    }

    public function allTrains()
    {
        try {
            $trains = Train::with(['departureStation', 'arrivalStation'])
                ->orderBy('departure_time')
                ->get();
                
            if ($trains->isEmpty()) {
                return response()->json([
                    'message' => 'No trains available',
                    'trains' => []
                ], 200);
            }
                
            return response()->json(['trains' => $trains]);
        } catch (\Exception $e) {
            Log::error('All trains fetch error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'An error occurred while fetching trains'], 500);
        }
    }
}
