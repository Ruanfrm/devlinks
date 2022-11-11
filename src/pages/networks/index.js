import "./networks.css"
import Header from '../../components/header'
import Input from "../../components/input"
import {MdAddLink} from 'react-icons/md'
import { useEffect, useState } from "react"
import { db } from "../../services/conectionfirebase"
import {
  setDoc,
  doc,
  getDoc,
  
} from 'firebase/firestore'
import { toast } from "react-toastify"

export default function Networks() {

    const [git, setGit] = useState();
    const [instagram, setInstagram ] = useState();
    const [linkedin, setLinkedin] = useState();
    const [twitter, setTwitter] = useState();

    

     function handlesave(e){
      e.preventDefault(); 
    
      setDoc(doc(db, "social", "link"), {
        github: git,
        instagram: instagram,
        linkedin: linkedin,
        twitter: twitter,
      })
      .then(() => {
        toast.success('Salvo com sucesso.')
      })
      .catch((error) => {
        toast.error('Error ao tentar salvar link.' + error)
      })
     

    }
    useEffect( () => {
      function loadLinks(){
        const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then( (snapshot) => {

          if(snapshot.data() !== undefined ) {
            setGit(snapshot.data().github)
            setInstagram(snapshot.data().instagram)
            setLinkedin(snapshot.data().linkedin)
            setTwitter(snapshot.data().twitter)
            toast.success('Links carregados com sucesso.')

          }
        })
        .catch((error) => {
          toast.error('Error ao retornar links' + error)
        })
      }

      loadLinks();
    }, [])

   

  return (
    <div className="admin-container">
        <Header/>

        <h1 className="title-social">Suas redes sociais</h1>

        <form className="form"  onSubmit={handlesave}>
            <label>Link GitHub</label>
            <Input
            placeholder="digite a url"
            value={git}
            type="url"
            onChange={(e) => setGit(e.target.value)}
            />
            <label>Link do instagram</label>
            <Input
           placeholder="digite a url"
           value={instagram}
           type="url"
            onChange={(e) => setInstagram(e.target.value)}
            />
            <label>Link do Linkedin</label>
            <Input
           placeholder="digite a url"
           value={linkedin}
           type="url"
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <label>Link do Twitter</label>
          <Input
           placeholder="digite a url"
           value={twitter}
           type="url"
            onChange={(e) => setTwitter(e.target.value)}
          />
            <button type="submit" className="btn-register">salvar links <MdAddLink size={24} color="#fff"/> </button>
        </form>
    
    </div>
    )
}
