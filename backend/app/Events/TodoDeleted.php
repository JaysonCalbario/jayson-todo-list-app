<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class TodoDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $todoId;

    public function __construct($todoId)
    {
        $this->todoId = $todoId;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('todos');
    }

    public function broadcastAs(): string
    {
        return 'TodoDeleted';
    }
}
