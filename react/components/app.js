import React, {Component} from 'react';
import PanelUsers from './panel-users';
import PanelChats from './panel-chats';
import {connect} from 'react-redux';
import FacebookLoginContainer from './facebook-login-container';
import {registerSocket, incomingMessages} from '../redux/action';
import Notifications from 'react-notify-toast';

@connect(store => ({
    user: store.user
}))
export default class App extends Component {
    componentDidMount() {
        this.props.socket.on('messages', messages => {
            this.props.dispatch(incomingMessages(messages));
        });
    }
    constructor(props) {
        super(props);
        console.log(this.props.socket);
        this.props.dispatch(registerSocket(this.props.socket));
    }
    render() {
        return (
            <div>
                <Notifications/>
            {
                this.props.user.id ?
                (
                    <div className="row">
                        <PanelUsers/>
                        <PanelChats/>
                    </div>
                ) :
                (
                    <FacebookLoginContainer/>
                )
            }
            </div>
        );
    }
}