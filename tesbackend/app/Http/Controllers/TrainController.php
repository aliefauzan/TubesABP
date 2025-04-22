<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Train;
use App\Services\SupabaseService;

class TrainController extends Controller
{
    protected $supabase;
    
    public function __construct(SupabaseService $supabase)
    {
        $this->supabase = $supabase;
    }
    
    public function search(Request $request)
    {
        $request->validate([
            'departure_station' => 'required|exists:stations,id',
            'arrival_station' => 'required|exists:stations,id',
            'date' => 'required|date',
        ]);
        
        // Hybrid query - Laravel Eloquent with Supabase realtime
        $trains = Train::with(['departureStation', 'arrivalStation'])
            ->where('departure_station_id', $request->departure_station)
            ->where('arrival_station_id', $request->arrival_station)
            ->whereDate('departure_time', $request->date)
            ->where('available_seats', '>', 0)
            ->get();
            
        // Set up realtime subscription
        $subscription = $this->supabase->subscribeToRealtime(
            'trains',
            'UPDATE',
            function($payload) {
                // Handle realtime updates
                event(new \App\Events\TrainUpdated($payload));
            }
        );
        
        return response()->json([
            'trains' => $trains,
            'subscription_id' => $subscription->getId()
        ]);
    }
    
    public function getPromoTrains()
    {
        // Use Supabase directly for complex queries
        $response = $this->supabase->postgrest
            ->from('trains')
            ->select('*,departure_station_id(*),arrival_station_id(*)')
            ->gt('available_seats', 10)
            ->order('price')
            ->limit(3)
            ->execute();
            
        return response()->json($response->getData());
    }
}