import axios from 'axios';
import React from 'react';
const RequestUI = React.lazy(() => import('./RequestUI'));

class Request extends React.Component {

    state = {
        response: {},
        processing: false,
        error: '',
    }

    createRequest = () => {
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();

        this.setState({
            response: [],
            processing: true,
            error: '',
        });

        axios.get('https://randomuser.me/api/',
            { cancelToken: this.source.token},
        ).then((response) => {
            this.setState({
                response: response.data,
                processing: false
            });
        }).catch(error => {
            if (axios.isCancel(error)) {
                this.setState({
                    error: 'Request cancelled',
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

    cancelRequest = () => {
        if (this.source) {
            this.source.cancel();
        }
    }

    render() {
        const { response, error, processing } = this.state;
        let info = response.results? `${response.results[0].name.title} ${response.results[0].name.first} ${response.results[0].name.last}` : '';
        return(
            <RequestUI response={response} error={error} processing={processing} info={info} handleRequestClick={this.createRequest} handleCancelClick={this.cancelRequest} />
        )
    }
}

export default Request;