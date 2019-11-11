import axios from 'axios';
import React from 'react';
import RequestButtons from './RequestButtons';
import RequestResult from './RequestResult';
import {Color} from './Color';



class RequestPortal extends React.Component {
    state = {
        response: '',
        processing: false,
        error: '',
        color: 'orange'
    }

    createRequest = () => {
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();

        this.setState({
            response: '',
            processing: true,
            error: '',
        });

        axios.get('https://randomuser.me/api/',
            { cancelToken: this.source.token},
        ).then((response) => {
            let res = response.data.results[0];
            this.setState({
                response: `${res.name.title} ${res.name.first} ${res.name.last}`,
                processing: false
            });
        }).catch(error => {
            if (axios.isCancel(error)) {
                this.setState({
                    error: 'Request cancelled',
                    processing: false,
                    response: ''
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
    
    handleColorChange = (e) => {
        this.setState({color:e.currentTarget.value });
    }

    render() {
        const { response, error, processing, color } = this.state;

        return(
            <>
                <input type="text" defaultValue={color} onChange={this.handleColorChange} />
                <RequestButtons processing={processing} handleCreateRequest={this.createRequest} handleCancelRequest={this.cancelRequest} />
                <Color.Provider value={color}>
                    <RequestResult response={response} error={error} handleCreateRequest={this.createRequest}/>
                </Color.Provider>
            </>
        )
    }
}

export default RequestPortal;