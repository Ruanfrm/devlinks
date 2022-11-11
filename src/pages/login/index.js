import './login.css'
import { useState } from 'react'
import Logo from '../../components/logo'
import {auth} from '../../services/conectionfirebase' 
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Input from "../../components/input"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  function handleLogin(e){
    e.preventDefault();
 
    if(email == '' || password === ''){
      toast.error("preencha todos os campos!!!")       
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      toast.success('Bem-Vindo de volta!');
      navigate("/admin", {replace: true })

    })
    .catch(() => {
      toast.error('algo deu errado');
    })
    

  }

  return (
    <div className='login-container'>
      <Logo/>

        <form className='form' action='' method='post' onSubmit={handleLogin}>
          <label>Qual o seu e-mail?</label>
          <Input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite seu e-mail'
          />
          <label>Qual a sua senha?</label>
            <Input type="password"
          placeholder='Digite sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='on'
          />

          <button type='submit'>Entrar</button>
        </form>

    </div>
  )
}
