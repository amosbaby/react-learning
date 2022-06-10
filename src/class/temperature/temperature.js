import React from "react";

class TemperatureInput extends React.Component{

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.props.onChange(e.target.value)
  }

  render(){
    const {temperature,type} =  this.props
    const typeName = type === 'c' ? '摄氏':'华氏'
    
    return (
      <div>
        {typeName}: <input value={temperature} onChange={this.handleChange}  placeholder={`请输入${typeName}温度`}/>
      </div>
    )
  }
}

export class Calculator extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      temperature: '',
      type:'c'
    }
    this.handleCelsiusChange = this.handleChange.bind(this,'c')
    this.handleFahrenheitChange = this.handleChange.bind(this,'f')
  }

  handleChange(type,temperature){
    this.setState({
      temperature,type
    })
  }

  getConvertedTemperature(){
    const {type} =  this.state
    const temperature = parseFloat(this.state.temperature)
    console.log('temperature:',this.state.temperature)
    let celsius 
    let fahrenheit 
    if(Number.isNaN(temperature)){
      return {celsius,fahrenheit }
    }

     celsius = type === 'c' ? temperature : toCelsius(temperature)
     fahrenheit = type === 'f' ? temperature : toFahrenheit(temperature)
     return {celsius,fahrenheit }
  }

  render(){
    const {celsius,fahrenheit} = this.getConvertedTemperature()
    const tips = `The water would ${celsius >= 100 ? '' :'not' } boil.`
  
    return (
      <div>
         <TemperatureInput temperature={celsius} type="c" onChange={this.handleCelsiusChange}/>
         <TemperatureInput temperature={fahrenheit} type="f" onChange={this.handleFahrenheitChange}/>
        <h5> { tips } </h5>
      </div>
    )
  }
}


function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
