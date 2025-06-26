<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use App\Events\MessageSent;
use Inertia\Inertia;
use App\Events\TodoCreated;
use App\Events\TestBroadcast;

// ✅ Simple API response for root endpoint
Route::get('/', function () {
    return response()->json([
        'message' => 'Laravel backend is working!',
    ]);
});

Route::get('/test-broadcast', function () {
    event(new TestBroadcast('Hello from browser route!'));
    return 'Broadcast sent!';
});


// ✅ Authenticated Inertia dashboard (optional)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// ✅ Include additional route files
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
