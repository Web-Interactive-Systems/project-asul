
import React from "react";
import Select from "react-select";

function App({taskList}) {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(taskList);
  const [nextTaskId, setNextTaskId] = useState(taskList.length + 1);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };
  const handleAddTask = () => {
    if(taskText !== ""){
      setTasks([...tasks, {id:nextTaskId,content:taskText}]); 
      setTaskText(''); 
      setNextTaskId(nextTaskId + 1);  
    }
  };
  const deleteTask = (id) =>{
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }
  console.log(tasks)
  return (
    <>
      <h1>TODO List</h1>
      <NewTask handleAddCallback={handleAddTask} taskText={taskText} handleInputCallback={handleInputChange}></NewTask>
      <h2>{tasks.length} Task(s) Remain</h2>
      <ul>
      {tasks.map((data)=>{
        return <Task key={data.id} content={data.content} taskId={data.id} deleteCallback={deleteTask}></Task>
      })}
      </ul>
    </>
  )
}

export default App