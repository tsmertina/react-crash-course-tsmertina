import axios from 'axios';
import React from 'react';
import RequestUI from './RequestUI';

class Request extends React.Component {
    state = {
        response: {},
        isCancelled: false,
        isRequested: false,
        processing: false,
        error: '',
    }

    createRequest = (param) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        let cancel = source.token;

        if (param) {
            source.cancel();
            this.setState({
                isCancelled: true
            })
        }
        axios.get('https://randomuser.me/api/',
            { cancelToken: cancel }
        ).then((response) => {
            !this.state.isCancelled && this.setState({
                response: response.data,
                processing: false
            });
        }).catch(error => {
            if (axios.isCancel(error)) {
                this.setState({
                    error: this.state.isRequested ? 'Request cancelled' : 'Request wasn`t created',
                    processing: false,
                    response: []
                });
            } else {
                this.setState({
                    error: error.message,
                    processing: false
                });
            }
         });
    }

    createTimeoutRequest = () => {
        this.setState({
            response: [],
            isRequested: true,
            processing: true,
            isCancelled: false,
            error: ''
        });
        setTimeout(() => this.createRequest(), 2000);
    }

    render() {
        const { response, error, processing } = this.state;
        let info = response.results? `${response.results[0].name.title} ${response.results[0].name.first} ${response.results[0].name.last}` : '';
        return(
            <RequestUI response={response} error={error} processing={processing} info={info} handleRequestClick={this.createTimeoutRequest} handleCancelClick={() => this.createRequest('cancel')} />
        )
    }
}

export default Request;