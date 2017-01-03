import React, {Component} from 'react';

export default class ChatMessageInput extends Component {
    render() {
        return (
            <div className="row message-input">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="message" type="text" className="validate"/>
                            <label htmlFor="message">Message</label>
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}