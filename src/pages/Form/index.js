import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiTrash, FiArrowLeft } from 'react-icons/fi'
import { collection, getDocs, orderBy, limit, startAfter, query, doc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

import './form.css';

const listRef = collection(db, "forms")

export default function Form() {
    const { user, logout } = useContext(AuthContext);

    const {id} = useParams();

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    async function getData(id) {
        const docRef = doc(db, "forms", id);
        const snapshot = await getDoc(docRef);

        return getDoc(docRef)
        .then((snap) => {
            if (!snap.exists()) throw new Error("not-found");
            setData(snap.data())
        return snap.data();
        });
    }

    useEffect(() => {
        getData(id)
    }, [])

    async function deleteItem(id) {
        const docRef = doc(db, "forms", id)

        await deleteDoc(docRef).then(() => {
            toast.info("Form deleted.")
            navigate('/dashboard')
        }).catch((error) => {
            toast.error("Error in delete.")
            console.log(error)
        })
    }
    
    async function backToDashboard() {
        navigate('/dashboard')
    }

    return(
        <div>
            <body>
                <img id="logo-empresa" src={require('../../images/unique_6.png')} alt="logo_empresa"/>
                <div className="container">
                    <img id="nome-empresa" src={require('../../images/unique_7.png')} alt="nome_empresa"/>
                    <form>
                        <h3>Name</h3>
                        <h4>{data.nome}</h4>

                        <h3>Email</h3>
                        <h4>{data.email}</h4>
                        
                        <h3>Phone</h3>
                        <h4>{data.celular}</h4>

                        <h3>Address</h3>
                        <h4>{data.endereco}</h4>
                        
                        <h3>Profession</h3>
                        <h4>{data.profissao}</h4>

                        <h3>City</h3>
                        <h4>{data.cidade}</h4>

                        <h3>Description</h3>
                        <h4>{data.desc}</h4>

                        <button className="action" style={{ backgroundColor: '#0096FF' }} onClick={ () => backToDashboard()}>
                            <FiArrowLeft color='#FFF' size={17}/>
                        </button>

                    </form>
                </div>

                <div className="login">
                    <Link className='nav-link' onClick={() => logout()}>Logout</Link>
                </div>
            </body>
        </div>
    );

}