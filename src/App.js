import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem'
import axios from 'axios'
import loadinggif from './images/logogif.gif';



class Arraytester extends React.Component{

constructor(){
super();
this.state={
  editing:false,
  editingIndex:null,
  notification:null,
  newTodo:'',
  todos:[],
  loading:true
};
this.apiurl='http://5d44974ed823c3001477192f.mockapi.io';
this.addTodo=this.addTodo.bind(this);
this.deleteTodos=this.deleteTodos.bind(this); 
this.alert=this.alert.bind(this);
this.updateTodos=this.updateTodos.bind(this);
this.saveTodo=this.saveTodo.bind(this);
 
this.handleChange=this.handleChange.bind(this);
}
componentWillMount(){

 
}
async componentDidMount(){
 const response= await axios.get(`${this.apiurl}/Todos`);
// setTimeout(()=>{

 this.setState({
todos:response.data,
loading:false
 });
// },2000 );
}
handleChange(event){
this.setState({

  newTodo:event.target.value

});

}
async addTodo(){


const response= await axios.post(`${this.apiurl}/Todos`,{
  name:this.state.newTodo
});

const oldtodos=this.state.todos;
oldtodos.push(response.data);

this.setState({
todos:oldtodos,
newTodo:''
});
this.alert('To do added Successfully.');
}
async deleteTodos(index){
const todos=this.state.todos;
const todo=todos[index];
 await axios.delete(`${this.apiurl}/Todos/${todo.id}`);

delete todos[index];
this.setState({todos});
this.alert('To do deleted Successfully.');
}
updateTodos(index){
  const todo=this.state.todos[index];
  this.setState({

    editing:true,
    newTodo:todo.name,
    editingIndex:index
  });
  
}

async saveTodo(index){
  const todos=this.state.todos;
  const todo=todos[this.state.editingIndex];
  const response=await axios.put(`${this.apiurl}/Todos/${todo.id}`,{
    name:this.state.newTodo
  });
  console.log(response);
  todos[this.state.editingIndex]=response.data;
  this.setState({
    todos, 
    editingIndex:null,
     editing:false,
      newTodo:''
  });
  this.alert('To do updated Successfully.');
}
alert(notification){
 this.setState({
   notification
 });
  
setTimeout(()=>{
  this.setState({
    notification:null
  });

},1500);

}
 
render() {
  return <div className="container">
 

    {
      this.state.notification &&  
       <div className="alert ml-3 alert-success">
      <p className="text-center">{this.state.notification}</p>  
      </div>
    }
  
    <input type="text" className="my-4 form-control" placeholder="type some thing here" onChange={this.handleChange} value={this.state.newTodo }/>
   <button className="btn-info mb-3 form-contol" 
   onClick={this.state.editing ? this.saveTodo:this.addTodo}
   disabled={this.state.newTodo.length <5 }
   > 
   { this.state.editing ?  "Edit To do": "Add To do"}
   </button>
{
this.state.loading &&
<div className='col-lg-12'>
<img src={loadinggif} alt=''  />
</div>
}

   {
     (!this.state.editing || this.state.loading ) && 
       <ul className="list-group">
  {this.state.todos.map((item,index)=>{
    return   <ListItem   
    key={item.id}
    item={item} 
    updateTodos={()=>{this.updateTodos(index)}}
    deleteTodos={()=>{this.deleteTodos(index)}}
    />
 
 })}
    </ul>
   
   }
  
 </div>;
}

}

function App() {
  return (
    <div className="App">
    
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Arraytester/>
      </header>
    </div>
  );
}

export default App;
