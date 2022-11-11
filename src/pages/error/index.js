import './error.css'
import Logo from '../../components/logo'
import { Link } from 'react-router-dom'
export default function Error() {
  return (
    <div className='error'>
      <Logo/>
        <h1>
            Pagina não encontrada!
        </h1>
        <p>A pagina que está procurando não existe</p>
        <Link to="/" className="link">Voltar para Home.</Link>
    </div> 
  )
}
