import React, {Component} from 'react';
import {toggleMute} from '../redux/action';

export default class UserBubble extends Component {
    toggleMute(userId) {
        this.props.dispatch(toggleMute(userId));
    }
    render() {
        const {user, me, muted} = this.props;
        return (
            <li className="collection-item avatar">
                <img src={user.pictureUrl} className="circle"/>
                <span className="title">{user.name} {me.id === user.id ? '(me)' : ''}</span>
                {me.id !== user.id &&
                    <span>
                        {muted[user.id] ?
                            (
                                <a className="btn-floating waves-effect waves-light red mute" onClick={this.toggleMute.bind(this, user.id)}><i className="material-icons">volume_mute</i></a>
                            ) :
                            (
                                <a className="btn-floating waves-effect waves-light red mute" onClick={this.toggleMute.bind(this, user.id)}><i className="material-icons">volume_up</i></a>
                            )
                        }
                    </span>
                }
            </li>
        );
    }
}