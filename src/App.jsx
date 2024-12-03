import { useState , useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item =>{
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS();
  }
  
  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS();
  }


  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS();
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="main flex justify-center bg-my-image">
        <div className="container rounded-md p-8 w-3/5 my-10 min-h-screen bg-slate-500/30 backdrop-blur-md ">
          <div className="addtodo">
            <h2 className="font-bold text-lg my-2">Add your daily tasks</h2>
            <input onChange={handleChange} value={todo} className="bg-white w-4/5 rounded-md" type="text" />
            <button onClick={handleAdd} disabled={todo.length<=3} className="mx-3 text-white font-bold bg-purple-700 p-2 rounded-lg hover:bg-purple-800 hover:font-bold"><MdOutlineLibraryAdd /></button>
          </div>
          <div className="my-3">
            <h2 className="font-bold text-lg">Your tasks</h2>
            <div className="todos">
              {todos.length===0 && <div>No tasks have been created.</div>}
              {todos.map(item => {
                return <div key={item.id} className={item.isCompleted ? "todo flex w-3/4 justify-between my-1 line-through" : "todo flex w-3/4 justify-between my-1"}>
                <div className="flex gap">
                  <label name="checkbox"> </label>
                  <input type="checkbox" onChange={handleCheckbox} name={item.id} checked={item.isCompleted} id="" className="mx-1" />
                  <div>{item.todo}</div>
                </div>
                <div className="buttons flex">
                  <button onClick={(e)=>{handleEdit(e,item.id)}} className="mx-1 h-9 text-white font-semibold bg-purple-700 px-2 py-1 rounded-lg hover:bg-purple-800 hover:font-bold"><FaEdit/></button>
                  <button onClick={(e)=>{handleDelete(e,item.id)}} className="mx-1 h-9 text-white font-semibold bg-purple-700 px-2 py-1 rounded-lg hover:bg-purple-800 hover:font-bold"><MdDelete/></button>
                </div>
              </div>
              })}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
