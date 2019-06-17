import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Header from './header';
import Content from './content';
import { createStore }  from './resource/createStore';

const reducer = (state,action) =>{
    if(!state){
        return {
            themeColor: 'blue'
        }
    }
    switch(action.type){
        case 'CHANGE_BUTTON_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return state
    }
}


const store = createStore(reducer)

class App extends Component{

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext () {
        return { store }
    }

    render(){
        return(
            <div>
                <Header/>
                <Content/>
            </div>
        )
    }
}

ReactDOM.render(<App/> ,
    document.getElementById('root')
)