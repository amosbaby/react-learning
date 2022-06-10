import React from "react";

export class Clock extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      date: getNowTimeDesc()
    }
  }

  componentDidMount(){
    this.timerId = setInterval(() => {
      this.tick()
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerId)
  }

  tick(){
    this.setState({
      date: getNowTimeDesc()
    })
  }


  render(){
    return (
      <div>
        <h1> Hello,Amos </h1>
        <h2> It's { this.state.date } </h2>
      </div>
    )
  }    
}

function getNowTimeDesc(){
  return new Date().toLocaleTimeString()
}
