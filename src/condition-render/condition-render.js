export function ConditionRender(props){
  return (
    <div>
      <h1> 与运算符&&  </h1>
      {
        props.isShowName &&
        <h1> My name is Amos </h1>
      }
      <h1> 三目运算符 </h1>
      {
        props.type === 'age'
         ? <h1> My age is 18</h1>
         : <h1> My name is Amos </h1>
      }
    </div>
  )
}
