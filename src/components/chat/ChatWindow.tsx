
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, User } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getChatMessages, sendChatMessage } from '@/utils/api';

interface ChatWindowProps {
  recipientId: string;
  recipient: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ recipientId, recipient }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history
  useEffect(() => {
    if (!currentUser) return;

    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const loadedMessages = await getChatMessages(currentUser.id, recipientId);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
    
    // Mock real-time updates
    const interval = setInterval(() => {
      loadMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentUser, recipientId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentUser || !newMessage.trim()) return;

    try {
      const message = await sendChatMessage({
        senderId: currentUser.id,
        receiverId: recipientId,
        content: newMessage,
      });

      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="text-5xl mb-4">👋</div>
            <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            <p className="text-sm text-gray-500">
              Send a message to begin chatting with {recipient.name}
            </p>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {messages.map((message) => {
              const isOwnMessage = message.senderId === currentUser?.id;
              
              return (
                <div 
                  key={message.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-end gap-2`}>
                    {!isOwnMessage && (
                      <Avatar 
                        src={recipient.profileImage}
                        name={recipient.name}
                        size="sm"
                        className="mb-1"
                      />
                    )}
                    
                    <div>
                      <div 
                        className={`rounded-lg px-3 py-2 ${
                          isOwnMessage 
                            ? 'bg-thrive-purple text-white rounded-br-none' 
                            : 'bg-gray-100 rounded-bl-none'
                        }`}
                      >
                        {message.content}
                      </div>
                      <div 
                        className={`text-xs mt-1 text-gray-500 ${
                          isOwnMessage ? 'text-right' : 'text-left'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t p-3">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
