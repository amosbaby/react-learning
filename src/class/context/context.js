import React ,{useContext }from "react"

const Theme = {
  dark:{
    background:'black',
    foreground:'white'
  },
  light:{
    background:'white',
    foreground:'black'
  }
}

// 默认值为light，只有当组件在组件树中没有找到对应的provider，才会启用默认值
const ThemeContext = React.createContext('light')

// class Button extends React.Component{
//   // 指定 contextType 读取当前的 theme context。
//   // React 会往上找到最近的 theme Provider，然后使用它的值。
//   // 在这个例子中，当前的 theme 值为 “dark”。
//   // 实验特性
//   static contextType = ThemeContext
//   render(){
//     return (
//       <button theme={this.context.value} style={getStyleByTheme(this.context)}> Click Me  </button>
//     )
//   }
// }

function Button(){
  const theme = useContext(ThemeContext)
    return (
      // 该组件元素提供context值，其内部必须通过一个函数返回组件元素
      // <ThemeContext.Consumer>
      //   {
      //     context=>(
      //       <button theme={context.value} style={getStyleByTheme(context)}> Click Me  </button>
      //     )
      //   }
       
      // </ThemeContext.Consumer>

      <button theme={theme} style={getStyleByTheme(theme)}> Click Me  </button>
    )
}

function Message(props){
  return (
    <div>
        { props.msg }
        <Button />
       </div> 
  )
}

function getStyleByTheme(themeName){
  console.log('themeName:',themeName)
  const theme = Theme[themeName]
  return { backgroundColor:theme.background,color:theme.foreground}
}

export class MessageList extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      themeName: 'dark'
    }
    this.handleThemeButtonClick = this.handleThemeButtonClick.bind(this)
  }

  handleThemeButtonClick(themeName){
    this.setState({
      themeName
    })
  }

  getBorder(themeName){
    return  this.state.themeName === themeName ? 'inset' : 'none'
  }

  render(){
    const themeButtons = Object.entries(Theme).map(([name,theme])=>{
      return (
        <button style={{...getStyleByTheme(name), borderStyle: this.getBorder(name)  }} onClick={()=>this.handleThemeButtonClick(name)} key={name}> { name +  this.state.themeName}  </button>
      )
    })
    const list = ['Hello Amos!','Context logic','How are you?']
    // 此处ThemeContext.Provider的值value设置为dark，它的子组件都能访问到这个值
    return (
      <div>
        {
         themeButtons
        }
        <ThemeContext.Provider value={this.state.themeName}>
        {
          list.map(item=> {
            return (
              <Message  msg={item}  key={item}/> 
            )
          })
        }
        </ThemeContext.Provider>
      </div>
    )
  }

}
