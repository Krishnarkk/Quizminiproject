import React, { useContext, useState } from 'react';
 import { QuestionContext } from './QuestionContext';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddQuestions = () => {
    const {addNewQuestion}=useContext(QuestionContext);
    const [title,setTitle]=useState("");
    const [category,setCategory]=useState('JavaScript');
    const [name,setName]=useState("")
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const newQuestion={
            id:Date.now(),
            title,
            category,
            name,
            answers:[]
        }
        console.log(newQuestion)
        addNewQuestion(newQuestion);
        toast.warning("New question added!!", {
            position: "top-center",
            autoClose: 3000,
        });
        navigate("/")
    }
  return (
    <form onSubmit={handleSubmit} className='mb-4 mt-4 container'>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>Question</label>
        <input 
            type='text'
            className='form-control'
            id="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
        />
      </div>
      <div className='mb-3'>
      <label htmlFor='title' className='form-label'>Enter your name</label>
        <input 
            type='text'
            className='form-control'
            id="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='category' className='form-label'>Category of question</label>
        <select
          id="category"
          className='form-select'
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
       >
       <option value="JavaScript">JavaScript</option>
       <option value="HTML">HTML</option>
       <option value="CSS">CSS</option>
       <option value="ReactJs">ReactJs</option>
        </select>
      </div>
      <button type='submit' className='btn btn-danger'>Post Question</button>
    </form>
  )
}

export default AddQuestions