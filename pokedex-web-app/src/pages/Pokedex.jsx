import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
import './Pokedex.css'

const PAGE_SIZE = 20

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([])
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const offset = page * PAGE_SIZE
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${offset}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch Pokémon')
        return res.json()
      })
      .then(data => {
        setPokemon(data.results)
        setTotalCount(data.count)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="pokedex-page">
      <div className="pokedex-header">
        <h1>Pokédex</h1>
        <p className="pokedex-subtitle">Browse all {totalCount} Pokémon</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemon.map(p => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          «
        </button>
        <button
          className="page-btn"
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0}
        >
          ‹ Previous
        </button>
        <span className="page-info">
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={() => setPage(p => p + 1)}
          disabled={page >= totalPages - 1}
        >
          Next ›
        </button>
        <button
          className="page-btn"
          onClick={() => setPage(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          »
        </button>
      </div>
    </div>
  )
}
