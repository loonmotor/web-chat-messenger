import React, {Component} from 'react';

export default class ChatMessageList extends Component {
    render() {
        return (
            <div className="row chat-messages">
                <div className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="card-panel teal">
                                <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                                </span>
                            </div>
                        </div>
                        <div className="col s12">
                            <div className="card-panel teal">
                                <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                                </span>
                            </div>
                        </div>
                        <div className="col s12">
                            <div className="card-panel teal">
                                <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                                    I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}