import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiTrash } from 'react-icons/fi'
import { collection, getDocs, orderBy, limit, startAfter, query, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

import './dashboard.css';

const listRef = collection(db, "forms")

export default function Dashboard() {

    const { user, logout } = useContext(AuthContext);

    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadAgendamentos(){
          const q = query(listRef, orderBy('created', 'desc'), limit(5));
    
          const querySnapshot = await getDocs(q)
          setForms([]);
    
          await updateState(querySnapshot)
    
          setLoading(false);
    
        }
    
        loadAgendamentos();
    
    
        return () => { }
    }, [])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;
    
        if(!isCollectionEmpty){
          let lista = [];
    
          querySnapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              email: doc.data().email,
              celular: doc.data().celular,
              endereco: doc.data().endereco,
              profissao: doc.data().profissao,
              cidade: doc.data().cidade,
              desc: doc.data().desc,
              created: doc.data().created,
            })
          })
    
          const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // Pegando o ultimo item
    
          setForms(forms => [...forms, ...lista])
          setLastDocs(lastDoc);
    
        }else{
          setIsEmpty(true);
        }
    
        setLoadingMore(false);
    
    }

    async function handleMore(){
        setLoadingMore(true);

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs),  limit(5));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);

    }

    async function deleteAgendamento(item) {
        const docRef = doc(db, "forms", item.id)

        await deleteDoc(docRef).then(() => {
            setForms(forms => forms.filter(a => a.id !== item.id));
            toast.info("Form deleted.")
            
        }).catch((error) => {
            toast.error("Error in delete.")
            console.log(error)
        })
    }

    async function searchForm(item) {
        const docRef = doc(db, "forms", item.id)
        navigate(`/forms/${item.id}`);
    }

    return(
        <div>
            <body>
                <img id="logo-empresa" src={require('../../images/unique_6.png')} alt="logo_empresa"/>
                <div className="container">
                    <img id="nome-empresa" src={require('../../images/unique_7.png')} alt="nome_empresa"/>
                    <div className='box-table'>
                    <table>
                              <thead>
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">#</th>
                                </tr>
                              </thead>
                              <tbody>
                                {forms.map((item, index) => {
                                  return(
                                    <tr key={index}>
                                      <td data-label="Id">{item.id}</td>
                                      <td data-label="#">
                                        <button className="action" style={{ backgroundColor: '#0096FF' }} onClick={ () => searchForm(item)}>
                                          <FiSearch color='#FFF' size={17}/>
                                        </button>
                                        <button className="action" style={{ backgroundColor: '#FA8072' }} onClick={ () => deleteAgendamento(item)}>
                                          <FiTrash color='#FFF' size={17}/>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>   
                            {loadingMore && <h4 style={{color: '#fff'}}>Search...</h4>}    
                            {!loadingMore && !isEmpty && <form><input type="submit" style={{padding: '11px 145px'}} value="Search more" onClick={handleMore}/></form> }
                        </div>
                </div>

                <div className="login">
                    <Link className='nav-link' onClick={() => logout()}>Logout</Link>
                </div>

            </body>
        </div>
    );
}