import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUsers} from '../redux/action';
import _ from 'lodash';

@connect(store => ({
    users: store.users,
    socket: store.socket,
    user: store.user
}))
export default class PanelUsers extends Component {
    componentDidMount() {
        this.props.socket.on('updateUsers', users => {
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
                                    <li key={user.id} className="collection-item avatar">
                                        <img src={user.pictureUrl} className="circle"/>
                                        <span className="title">{user.name} {this.props.user.id === user.id ? '(me)' : ''}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
                {this.props.users.idleUsers.length > 0 &&
                    <ul className="collection">
                        {_.sortBy(this.props.users.idleUsers, o => o.name).map(user => {
                            return (
                                <li key={user.id} className="collection-item avatar">
                                    <img src={user.pictureUrl} className="circle"/>
                                    <span className="title">{user.name} {this.props.user.id === user.id ? '(me)' : ''}</span>
                                </li>
                            );
                        })}
                    </ul>
                }
            </div>
        );
    }
}