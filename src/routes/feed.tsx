import { Outlet } from 'react-router-dom'
import { NavMenu } from '../components/nav&search/navigation-menu'
import { SearchBar } from '../components/nav&search/search-bar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/Firebase'
import { useEffect, useState } from 'react'
import userProfileImg from '../assets/images/nav&search/userProfileImg.png'

export const Feed = () => {
  const [profilePic, setProfilePic] = useState('')
  const [userID, setUserID] = useState<string | undefined>('')

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
        <SearchBar profilePic={profilePic} />
        <main>
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
        </main>
      </div>
    </div>
  )
}
