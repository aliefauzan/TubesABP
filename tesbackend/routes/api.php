<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])
         ->middleware(['auth:sanctum', 'auth.supabase']);
    Route::get('/user', [AuthController::class, 'user'])
         ->middleware(['auth:sanctum', 'auth.supabase']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Train routes
    Route::get('/trains/search', [TrainController::class, 'search']);
    Route::get('/trains/promo', [TrainController::class, 'getPromoTrains']);
    
    // Booking routes
    Route::post('/bookings', [BookingController::class, 'book']);
    Route::get('/bookings/history', [BookingController::class, 'history']);
    
    // Payment routes
    Route::post('/payments/{id}/upload', [PaymentController::class, 'uploadProof']);
});