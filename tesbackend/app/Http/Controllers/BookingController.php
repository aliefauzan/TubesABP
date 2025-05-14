<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Train;
use App\Services\SupabaseService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
                'travel_date' => 'required|date|after_or_equal:today',
                'passenger_name' => 'required|string|min:3',
                'passenger_id_number' => 'required|string',
                'passenger_dob' => 'required|date',
                'passenger_gender' => 'required|in:male,female',
                'payment_method' => 'required|in:transfer',
                'seat_number' => 'required|string',
            ]);
            
            return DB::transaction(function () use ($request) {
                $train = Train::lockForUpdate()->findOrFail($request->train_id);

                if ($train->available_seats <= 0) {
                    return response()->json(['message' => 'No available seats for this train'], 400);
                }

                // Check if seat is already booked
                $existingBooking = Booking::where('train_id', $train->id)
                    ->where('travel_date', $request->travel_date)
                    ->where('seat_number', $request->seat_number)
                    ->where('status', '!=', 'cancelled')
                    ->first();

                if ($existingBooking) {
                    return response()->json(['message' => 'This seat is already booked'], 400);
                }

                // Decrement available seats
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
            });
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Booking error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create booking. Please try again.'], 500);
        }
    }
    
    public function history(Request $request)
    {
        try {
            $request->validate([
                'user_uuid' => 'required|uuid|exists:users,uuid',
            ]);

            $bookings = Booking::with(['train.departureStation', 'train.arrivalStation'])
                ->where('user_uuid', $request->user_uuid)
                ->orderBy('created_at', 'desc')
                ->get();
                                                 
            return response()->json($bookings);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Booking history error: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch booking history. Please try again.'], 500);
        }
    }
}