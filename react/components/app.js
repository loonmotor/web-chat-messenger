import React, {Component} from 'react';
import PanelUsers from './panel-users';
import PanelChats from './panel-chats';
import {connect} from 'react-redux';
import FacebookLoginContainer from './facebook-login-container';
import io from 'socket.io-client';
import {registerSocket} from '../redux/action';
import Notifications from 'react-notify-toast';

@connect(store => ({
    user: store.user
}))
export default class App extends Component {
    constructor(props) {
        super(props);
        const socket = io('http://localhost:3000');
        this.props.dispatch(registerSocket(socket));
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