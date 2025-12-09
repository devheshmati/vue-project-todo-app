<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::middleware(['throttle:10,1'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/test-register', [AuthController::class, 'testRegister']); // this is for test we remove that after
});

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('todos', TodoController::class);
});

Route::get('/ping', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['status' => 'ok'], 200);
    } catch (\Exception $e) {
        return response()->json(['errro' => 'Database connection failed'], 500);
    };
});

Route::fallback(function () {
    return response()->json(['message' => "Route Not Found!"], 404);
});
