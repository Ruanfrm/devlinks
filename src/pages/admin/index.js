import { useEffect, useState } from 'react'
import Header from '../../components/header'
import './admin.css'
import Logo from '../../components/logo'
import Input from '../../components/input'
import {MdAddLink, MdListAlt} from 'react-icons/md'
import {FiTrash2} from 'react-icons/fi'
import { async } from '@firebase/util'
import {db} from '../../services/conectionfirebase'

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc

} from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Admin() {

  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState(" ");
  const [backgroundColorInput, setbackgroundColorInput] = useState("#F1F1F1");
  const [textColorInput, settextColorInput] = useState("#121212");

  const [links, setLinks] = useState([])

  useEffect(() => {
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    const unsub = onSnapshot(queryRef, (snapshot) => {

      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        }) 
      })

      setLinks(lista);

    })

  }, [])

async function handleRegister(e){
  e.preventDefault();

  if(nameInput === '' ||  urlInput === ''){
    toast.warn('Preencha todos os campos!!! ')
    return;
  }

  addDoc(collection(db, "links"), {
    name: nameInput,
    url: urlInput,
    bg: backgroundColorInput,
    color: textColorInput,
    created: new Date(),
  })
  .then(() => {
    setNameInput("")
    setUrlInput("")
    toast.success("Link cadastrado com sucesso ")
  })
  .catch((error) => {
    console.log('ERRO AO REGISTRAR' + error)
    toast.error("Ops erro ao salvar link")
  })
}

   async function handleDeleteLink(id){
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
    toast.success("Link deletado com sucesso!")
      
}

  return (
    <div className="admin-container" >
        <Header/>
        <Logo/>

        <form className='form' onSubmit={handleRegister}>
            <label>Nome do Link</label>
            <Input
            placeholder="Nome do Link"
            value={nameInput}
            onChange={(e) => {setNameInput(e.target.value)} }
            />
            <label>Url do Link</label>
            <Input
            type="url"
            placeholder="Url do Link"
            value={urlInput}
            onChange={(e) => {setUrlInput(e.target.value)} }
            />

            <section className='container-colors'>
               <div>
                <label className='label right'>Fundo do Link</label>
                <input 
                type="color"
                value={backgroundColorInput}
                onChange={(e) => {setbackgroundColorInput(e.target.value)} }
                />
               </div>
               <div>
                <label className='label right'>Cor do Link</label>
                <input 
                type="color"
                value={textColorInput}
                onChange={(e) => {settextColorInput(e.target.value)} }
                />
               </div>
            </section>

           {
            nameInput !== '' && (
              <div className='preview'>
              <label className='label'>Veja como está ficando 👇 </label>
            <article className='list' style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}>
              <p style={{color: textColorInput}}>{nameInput}</p>
            </article>
            </div>
            )
           }

            <button className='btn-register' type='submit' >
              Cadastrar <MdAddLink size={24} color='#FFF'/>
            </button>

        </form>

        <h2 className='title'>
          Meus Links
        </h2>

      {links.map((item, index) => (
          <article 
          key={index}
          className='list animate-pop'
          style={{ backgroundColor: item.bg, color: item.color}}
          >
            <p>{item.name}</p>
            <div >
              <button className='btn-delete' onClick={ () => handleDeleteLink(item.id)  }>
                <FiTrash2 size={18} color="#FFF"/>
              </button>
            </div>
          </article>
      ))}

    </div>
  )
}