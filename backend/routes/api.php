<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/test-register', [AuthController::class, 'testRegister']);
Route::get('/todos', [TodoController::class, 'index']);

Route::fallback(function () {
    return response()->json(['message' => "Route Not Found!"], 404);
});
