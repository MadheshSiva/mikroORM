import React from 'react';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import StudentForms from './StudentsRecord/StudentForm';
import HomePage from './homePage/HomePage';
import LoginPage from './authorization/Login';
import SignUp from './authorization/SignUp';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/form/:validation' element={<StudentForms/>}/> 
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
