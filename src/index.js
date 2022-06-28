
import ReactDOM from 'react-dom/client';
import './index.css'

// import { EffectExample } from './hook/effect-hook';
// import { MessageList } from './class/context/context';
import HackNews from './hook/hack-news';
// ========================================

 const root = ReactDOM.createRoot(document.getElementById("root"));
 const element = (
   <div>
    { <HackNews /> }

   </div>
 )
 root.render(element);
// const element = <h1> Hello,Amos </h1>
// ReactDOM.createRoot(document.getElementById("root")).render(element)
