<?php

namespace Tests\Unit;

use App\Models\Booking;
use App\Models\Train;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_booking()
    {
        $user = User::factory()->create();
        $train = Train::factory()->create();

        $booking = Booking::factory()->create([
            'user_id' => $user->id,
            'train_id' => $train->id,
            'seat_number' => 'A1',
            'status' => 'confirmed',
            'total_price' => 150.75,
        ]);

        $this->assertInstanceOf(Booking::class, $booking);
        $this->assertEquals($user->id, $booking->user_id);
        $this->assertEquals($train->id, $booking->train_id);
        $this->assertEquals('A1', $booking->seat_number);
        $this->assertEquals('confirmed', $booking->status);
        $this->assertEquals(150.75, $booking->total_price);
    }

    public function test_user_relationship()
    {
        $booking = new Booking();
        $relation = $booking->user();
        $this->assertEquals('user_id', $relation->getForeignKeyName());
        $this->assertEquals(User::class, $relation->getRelated()::class);
    }

    public function test_train_relationship()
    {
        $booking = new Booking();
        $relation = $booking->train();
        $this->assertEquals('train_id', $relation->getForeignKeyName());
        $this->assertEquals(Train::class, $relation->getRelated()::class);
    }
}
