<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class TodoOrderUpdated implements ShouldBroadcast
{
    use SerializesModels;

    public array $ids;

    public function __construct(array $ids)
    {
        $this->ids = $ids;
    }

    public function broadcastOn()
    {
        return new Channel('todos');
    }

    public function broadcastAs()
    {
        return 'TodoOrderUpdated';
    }
}
