import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './resource/connect';

class SwitchButton extends Component{

    static propTypes = {
        themeColor: PropTypes.string,
        onSwitchColor: PropTypes.func
    }
    
    handleSwitch(color){
        if(this.props.onSwitchColor){
            this.props.onSwitchColor(color)
        }
    }

    render(){
        return(
            <div>
                <button style = {{color: this.props.themeColor}} onClick = {this.handleSwitch.bind(this,'red')}>red</button>
                <button style = {{color: this.props.themeColor}} onClick = {this.handleSwitch.bind(this,'blue')}>blue</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    themeColor: state.themeColor
})

const mapDispatchToProps = (dispatch) => ({
    onSwitchColor: (color) => {
        dispatch({
            type: 'CHANGE_BUTTON_COLOR',
            themeColor: color
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(SwitchButton);
