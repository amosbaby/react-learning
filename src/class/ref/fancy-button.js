import React from "react"
const FancyButton = React.forwardRef((props,ref)=>(
  <button ref={ref}>
    {props.children}
  </button>
))

function logProps(WrapComponent){

  class LogProps extends React.Component{

    componentDidUpdate(preProps){
      console.log('old props:',preProps)
      console.log('new props:',this.props)
    }

    render(){
      const {forwardRef,...rest} = this.props
      console.log('forwardRef:',forwardRef)
      return (
        <WrapComponent ref={forwardRef} {...rest}></WrapComponent>
      )
    }

  }

  function forwardRef(props,ref){
    return (
      <LogProps {...props} forwardedRef={ref} />
    )
  }

  const name = WrapComponent.displayName || WrapComponent.name || 'WrapComponent';
  forwardRef.displayName = `logProps(${name})`;

  // return LogProps
  return React.forwardRef(forwardRef)

}

const WrapButton = logProps(FancyButton)


export function TestFancyButton(){

  const ref = React.createRef()
  const handleClick = function(){
    console.log(ref)
  }
  return (
    <WrapButton ref={ref}>
      <div onClick={handleClick}> Hello Ref </div>
    </WrapButton>
  )
}
