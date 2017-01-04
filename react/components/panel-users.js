import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {updateUsers} from '../redux/action';

@connect(store => ({
    users: store.users
}))
export default class PanelUsers extends Component {
    componentDidMount() {
        const
            socket = io.connect('http://localhost:3000');
        socket.on('updateUsers', users => {
            this.props.dispatch(updateUsers(users));
        });
    }
    render() {
        console.log(this.props);
        return (
            <div className="col s4 m2 panel-users">
                <ul className="collection">
                    {this.props.users.map(user => {
                        return (
                            <li key={user.id} className="collection-item">
                                <img src={user.pictureUrl}/>
                                {user.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}