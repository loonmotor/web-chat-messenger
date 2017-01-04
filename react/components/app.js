import React, {Component} from 'react';
import PanelUsers from './panel-users';
import PanelChats from './panel-chats';
import {connect} from 'react-redux';
import FacebookLoginContainer from './facebook-login-container';

@connect(store => ({
    user: store.user
}))
export default class App extends Component {
    render() {
        return (
            <div>
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