import './home.css'
import Social from '../../components/social'
import {FaInstagram, FaGithub, FaTwitter, FaLinkedin} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import {
  getDocs,
  collection,
  orderBy,
  query,
  getDoc,
  doc
} from 'firebase/firestore'
import {db} from '../../services/conectionfirebase'


export default function Home() {


  const [links, setLinks] = useState([])
  const [socialLinks, setSocialLinks] = useState({})


  useEffect(() => {

    function loadLinks(){
      
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
      .then( (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })


          setLinks(lista)

        } )
      })


    }

    loadLinks();

  }, [])

  useEffect(() => {
    function loadSocialLinks(){
      const docRef = doc(db, "social", "link")

      getDoc(docRef)
      .then((snapshot) => { 
        if (snapshot.data() != undefined){
          setSocialLinks({
            github: snapshot.data().github,
            instagram: snapshot.data().instagram,
            linkedin: snapshot.data().linkedin,
            twitter: snapshot.data().twitter
          })
        }
      })
    }
    loadSocialLinks();
  }, [])

  


  return (
    <div className='home-container'>

<header>
      <div>
        <img
          src="https://github.com/Ruanfrm.png"
          alt="Ruan Freire foto"
          className='header-img'
        />
      </div>
    </header>


        <h1>Ruan Freire</h1>
        <span>Veja meus links 👇</span>

        <main className='links'>
        
        {links.map((item) => (
        <section className='link-area' style={{backgroundColor: item.bg}}>
          <a href={item.url} target="_blank">
            <p className='link-text' style={{ color: item.color }}>{item.name}</p>
          </a>
        </section>
        ))}
      

        {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
          <Social url={socialLinks?.instagram}>
            <FaInstagram size={25} color="#fff"/> 
          </Social>
          <Social url={socialLinks?.github}>
          <FaGithub size={25} color="#fff"/>
          </Social>
          <Social url={socialLinks?.twitter}>
          <FaTwitter size={25} color="#fff"/>
          </Social>
          <Social url={socialLinks?.linkedin}>
            <FaLinkedin  size={25} color="#fff"/>
          </Social>
        </footer>  
        )}
         
        </main>
      
    </div>
  )
}
