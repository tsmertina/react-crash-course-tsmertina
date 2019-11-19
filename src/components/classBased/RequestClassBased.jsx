import axios from 'axios';
import React from 'react';
import ColorButtons from '../ColorButtons';
import RequestButtons from '../RequestButtons';
import RequestResult from './RequestResult';
import { connect } from 'react-redux';
import { fetchPerson, cancelFetch, colorChange } from '../../reducer';

class RequestClassBased extends React.Component {
    state = {
        ref: React.createRef()
    }

    createRequest = () => {
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
        this.state.ref.current.focus();
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
        const { ref} = this.state;
        const { response, error, processing, color, id } = this.props;

        return(
            <div className="app" style={{backgroundColor: color}}>
                <ColorButtons handleColorChange={this.handleColorChange} />
                <RequestButtons ref={ref} handleCreateRequest={this.createRequest} handleCancelRequest={this.cancelRequest} processing={processing} />
                <RequestResult response={response} id={id} error={error} processing={processing} handleCreateRequest={this.createRequest} />
            </div>
        )
    }
}

function mapStateToProps(store) {
    const { error, response, names, processing, color, id } = store;
    return {
        names,
        error,
        response,
        processing,
        color,
        id
    }
}

const mapDispatchToProps = {
    fetchPerson,
    cancelFetch,
    colorChange
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestClassBased);