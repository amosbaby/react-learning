
import ReactDOM from 'react-dom/client';
import { TestTable } from './fragment/fragment';
// import { TestFancyButton } from './ref/fancy-button';
// import { MessageList } from './context/context';
// import { ErrorBoundaryTest } from './error-boundary/error-boundary';
// import { Calculator } from './temperature/temperature';
// import { Game } from './tic-tac-toe/tic-tac-toe';
// import { Clock } from './clock/clock';
// import { ConditionRender } from './condition-render/condition-render';


// ========================================

 const root = ReactDOM.createRoot(document.getElementById("root"));
 const element = (
   <div>
     {<TestTable></TestTable>}
     {/* { <TestFancyButton /> } */}
     {/* { <ErrorBoundaryTest />} */}
     {/* {<MessageList /> } */}
     {/* {<Calculator />} */}
     {/* <Clock /> */}
     {/* <Game/> */}
     {/* <ConditionRender isShowName="amos" type="age"></ConditionRender>
     <ConditionRender type="name"></ConditionRender> */}
   </div>
 )
 root.render(element);
// const element = <h1> Hello,Amos </h1>
// ReactDOM.createRoot(document.getElementById("root")).render(element)
