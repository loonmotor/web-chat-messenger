import React, {Component} from 'react';
import UserBubble from './user-bubble';
import {connect} from 'react-redux';
import {updateUsers} from '../redux/action';
import _ from 'lodash';

@connect(store => ({
    users: store.users,
    socket: store.socket,
    user: store.user,
    muted: store.muted
}))
export default class PanelUsers extends Component {
    componentDidMount() {
        this.props.socket.on('updateUsers', users => {
            console.log(users);
            this.props.dispatch(updateUsers(users));
        });
    }
    render() {
        return (
            <div className="col s4 m2 panel-users">
                {this.props.users.activeUsers.length > 0 &&
                    <div>
                        <h6>Active users</h6>
                        <ul className="collection active-users">
                            {_.sortBy(this.props.users.activeUsers, o => o.name).map(user => {
                                return (
                                    <UserBubble key={user.id} user={user} me={this.props.user} dispatch={this.props.dispatch} muted={this.props.muted} />
                                );
                            })}
                        </ul>
                    </div>
                }
                {this.props.users.idleUsers.length > 0 &&
                    <div>
                        <h6>Idle users</h6>
                        <ul className="collection">
                            {_.sortBy(this.props.users.idleUsers, o => o.name).map(user => {
                                return (
                                    <UserBubble key={user.id} user={user} me={this.props.user} dispatch={this.props.dispatch} muted={this.props.muted} />
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}