import { Outlet } from 'react-router-dom'
import { NavMenu } from '../../components/nav&search/navigation-menu'
import { SearchBar } from '../../components/nav&search/search-bar'

export const Feed = () => {
  return (
    <>
      <NavMenu />
      <SearchBar />
      <section>
        <h1>FEED</h1>
        <p>Explore different content you’d love </p>
        <button type='button'>Post a content</button>
        <nav>
          <button type='button'>
            <h2>For you</h2>
          </button>
          <button type='button'>
            <h2>Featured</h2>
          </button>
          <button type='button'>
            <h2>Recent</h2>
          </button>
        </nav>
        <Outlet />
      </section>
    </>
  )
}
