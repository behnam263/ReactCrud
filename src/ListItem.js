import React from 'react';

const ListItem=(props)=>{

  return  <li  className="list-group-item">
    <button className="btn-sm btn mr-4 btn-info" onClick={props.updateTodos} >U</button>
    {props.item.name} 
   <button className="btn-sm btn ml-4 btn-danger" onClick={props.deleteTodos}>X</button>
   </li>

}
export default ListItem; 