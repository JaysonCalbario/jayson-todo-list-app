<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use App\Events\TodoCreated;
use App\Events\TodoUpdated;
use App\Events\TodoDeleted;

use App\Events\TodoOrderUpdated;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Todo::orderBy('position')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'completed' => false,
        ]);

        broadcast(new TodoCreated($todo))->toOthers();

        return response()->json($todo, 201);
    }

    public function show(string $id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    public function update(Request $request, string $id)
    {
        $todo = Todo::findOrFail($id);

        $request->validate([
            'title' => 'string|max:255',
            'completed' => 'boolean',
        ]);

        $todo->update($request->only(['title', 'completed']));

        broadcast(new TodoUpdated($todo))->toOthers();

        return response()->json($todo);
    }

    public function reorder(Request $request)
    {
        $ids = $request->input('ids');
    
        if (!is_array($ids)) {
            return response()->json(['error' => 'Invalid format'], 400);
        }
    
        foreach ($ids as $index => $id) {
            Todo::where('id', $id)->update(['position' => $index]);
        }
    
        broadcast(new \App\Events\TodoOrderUpdated($ids))->toOthers();
    
        return response()->json(['message' => 'Reordered successfully']);
    }
    
    public function destroy(string $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        broadcast(new TodoDeleted($todo->id))->toOthers();

        return response()->json(['message' => 'Todo deleted']);
    }
}
