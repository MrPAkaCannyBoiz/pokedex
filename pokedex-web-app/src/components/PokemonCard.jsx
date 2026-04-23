import { useNavigate } from 'react-router-dom'
import './PokemonCard.css'

const TYPE_COLORS = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
}

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate()
  const id = pokemon.url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const paddedId = String(id).padStart(3, '0')

  return (
    <div className="pokemon-card" onClick={() => navigate(`/pokemon/${id}`)}>
      <div className="card-id">#{paddedId}</div>
      <img
        className="card-img"
        src={imageUrl}
        alt={name}
        loading="lazy"
        onError={(e) => { e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
      />
      <div className="card-name">{name}</div>
    </div>
  )
}

export { TYPE_COLORS }
