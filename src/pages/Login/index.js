import { Link } from "react-router-dom";

import './login.css';

import { useState, useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e){
      e.preventDefault();

      if(email !== '' && password !== ''){
        await signIn(email, password);
      }

  }

  return (
    <div>
        <body>
          <img id="logo-empresa" src={require('../../images/unique_6.png')} alt="logo_empresa"/>
          <div className="container">
            <img id="nome-empresa" src={require('../../images/unique_7.png')} alt="nome_empresa"/>
		        <form onSubmit={handleSignIn}>
			        <label for="email">E-MAIL</label>
              <input type="email" id="email" name="email" required value={email} onChange={ (e) => setEmail(e.target.value) }/>
              <label for="telefone">PASSWORD</label>
              <input type="password" id="telefone" name="telefone" required value={password} onChange={ (e) => setPassword(e.target.value) }/>
              <input type="submit" id="botao" value="Submit"/>
            </form>

            <div className="signupbutton">
              <Link to="/signup">
                <form>
              <input type="submit" id="botao" value="SignUp"/>
              </form>
              </Link>
            </div>
          </div>
        </body>
    </div>
  );
}