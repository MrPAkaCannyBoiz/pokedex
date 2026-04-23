import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="notfound-page">
      <div className="notfound-number">404</div>
      <h1>Page Not Found</h1>
      <p>Looks like this Pokémon ran away!</p>
      <button onClick={() => navigate('/')}>Return to Pokédex</button>
    </div>
  )
}
