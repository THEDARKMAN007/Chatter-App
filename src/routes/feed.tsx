import { Outlet, Link, useLocation } from 'react-router-dom'
import  {NavMenu}  from '../components/nav&search/navigation-menu'
import { SearchBar } from '../components/nav&search/search-bar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/Firebase'
import { useEffect, useState } from 'react'
import userProfileImg from '../assets/images/nav&search/userProfileImg.png'

export const Feed = () => {
  const [profilePic, setProfilePic] = useState('')
  const [userID, setUserID] = useState<string | undefined | null>()
  const location = useLocation()
  const [search, setSearch] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (typeof user?.photoURL === 'string') {
        setProfilePic(user?.photoURL)
      } else setProfilePic(userProfileImg)
      setUserID(user?.uid)
    })
  }, [userID])


  return (
    <div className='border grid grid-flow-col grid-cols-[6]'>
      <div className='col-span-1'>
        <NavMenu />
      </div>
      <div className='col-span-5'>
        <SearchBar profilePic={profilePic} search={search} onSearchChange={setSearch} />
        <main className='m-[1rem] border p-5'>
          <div className='flex flex-row items-center justify-between'>
            <h1>
              FEED
              <p>Explore different content you’d love </p>
            </h1>
            <Link to='/post'>
              <button type='button' className='bg-[#543EE0] text-white'>
                Post a content
              </button>
            </Link>
          </div>

          <nav className='flex flex-row px-[1rem] items-center justify-between mt-[2rem] border'>
            <Link to='/feed'>
              <h2>For you</h2>
              {location.pathname === '/feed' ? (
                <div className='h-[4px] w-[100%] bg-[#543EE0]'></div>
              ) : (
                <div></div>
              )}
            </Link>
            <Link to='/feed/featured'>
              <h2>Featured</h2>
              {location.pathname === '/feed/featured' ? (
                <div className='h-[4px] w-[100%] bg-[#543EE0]'></div>
              ) : (
                <div></div>
              )}
            </Link>
            <Link to='/feed/recent'>
              <h2>Recent</h2>
              {location.pathname === '/feed/recent' ? (
                <div className='h-[4px] w-[100%] bg-[#543EE0]'></div>
              ) : (
                <div></div>
              )}
            </Link>
          </nav>
          <div className='border p-4'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
