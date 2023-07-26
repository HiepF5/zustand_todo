import React from 'react'
import './Task.css'
import classNames from 'classnames'
import { useStore } from '../zustand/store'
import trash from '../assets/trash-2.svg'
function Task({ title }) {
  const task = useStore((store) => 
    store.tasks.find((task) => task.title === title));
  const setDraggedTask = useStore((store)=> store.setDraggedTask)
  const deleteTask = useStore((store)=> store.deleteTask)
  return (
    <div className='task' draggable onDragStart={()=>{setDraggedTask(task.title)}}>
      <div>{task.title}</div>
      <div className='bottomWrapper'>
        <div><img src={trash} alt="" onClick={()=>{deleteTask(task.title)}} /></div>
        <div className={classNames('status', task.state)}>{task.state}</div>
        {/* {console.log(task)} */}
      </div>
    </div>
  )
}

export default Task
