import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
    <table class="table top-to-header">
        {messages.map(message => (
            <MessageItem 
                key={message.uid}
                message={message}
                onEditMessage={onEditMessage}
                onRemoveMessage={onRemoveMessage}
            />
        ))}
    </table>
);

export default MessageList;