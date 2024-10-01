import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom"
import AddQuestions from './components/Navbar/AddQuestions'
import QuestionWithAnswers from './components/Navbar/QuestionWithAnswers'
import QuestionProvider from './components/Navbar/QuestionContext'
import { ToastContainer } from 'react-toastify';
import "./App.css"
const App = () => {
  return (
    <QuestionProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route path={'/'} element={<QuestionWithAnswers/>}></Route>
          <Route path='/add-question' element={<AddQuestions/>}>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>

      </QuestionProvider>
  )
}

export default App