import axios from 'axios';
import React from 'react';
import ColorButtons from '../ColorButtons';
import RequestButtons from '../RequestButtons';
import RequestResult from './RequestResult';
import { connect } from 'react-redux';
import { fetchPerson, cancelFetch, colorChange } from '../../reducer';

class RequestClassBased extends React.Component {
    constructor() {
        super();
        this.cancelBtnRef = React.createRef();
    }

    componentDidUpdate() {
        this.cancelBtnRef.current.focus();
    }

    createRequest = () => {
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
        
        this.props.fetchPerson('https://randomuser.me/api/', this.source);
    }

    cancelRequest = () => {
        if (this.source) {
            this.props.cancelFetch(this.source);
        }
    }

    handleColorChange = (param) => {
       this.props.colorChange(param);
    }

    render() {
        const { response, error, processing, color } = this.props;

        return(
            <div className="app" style={{backgroundColor: color}}>
                <ColorButtons handleColorChange={this.handleColorChange} />
                <RequestButtons ref={this.cancelBtnRef} handleCreateRequest={this.createRequest} handleCancelRequest={this.cancelRequest} processing={processing}/>
                <RequestResult response={response} error={error} processing={processing} handleCreateRequest={this.createRequest} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    const { error, response, names, processing, color } = store;
    return {
        names,
        error,
        response,
        processing,
        color,
    }
}

const mapDispatchToProps = {
    fetchPerson,
    cancelFetch,
    colorChange
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestClassBased);