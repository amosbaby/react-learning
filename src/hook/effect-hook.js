import React,{useState,useEffect} from "react";

export function EffectExample (){
  const  [count,setCount] = useState(0)

  useEffect(()=>{
    // 告诉 React 组件需要在渲染后执行某些操作
    document.title = `你点击了${count}次`
  })

  return (
    <div>
      <h4> 你点击了{count}次 </h4>
      <button onClick={()=>setCount(count+1)}> 点我 </button>
    </div>
  )
}
