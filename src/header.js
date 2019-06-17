import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect }  from './resource/connect'

class Header extends Component{
    render(){
        return (
            <h1 style = {{color: this.props.themeColor}}>你的名字</h1>
        )
    }
}

Header.propTypes = {
    themeColor: PropTypes.string
};

const mapStateToProps = (state) => ({
    themeColor: state.themeColor
})

export default connect(mapStateToProps)(Header);