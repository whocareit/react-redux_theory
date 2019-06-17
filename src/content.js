import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import SwitchButton from './switchButton'
import  { connect }  from './resource/connect';

class Content extends Component {

    static propTypes = {
        themeColor: PropTypes.string
    }
    
    render(){
        return(
            <div>
                <p style = {{color: this.props.themeColor}}>你的名字的内容</p>
                <SwitchButton/>
            </div>
        )    
    }
}

const mapStateToProps = (state) => ({
    themeColor: state.themeColor
})

export default connect(mapStateToProps)(Content)