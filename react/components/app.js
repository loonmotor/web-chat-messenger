import React, {Component} from 'react';
import PanelUsers from './panel-users';
import PanelChats from './panel-chats';

export default class App extends Component {
    render() {
        return (
            <div className="row">
                <PanelUsers/>
                <PanelChats/>
            </div>
        );
    }
}