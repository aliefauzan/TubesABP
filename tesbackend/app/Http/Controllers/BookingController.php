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
        try {
            $request->validate([
                'user_uuid' => 'required|uuid|exists:users,uuid',
                'train_id' => 'required|exists:trains,id',
                'travel_date' => 'required|date',
                'passenger_name' => 'required|string|min:3',
                'passenger_id_number' => 'required|string',
                'passenger_dob' => 'required|date',
                'passenger_gender' => 'required|in:male,female',
                'payment_method' => 'required|in:transfer',
                'seat_number' => 'required|string',
            ]);
            
            $train = Train::findOrFail($request->train_id);

            if ($train->available_seats <= 0) {
                return response()->json(['message' => 'No available seats for this train'], 400);
            }
            // Decrement available seats locally
            $train->available_seats -= 1;
            $train->save();

            $booking = Booking::create([
                'transaction_id' => 'KX-' . Str::random(10),
                'user_uuid' => $request->user_uuid,
                'train_id' => $train->id,
                'travel_date' => $request->travel_date,
                'passenger_name' => $request->passenger_name,
                'passenger_id_number' => $request->passenger_id_number,
                'passenger_dob' => $request->passenger_dob,
                'passenger_gender' => $request->passenger_gender,
                'seat_number' => $request->seat_number,
                'payment_method' => $request->payment_method,
                'status' => 'pending',
                'total_price' => $train->price,
            ]);
            
            return response()->json($booking, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    
    public function history(Request $request)
    {
        try {
            $request->validate([
                'user_uuid' => 'required|uuid|exists:users,uuid',
            ]);

            $user = \App\Models\User::where('uuid', $request->user_uuid)->first();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $bookings = Booking::with(['train.departureStation', 'train.arrivalStation'])
                ->where('user_uuid', $user->uuid)
                ->orderBy('created_at', 'desc')
                ->get();
                                                 
                return response()->json($bookings);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Internal server error'], 500);
            }
    }
}