import React from "react";
import ReactDOM from "react-dom" 

const modalElm = document.getElementById('modal')

class Modal extends React.Component{
  constructor(props){
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount(){
    modalElm.appendChild(this.el)
  }

  componentWillUnmount(){
    modalElm.removeChild(this.el)
  }
  render(){
    return ReactDOM.createPortal(this.props.children,this.el)
  }
}

export class TestPortal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal:false
    }
    this.handleHide = this.handleHide.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }

  handleShow(){
    this.setState({
      showModal:true
    })
  }

  handleHide(){
    this.setState({
      showModal:false
    })
  }

   getModal(){
    return this.state.showModal ? ( 
      <Modal>
        <div className="modal">
           <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null
  }

  render(){
    const modal = this.getModal()

    return (
      <div className="portal">
          This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    )
  }

}
