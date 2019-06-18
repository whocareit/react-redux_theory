# react-redux_theory
对于react-redux需要明白下面的一些核心概念Provider,createStore,reduce,connect另外在Store当中还有getState,dispatch,subscribe方法。那么接下来就是对于
这整个过程的实现过程进行说明。
##### createStore的原理实现,在store中有三个方法分别为subscribe,getState,dispatch，因此在这里我们主要需要实现的就是该三个方法，下面的代码就是整个实现的代码
部分
function  createStore(stateChange){
   let state = null
   const listeners = []
   const subscribe = (listener) => listeners.push(listener)
   const getState = () => state
   const dispatch = (action) => {
      state = stateChange(action,state)
      listeners.forEach((listener) => (listener()))
   }
   dispatch({})
   return {subscribe, getState, dispatch}
}
##### connect的原理实现，其用于在store与组件之间进行数据之间的连接。在实现这个原理时，需要明白connect是通过react封装的一个高级组件，其次就是在实现异步
数据共享这个功能我们需要用到react中的context，紧接着就是对context中的内容进行检验，这个需要涉及到的就是react中的PropTypes。那么下面就是对connect部分的
实现过程
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
      static contextTypes = {
        store: PropTypes.object
      }
  
      constructor () {
        super()
        this.state = {
          allProps: {}
        }
      }
  
      componentWillMount () {
        const { store } = this.context
        this._updateProps()
        store.subscribe(() => this._updateProps())
      }
  
      _updateProps () {
        const { store } = this.context
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {} // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {} // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props
          }
        })
      }
  
      render () {
        return <WrappedComponent {...this.state.allProps} />
      }
    }
    return Connect
  }
  
  ##### reduce与Provider原理实现，reduce用于将数据进行处理的过程，Provider用于实现被其包裹的子组件都能使用store。那么接下来就是对于这两个部分的实现
  代码
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
上面部分是对于reduce的实现，下面部分的代码就是对于Provider的实现
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}
##### 上面部分主要就是对于整个原理的实现过程，上面的所有实现部分都在这个deom中有，在这个doem中还将整个实现的部分进行了使用，需要了解的可以下载这个
demo进行了解。对于这个实现的心得就是首先要知道每个原理的功能，然后才能对其进行使用。具体可以参考[react.js小书](http://huziketang.mangojuice.top/books/react/lesson40)
 
