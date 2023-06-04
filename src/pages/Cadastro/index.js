import { Link } from "react-router-dom";

import './cadastro.css';

import { useState, useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

export default function Cadastro() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){
        await signUp(email, password, name)
        }

    }

    return(
    <div>
        <body>
          <img id="logo-empresa" src={require('../../images/unique_6.png')} alt="logo_empresa"/>
          <div className="container">
            <img id="nome-empresa" src={require('../../images/unique_7.png')} alt="nome_empresa"/>
		        <form onSubmit={handleSubmit}>
                    <label for="email">NAME</label>
                    <input type="text" id="text" name="name" required value={name} onChange={ (e) => setName(e.target.value) }/>
			              <label for="email">E-MAIL</label>
                    <input type="email" id="email" name="email" required value={email} onChange={ (e) => setEmail(e.target.value) }/>
                    <label for="telefone">PASSWORD</label>
                    <input type="password" id="telefone" name="telefone" required value={password} onChange={ (e) => setPassword(e.target.value) }/>
                    <input type="submit" id="botao" value="Submit"/>
            </form>
          </div>
        </body>
    </div>
    );

}