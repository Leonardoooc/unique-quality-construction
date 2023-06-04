import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

import Private from './Private'
import Cadastro from '../pages/Cadastro';
import Form from '../pages/Form';

function RoutesApp(){
  return(
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/dashboard" element={ <Private><Dashboard /></Private>} />
      <Route path="/forms/:id" element={ <Private><Form /></Private>} />
      <Route path="/login" element={ <Login /> } />
      <Route path="/signup" element={ <Cadastro /> } />
    </Routes>
  )
}

export default RoutesApp;