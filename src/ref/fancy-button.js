import React from "react"
const FancyButton = React.forwardRef((props,ref)=>(
  <button ref={ref}>
    {props.children}
  </button>
))


export function TestFancyButton(){

  const ref = React.createRef()
  const handleClick = function(){
    console.log(ref)
  }
  return (
    <FancyButton ref={ref}>
      <div onClick={handleClick}> Hello Ref </div>
    </FancyButton>
  )
}
