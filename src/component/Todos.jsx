import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../feature/todo/todoSlice.js'

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  // Local state to track which todo is being edited and its new text
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  // Jab user edit button par click kare
  const handleEditClick = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  // Jab user save button par click kare
  const handleSaveClick = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }))
      setEditId(null) // Edit mode close kar do
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Todos</h2>
      
      <ul className="list-none space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-zinc-800 px-5 py-3 rounded-lg shadow-md border border-zinc-700 hover:border-zinc-500 transition-all duration-300"
          >
            {/* Agar yeh todo edit mode mein hai to input dikhao, warna normal text */}
            {editId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 bg-zinc-700 text-white rounded px-3 py-1.5 outline-none border border-blue-500 mr-4"
                autoFocus
              />
            ) : (
              <div className="text-white text-lg flex-1 mr-4 overflow-hidden text-ellipsis">
                {todo.text}
              </div>
            )}

            {/* Buttons Container */}
            <div className="flex items-center gap-3">
              
              {/* Edit / Save Button */}
              {editId === todo.id ? (
                <button
                  onClick={() => handleSaveClick(todo.id)}
                  className="text-white bg-green-500 border-0 py-1.5 px-4 focus:outline-none hover:bg-green-600 rounded-md shadow-sm transition-colors font-medium"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(todo)}
                  className="text-white bg-blue-500 border-0 py-1.5 px-3 focus:outline-none hover:bg-blue-600 rounded-md shadow-sm transition-colors"
                  title="Edit Todo"
                >
                  {/* Pencil SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1.5 px-3 focus:outline-none hover:bg-red-600 rounded-md shadow-sm transition-colors"
                title="Delete Todo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos