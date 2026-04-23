import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import About from './pages/About'
import NotFound from './pages/NotFound'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Pokedex /> },
      { path: 'pokemon/:id', element: <PokemonDetail /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
