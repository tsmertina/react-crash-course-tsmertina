import axios from 'axios';
import React from 'react';
import RequestButtons from './RequestButtons';
import RequestResult from './RequestResult';
import { Color } from './Color';


class RequestPortal extends React.Component {
    state = {
        response: '',
        processing: false,
        error: '',
        color: 'white',
        darkTheme: 'grey',
        lightTheme: 'lightgrey'
    }

    componentDidMount() {
        this.cancelRequest();
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
    
    handleColorChange = (param) => {
        this.setState({color: param });
    }

    render() {
        const { response, error, processing, color, darkTheme ,lightTheme} = this.state;

        return(
            <div style={{backgroundColor: color}}>
                <button className="b-app-button" onClick={() => this.handleColorChange(darkTheme)}>{darkTheme} theme</button>
                <button className="b-app-button" onClick={() => this.handleColorChange(lightTheme)}>{lightTheme} theme</button>
                <RequestButtons processing={processing} handleCreateRequest={this.createRequest} handleCancelRequest={this.cancelRequest} />
                <Color.Provider value={color}>
                    <RequestResult processing={processing} response={response} error={error} handleCreateRequest={this.createRequest}/>
                </Color.Provider>
            </div>
        )
    }
}

export default RequestPortal;