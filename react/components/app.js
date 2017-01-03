import React, {Component} from 'react';
import PanelUsers from './panel-users';
import PanelChats from './panel-chats';
import FacebookLogin from 'react-facebook-login';

export default class App extends Component {
    componentClicked() {

    }
    responseFacebook() {
        
    }
    render() {
        return (
            <div>
                <div className="facebook-login">
                    <FacebookLogin
                        appId="371359853214253"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        callback={this.responseFacebook} />
                </div>
                <div className="row">
                    <PanelUsers/>
                    <PanelChats/>
                </div>
            </div>
        );
    }
}