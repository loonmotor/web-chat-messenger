import React, {Component} from 'react';
import ChatMessageList from './chat-message-list';
import ChatMessageInput from './chat-message-input';

export default class PanelChats extends Component {
    render() {
        return (
            <div className="col s8 m10 offset-s4 offset-m2 panel-chats">
                <ChatMessageList/>
                <ChatMessageInput/>
            </div>

        );
    }
}