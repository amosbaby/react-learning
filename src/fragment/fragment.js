import React from "react";

class Columns extends React.Component{
  render(){
    return (
      // 显式使用Fragment可带key，隐式不行
      <React.Fragment> 
        <td> Hello， Amos </td>
        <td> Hello， Allen </td>
      </React.Fragment>
    )
  }
}

class Table extends React.Component{
  render(){
    return (
      <table>
        <th> Fragment Table </th>
        <tr> <Columns />  </tr>
      </table>
    )
  }
}

export function TestTable(){
  return (
    <Table/>
  )
}
