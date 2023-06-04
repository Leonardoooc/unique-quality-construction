import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './home.css';
import { Routes, Route, Link } from 'react-router-dom'

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { db } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore'

import { useParams, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

function Home() {
  
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [celular, setCelular] = useState('')
  const [endereco, setEndereco] = useState('')
  const [profissao, setProfissao] = useState('')
  const [cidade, setCidade] = useState('')
  const [desc, setDesc] = useState('')


  async function handleRegister(e){
    e.preventDefault();

    await addDoc(collection(db, "forms"), {
        created: new Date(),
        nome: nome,
        email: email,
        celular: celular,
        endereco: endereco,
        profissao: profissao,
        cidade: cidade,
        desc: desc
    })
    .then(() => {
        setNome('');
        setEmail('');
        setCelular('');
        setEndereco('');
        setProfissao('');
        setCidade('');
        setDesc('');
        toast.success("Thank you, we will contact you soon!")
    })
    .catch((error) => {
        toast.error("Error, try again later.")
        console.log(error);
    })
}

  return (
    <div>
      <body>
        <img id="logo-empresa" src={require('../../images/unique_6.png')} alt="logo_empresa"/>
        <div className="container">
            <img id="nome-empresa" src={require('../../images/unique_7.png')} alt="nome_empresa"/>
            <form onSubmit={handleRegister}>
                <label for="nome">NAME</label>
                <input type="text" id="nome" name="nome" required value={nome} onChange={ (e) => setNome(e.target.value)}/>
                <label for="email">E-MAIL</label>
                <input type="email" id="email" name="email" required value={email} onChange={ (e) => setEmail(e.target.value)}/>
                <label for="telefone">PHONE NUMBER</label>
                <input type="tel" id="telefone" name="telefone" required value={celular} onChange={ (e) => setCelular(e.target.value)}/>
                <label for="endereco">ADDRESS</label>
                <input type="text" id="endereco" name="endereco" required value={endereco} onChange={ (e) => setEndereco(e.target.value)}/>
                <label for="numero-residencia">PROFESSION</label>
                <input type="text" id="numero-residencia" name="numero-residencia" value={profissao} onChange={ (e) => setProfissao(e.target.value)}/>
                <label for="cidade">CITY</label>
                <input type="text" id="cidade" name="cidade" value={cidade} onChange={ (e) => setCidade(e.target.value)}/>
                <label for="observacoes">COMMENTS</label>
                <textarea id="observacoes" name="observacoes" value={desc} onChange={ (e) => setDesc(e.target.value)}></textarea>
                <input type="submit" value="Submit"/>
            </form>
        </div>

        <div className="login">
          <Link to="/login">
              Login
          </Link>
        </div>

        </body>
    </div>
  );
}

export default Home;