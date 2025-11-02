<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $todos = $request->user()->todos()->latest()->get();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_done' => "boolean"
        ]);

        $todo = $request->user()->todos()->create([
            'title' => $request->title,
            'description' => $request->description,
            'is_done' => $request->is_done ?? false,
        ]);

        return response()->json([
            'message' => "Todo created successfully.",
            'todo' => $todo
        ], 201);
    }

    public function show() {}

    public function update() {}

    public function destroy() {}

    protected function authorizeTodo(Todo $todo) {}
}
