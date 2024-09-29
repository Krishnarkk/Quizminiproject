import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Answer = ({questionId,addAnswer}) => {
    const [answer,setAnswer]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(answer.trim()){
            addAnswer(questionId,answer);
            setAnswer("")
        }
        toast.success("Your answer is submitted",{
            position:"top-center",
            autoClose:3000
        })
    }
  return (
    <form onSubmit={handleSubmit} className='mt-3'>
        <div className='input-group'>
            <input
               type='text'
               className='form-control'
               placeholder='Type your answer'
               value={answer}
               onChange={(e)=>setAnswer(e.target.value)}
               required
            />
            <button type='submit' className='btn btn-primary'>Submit</button>
        </div>

    </form>
  )
}

export default Answer