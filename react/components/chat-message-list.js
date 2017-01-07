import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incomingMessage} from '../redux/action';
import ChatMessageBubble from './chat-message-bubble';

@connect(store => ({
    messages: store.messages,
    socket: store.socket,
    user: store.user
}))
export default class ChatMessageList extends Component {
    componentDidMount() {
        this.props.socket.on('message', message => {
            this.props.dispatch(incomingMessage(message));
        });
    }
    render() {
        return (
            <div className="row chat-messages">
                <div className="col s12">
                    <div className="row">
                        {this.props.messages.map(message => {
                            return (
                                <ChatMessageBubble message={message} user={this.props.user} key={message.id}/>
                            );
                        })}
                        
                    </div>
                </div>
            </div>
        );
    }
}