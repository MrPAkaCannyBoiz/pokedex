import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <div className="about-icon">⊙</div>
        <h1>About Pokédex</h1>
        <p>
          This Pokédex is a web application built with <strong>React</strong> and{' '}
          <strong>Vite</strong> that lets you browse and explore all Pokémon from
          the official Pokémon games.
        </p>
        <p>
          All Pokémon data is sourced from{' '}
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a>,
          a free and open RESTful API for Pokémon data.
        </p>

        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <strong>React 19</strong>
            <span>UI framework</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">⚡</span>
            <strong>Vite</strong>
            <span>Build tool</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🔀</span>
            <strong>React Router</strong>
            <span>Client routing</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🔴</span>
            <strong>PokéAPI</strong>
            <span>Data source</span>
          </div>
        </div>

        <div className="features-list">
          <h2>Features</h2>
          <ul>
            <li>Browse all Pokémon with paginated list view</li>
            <li>Click any Pokémon to view detailed stats, types, and abilities</li>
            <li>View base stats with visual stat bars</li>
            <li>See official artwork and pixel sprites</li>
            <li>Navigate between Pokémon with previous/next buttons</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
