<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\StationController;

// Auth routes without middleware
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user/{id?}', [AuthController::class, 'user']);
Route::get('/trains/all', [TrainController::class, 'allTrains']);
Route::get('/stations', [StationController::class, 'index']);
Route::post('/bookings', [BookingController::class, 'book']);
Route::get('/bookings/history', [BookingController::class, 'history']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user/{id?}', [AuthController::class, 'user']);
    
    // Train routes
    Route::get('/trains/search', [TrainController::class, 'search']);
    Route::get('/trains/promo', [TrainController::class, 'getPromoTrains']);
    Route::get('/trains/{id}/available-seats', [TrainController::class, 'availableSeats']);
    
    // Station routes
    Route::get('/stations', [StationController::class, 'index']);
    
    // Booking routes
    Route::post('/bookings', [BookingController::class, 'book']);
    Route::get('/bookings/history', [BookingController::class, 'history']);
    
    // Payment routes
    Route::post('/payments/{id}/upload', [PaymentController::class, 'uploadProof']);
});
