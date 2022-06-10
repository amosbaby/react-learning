import React from "react"

export class Form extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      value: props.value 
    }
  }

  render(){
    return (
      <div>
        <input value={this.state.value} placeholder="amos"/>
      </div>
    )
  }
}
