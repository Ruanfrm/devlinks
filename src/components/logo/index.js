import './logo.css'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <div>
        <Link to="/">
        <h1 className='logo'>Ruan<span className='logo-text'>Freire</span></h1>
        </Link>
    </div>
  )
}
