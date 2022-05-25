
import ReactDOM from 'react-dom/client';
import { Game } from './tic-tac-toe/tic-tac-toe';
import { Clock } from './clock/clock';


// ========================================

 const root = ReactDOM.createRoot(document.getElementById("root"));
 const element = (
   <div>
     <Clock />
     <Game/>
   </div>
 )
 root.render(element);
// const element = <h1> Hello,Amos </h1>
// ReactDOM.createRoot(document.getElementById("root")).render(element)
