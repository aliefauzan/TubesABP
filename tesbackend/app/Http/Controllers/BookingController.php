<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Train;
use App\Services\SupabaseService;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    protected $supabase;
    
    public function __construct(SupabaseService $supabase)
    {
        $this->supabase = $supabase;
    }
    
    public function book(Request $request)
    {
        $request->validate([
            'train_id' => 'required|exists:trains,id',
            'travel_date' => 'required|date',
            'passenger_name' => 'required|string',
            'passenger_id_number' => 'required|string',
            'passenger_dob' => 'required|date',
            'passenger_gender' => 'required|in:male,female',
        ]);
        
        $train = Train::findOrFail($request->train_id);
        
        // Use Supabase RPC to decrement seats atomically
        $response = $this->supabase->postgrest
            ->rpc('decrement_train_seats', ['train_id' => $train->id])
            ->execute();
            
        if ($response->getStatusCode() !== 200) {
            return response()->json(['message' => 'Failed to book'], 400);
        }
        
        $booking = Booking::create([
            'transaction_id' => 'KX-' . Str::random(10),
            'user_id' => auth()->id(),
            'train_id' => $train->id,
            'travel_date' => $request->travel_date,
            'passenger_name' => $request->passenger_name,
            'passenger_id_number' => $request->passenger_id_number,
            'passenger_dob' => $request->passenger_dob,
            'passenger_gender' => $request->passenger_gender,
            'status' => 'pending',
            'total_price' => $train->price,
        ]);
        
        return response()->json($booking, 201);
    }
    
    public function history()
    {
        $bookings = Booking::with(['train.departureStation', 'train.arrivalStation'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($bookings);
    }
}