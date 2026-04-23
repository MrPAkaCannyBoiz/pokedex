import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './PokemonDetail.css'

const TYPE_COLORS = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
}

const STAT_LABELS = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'Sp.ATK', 'special-defense': 'Sp.DEF', speed: 'SPD',
}

export default function PokemonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => {
        if (!r.ok) throw new Error('Pokémon not found')
        return r.json()
      }),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(r => r.ok ? r.json() : null),
    ])
      .then(([poke, spec]) => {
        setPokemon(poke)
        setSpecies(spec)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="detail-loading"><div className="spinner" /></div>
  if (error) return <div className="detail-error"><p>{error}</p><button onClick={() => navigate('/')}>← Back</button></div>

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const paddedId = String(pokemon.id).padStart(3, '0')
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
  const mainType = pokemon.types[0].type.name
  const accentColor = TYPE_COLORS[mainType] || '#888'
  const flavorText = species?.flavor_text_entries
    .find(e => e.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ')
  const maxStat = 255

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card" style={{ '--accent': accentColor }}>
        <div className="detail-hero" style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)` }}>
          <div className="detail-id">#{paddedId}</div>
          <img
            className="detail-img"
            src={imageUrl}
            alt={name}
            onError={(e) => { e.target.src = pokemon.sprites.front_default }}
          />
        </div>

        <div className="detail-body">
          <h1 className="detail-name">{name}</h1>

          <div className="type-badges">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="type-badge"
                style={{ background: TYPE_COLORS[type.name] || '#888' }}
              >
                {type.name}
              </span>
            ))}
          </div>

          {flavorText && <p className="flavor-text">{flavorText}</p>}

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Height</span>
              <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Weight</span>
              <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="info-item">
              <span className="info-label">Base Exp</span>
              <span className="info-value">{pokemon.base_experience ?? '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Abilities</span>
              <span className="info-value abilities">
                {pokemon.abilities
                  .map(({ ability, is_hidden }) =>
                    ability.name.replace('-', ' ') + (is_hidden ? ' (hidden)' : ''))
                  .join(', ')}
              </span>
            </div>
          </div>

          <div className="stats-section">
            <h2>Base Stats</h2>
            {pokemon.stats.map(({ stat, base_stat }) => (
              <div key={stat.name} className="stat-row">
                <span className="stat-label">{STAT_LABELS[stat.name] || stat.name}</span>
                <span className="stat-value">{base_stat}</span>
                <div className="stat-bar-bg">
                  <div
                    className="stat-bar-fill"
                    style={{
                      width: `${(base_stat / maxStat) * 100}%`,
                      background: accentColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {pokemon.sprites && (
            <div className="sprites-section">
              <h2>Sprites</h2>
              <div className="sprites-grid">
                {[
                  ['Front', pokemon.sprites.front_default],
                  ['Back', pokemon.sprites.back_default],
                  ['Shiny Front', pokemon.sprites.front_shiny],
                  ['Shiny Back', pokemon.sprites.back_shiny],
                ].filter(([, src]) => src).map(([label, src]) => (
                  <div key={label} className="sprite-item">
                    <img src={src} alt={label} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-nav">
        {pokemon.id > 1 && (
          <button className="nav-btn" onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}>
            ← #{String(pokemon.id - 1).padStart(3, '0')}
          </button>
        )}
        <button className="nav-btn" onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}>
          #{String(pokemon.id + 1).padStart(3, '0')} →
        </button>
      </div>
    </div>
  )
}
