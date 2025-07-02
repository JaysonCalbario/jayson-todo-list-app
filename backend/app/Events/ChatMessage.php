<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ChatMessage implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $senderId;
    public $message;

    public function __construct($senderId, $message)
    {
        $this->senderId = $senderId;
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('chat-channel');
    }

    public function broadcastAs()
    {
        return 'new-message';
    }

    public function broadcastWith()
    {
        return [
            'senderId' => $this->senderId,
            'message' => $this->message,
        ];
    }
}