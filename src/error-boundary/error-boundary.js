import React from "react";

 class AMErrorBoundary extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      error:null,
      errorInfo:null
    }
  }

  // static getDerivedStateFromError(error){

  // }

  getErrorStateComponent(){
    return (
      <div>
        <h2>Something went wrong. </h2>
        <details style={{whiteSpace: 'pre-wrap'}}>
          { this.state.error && this.state.error.toString() }
          <br/>
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    )
  }

  /** 捕获错误 */
  componentDidCatch(error,errorInfo){
    console.log('componentDidCatch:',error)
    this.setState({
      error,
      errorInfo
    })
  }

  render(){
    return this.state.error ? this.getErrorStateComponent(): this.props.children
  }
}

class ErrorComponent  extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name:'amos'
    }
    setTimeout(() => {
      this.setState({
        name:null
      })
    }, 4000);
  }

  render(){
    return (
      <div> Hello {this.state.name},Name length is {this.state.name.length}  </div>
    )
  }
}

export class ErrorBoundaryTest extends React.Component{


  render(){
    return (
      <AMErrorBoundary>
        <ErrorComponent />
      </AMErrorBoundary>
    )
  }
}
