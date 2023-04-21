// import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import React, {useState} from 'react';

function App() {
  const [currentForm, setcurrentForm] = useState('login')
  
  const toggleForm = (formName) => {
    setcurrentForm(formName)
  }
  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch = {toggleForm} /> : <Register onFormSwitch = {toggleForm} />
      }
      
    </div>
  );
}

export default App;
