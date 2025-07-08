<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Services\TodoService;
use App\Http\Requests\Todo\StoreRequest;
use App\Http\Requests\Todo\UpdateRequest;
use App\Http\Requests\Todo\ReorderRequest;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    protected TodoService $service;

    public function __construct(TodoService $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->service->getAllTodos());
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $todo = $this->service->createTodo($request->validated());
        return response()->json($todo, 201);
    }

    public function show(string $id): JsonResponse
    {
        $todo = $this->service->getTodoById($id);
        return response()->json($todo);
    }

    public function update(UpdateRequest $request, string $id): JsonResponse
    {
        $todo = $this->service->updateTodo($id, $request->validated());
        return response()->json($todo);
    }

    public function reorder(ReorderRequest $request): JsonResponse
    {
        $this->service->reorderTodos($request->validated()['ids']);
        return response()->json(['message' => 'Reordered successfully']);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->service->deleteTodo($id);
        return response()->json(['message' => 'Todo deleted']);
    }
}
