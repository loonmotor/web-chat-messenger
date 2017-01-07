import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import {signInUser} from '../redux/action';
import cookie from 'react-cookie';

@connect(store => ({
    chatServer: store.chatServer
}))
export default class FacebookLoginContainer extends Component {
    responseFacebook(response) {
        if (response.id) {
            this.props.dispatch(signInUser(response));
        }
    }
    render() {
        return (
            <div className="facebook-login">

                <FacebookLogin
                    appId="371359853214253"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={this.responseFacebook.bind(this)} />

                {this.props.chatServer === 'connecting' && 
                    <div>
                        <div className="loader loader-default is-active" data-text="Connecting to chat server" data-blink></div>
                    </div>
                }

                {this.props.chatServer === 'error' &&
                    <div>Error connecting to chat server</div>
                }
                
            </div>
        );
    }
}