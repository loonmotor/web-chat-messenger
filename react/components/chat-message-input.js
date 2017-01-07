import React, {Component} from 'react';
import {connect} from 'react-redux';
import {typing, submitMessage, clearInput} from '../redux/action';

@connect(store => ({
    chatInput: store.chatInput
}))
export default class ChatMessageInput extends Component {
    submitMessage(event) {
        event.preventDefault();
        if (this.props.chatInput) {
            this.props.dispatch(submitMessage(this.props.chatInput));
            this.props.dispatch(clearInput());
        }
    }
    typing(event) {
        this.props.dispatch(typing(event.target.value));
    }
    render() {
        return (
            <div className="row message-input">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="message" type="text" value={this.props.chatInput} className="validate" onChange={this.typing.bind(this)} />
                            <label htmlFor="message">Enter your message here</label>
                            <button className="btn waves-effect waves-light" type="submit" onClick={this.submitMessage.bind(this)} name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}