import { Outlet } from 'react-router-dom'
import { NavMenu } from './../../components/nav&search/navigation-menu'
import { SearchBar } from './../../components/nav&search/search-bar'

export const Feed = () => {
  return (
    <>
      <NavMenu />
      <SearchBar />
      <Outlet />
    </>
  )
}
