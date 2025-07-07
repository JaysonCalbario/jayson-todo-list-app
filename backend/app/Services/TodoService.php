<?php

namespace App\Services;

use App\Models\Todo;
use App\Events\TodoCreated;
use App\Events\TodoUpdated;
use App\Events\TodoDeleted;
use App\Events\TodoOrderUpdated;
use Illuminate\Database\Eloquent\Collection;

class TodoService
{
    public function getAllTodos(): Collection
    {
        return Todo::orderBy('position')->get();
    }

    public function getTodoById(string $id): Todo
    {
        return Todo::findOrFail($id);
    }

    public function createTodo(array $data): Todo
    {
        $todo = Todo::create([
            'title' => $data['title'],
            'completed' => false,
        ]);

        broadcast(new TodoCreated($todo))->toOthers();
        return $todo;
    }

    public function updateTodo(string $id, array $data): Todo
    {
        $todo = Todo::findOrFail($id);
        $todo->update($data);

        broadcast(new TodoUpdated($todo))->toOthers();
        return $todo;
    }

    public function reorderTodos(array $ids): void
    {
        foreach ($ids as $index => $id) {
            Todo::where('id', $id)->update(['position' => $index]);
        }

        broadcast(new TodoOrderUpdated($ids))->toOthers();
    }

    public function deleteTodo(string $id): void
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        broadcast(new TodoDeleted($todo->id))->toOthers();
    }
}