import React, { useEffect, useState } from 'react'
import './Column.css'
import Task from './Task'
import { useStore } from '../zustand/store'
import classNames from 'classnames'
import { useController, useForm } from 'react-hook-form'

function Column({ state }) {
  // const [text, setText] = useState('')
  const { register, handleSubmit, reset, formState:{errors}} = useForm({ defaultValues: { text: '' } })
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state))
  const addTask = useStore((store) => store.addTask)
  const setDraggedTask = useStore((store) => store.setDraggedTask)
  const draggedTask = useStore((store) => store.draggedTask)
  const moveTask = useStore((store) => store.moveTask)
  const onSubmitFormTask = (value) => {
    console.log(value)
     addTask(value.text, state)
     reset({text:''})
     setOpen(false)
  }

  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault()
        setDrop(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setDrop(false)
      }}
      onDrop={(e) => {
        setDrop(false)
        moveTask(draggedTask, state)
        setDraggedTask(null)
      }}
    >
      <div className='titleWrapper'>
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true)
          }}
        >
          Add
        </button>
      </div>

      {tasks.map((task, index) => (
        <Task title={task.title} key={index} />
      ))}
      {open && (
        <div className='Modal'>
          <div className='modalContent'>
            <form onSubmit={handleSubmit(onSubmitFormTask)}>
              <input {...register('text', {required:'Nhap chu'})} />
              <div style={{color: 'red'}}>{errors.text?.message}</div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Column

function RefTest() {
  const ref = useRef()
  useEffect(() => {
    useStore.subscribe(
      (store) => store.tasks,
      (tasks) => {
        ref.current = tasks
      }
    )
  }, [])
  return ref.current
}
