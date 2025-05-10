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
            'passenger_name' => 'required|string|min:3',
            'passenger_id_number' => 'required|string',
            'passenger_dob' => 'required|date',
            'passenger_gender' => 'required|in:male,female',
            'payment_method' => 'required|in:transfer',
        ]);
        
        $train = Train::findOrFail($request->train_id);
        
        // Use Supabase RPC to decrement seats atomically
        $response = $this->supabase->rpc('decrement_train_seats', ['train_id' => $train->id]);
        \Log::error('Supabase RPC response', [
            'status' => $response->status(),
            'body' => $response->body()
        ]);
        if ($response->status() !== 200) {
            return response()->json(['message' => 'Failed to book'], 400);
        }
        
        $booking = Booking::create([
            'transaction_id' => 'KX-' . Str::random(10),
            'user_uuid' => auth()->user()->uuid,
            'train_id' => $train->id,
            'travel_date' => $request->travel_date,
            'passenger_name' => $request->passenger_name,
            'passenger_id_number' => $request->passenger_id_number,
            'passenger_dob' => $request->passenger_dob,
            'passenger_gender' => $request->passenger_gender,
            'payment_method' => $request->payment_method,
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