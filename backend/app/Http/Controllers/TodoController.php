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

    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            return response()->json([
                'message' => "You are not authorized to update this todo."
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => "nullable|string|max:1000",
            'is_done' => 'boolean'
        ]);

        $todo->update($validated);

        return response()->json([
            'message' => "Todo updated successfully.",
            'todo' => $todo
        ], 200);
    }

    public function destroy(Request $request, Todo $todo)
    {
        // if user not authorized
        if ($todo->user_id !== $request->user()->id) {
            return response()->json([
                'message' => "You are not authorized to delete this todo."
            ], 403);
        }

        // find todo for delete
        $todo->delete();

        return response()->json([
            'message' => "Todo deleted successfully."
        ], 200);
    }

    protected function authorizeTodo(Todo $todo) {}
}
