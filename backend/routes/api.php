<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Events\TodoCreated;
use App\Events\TestBroadcast;
use App\Http\Controllers\TodoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'Test route is working!!!']);
});

Route::get('/broadcast', function () {
    event(new \App\Events\TestBroadcast('Hello from Soketi!'));
    return 'Event dispatched!';
});

Route::post('/chat/send', function (Request $request) {
    broadcast(new \App\Events\ChatMessage(
        $request->senderId,
        $request->message
    ))->toOthers();
    return response()->noContent();
});

Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'store']);
Route::put('/todos/reorder', [TodoController::class, 'reorder']);
Route::put('/todos/{id}', [TodoController::class, 'update']);

Route::delete('/todos/{id}', [TodoController::class, 'destroy']);