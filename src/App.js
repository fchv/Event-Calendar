import React from 'react'
import {useState} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

import Calendar from 'react-calendar';
import './components/CalendarStyle.css';
import moment from 'moment'

var store = require('store')

function App() {

  //Get each object stored and make a list from it
  const getStoredTasks = () => {
    var tasksList = []
    store.each(function(value, key) {
      tasksList = [...tasksList, store.get(key)] 
    })
    return tasksList
  }

  const [tasks, setTasks] = useState( getStoredTasks() )

  const [showAddTask, setShowAddTask] = useState(false)

  /* Add Task */
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks( [...tasks, newTask] )
    store.set(id, newTask)
    //The add task section will close after the user adds a task.
    //If you want the addTask to remain open, remove the setShowAddTask below.
    setShowAddTask(false)
  }

  /* Delete Task function that takes a task id as an argument */
  const deleteTask = (id) => {
    setTasks(tasks.filter( (task) => task.id !== id ))
    store.remove(id)
  }

  /* Toggle reminder */
  const toggleReminder = (id) => {
    console.log(id)
    setTasks(tasks.map( (task) => task.id === id ? { ...task, reminder: !task.reminder} : task ))
  }





  /* Date components */
  const [text, setText] = useState('')
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(2021)

  const onSubmit = (e) => {
      e.preventDefault()
      if (!text) {
          alert('Please add text')
          return
      }
      addTask( {text, day, month, year} )

      // clear form 
      setText('')
      setDay(1)
      setMonth(1)
      setYear(2021)
  }


  //Date states
  const [dateState, setDateState] = useState(new Date());

  //Determines what content is shown in each date tile of the calander
  const tileContent = ({date}) => {
    var i = 0;
    for (i=0; i < tasks.length; i++) {
      if ( date.getFullYear() === (tasks[i].year - 0) && date.getMonth() === (tasks[i].month - 1) && date.getDate() === (tasks[i].day - 0) ) {
        //return <p style={{ color: "#17caf7" }} >{tasks[i].text}</p>
        return <tileContent><b><p style={{ color: "#17caf7" }} >{tasks[i].text}</p></b></tileContent>
      }
    }
    return <p></p>
  }


  //When a date on the calendar is selected, open the add task with the date filled in
  function onChange(e) {
      setDateState(e);
      setText('')
      setDay(e.getDate())
      setMonth(e.getMonth()+1)
      setYear(e.getFullYear())
      setShowAddTask(true);
  }



  return (
  <div className="appContainer">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>

      <div className="Calander">
        <Calendar onChange={onChange} value={dateState} tileContent={tileContent} calendarType={"US"} />
      </div>

      <div className="Events">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && 
          <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Event</label>
                <input type='text' placeholder='Add Event' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            
            <div className="Date" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 5 }}>
              <div className='form-control'>
                  <label>Month</label>
                  <input type="text" pattern="[0-9]*" placeholder='MM' value={month} onChange={(e) => setMonth(e.target.value)} />
              </div>
              
              <div className='form-control'>
                  <label>Day</label>
                  <input type="text" pattern="[0-9]*"  placeholder='DD' value={day} onChange={(e) => setDay(e.target.value)} />
              </div>
              
              <div className='form-control'>
                  <label>Year</label>
                  <input type="text" pattern="[0-9]*"  placeholder='YYYY' value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
            </div>
            <input type='submit' value='Save Event' className='btn btn-block' />
          </form>

        }
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      </div>
    </div>
  </div>
  );

}


export default App;
