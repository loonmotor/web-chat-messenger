import React, {Component} from 'react';
import moment from 'moment';

export default class ChatMessageList extends Component {
    render() {
        const {message} = this.props;
        return (
            <div className="col s12">
                <div className={'card-panel ' + (this.props.user.id === message.user.id ? 'blue' : 'teal lighten-1')}>
                    <span className="white-text">
                        <strong>{message.user.name}</strong> <small className="message-timestamp">{moment(message.sent).format('Do MMM YYYY HH:mm:ss')}</small>
                        <div className="clear"></div>
                        <span>{message.content}</span>
                    </span>
                </div>
            </div>
        );
    }
}