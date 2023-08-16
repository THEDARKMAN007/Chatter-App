import { auth } from './../../firebase/Firebase'

export const NavMenu = () => {
  return (
    <>
      <aside className='w-[20%] flex flex-col'>
        <button type='button'>
          <h1>CHATTER</h1>
        </button>
        <button type='button'>
          <h2>Overview</h2>
        </button>
        <button type='button'>
          <h3>Feed</h3>
        </button>
        <button type='button'>
          <h3>Bookmarks</h3>
        </button>
        <button type='button'>
          <h3>Team blogs</h3>
        </button>
        <button type='button'>
          <h3>Drafts</h3>
        </button>
        <button type='button'>
          <h3>Analytics</h3>
        </button>
        <button type='button'>
          <h2>Trending Tags</h2>
        </button>
        <button type='button'>
          <h3>topics</h3>
        </button>
        <button type='button'>
          <h2>Personal</h2>
        </button>
        <button type='button'>
          <h3>Account</h3>
        </button>
        <button type='button'>
          <h3>Notifications</h3>
        </button>
        <button
          type='button'
          onClick={() => {
            auth
              .signOut()
              .then(() => {
                alert('successfully signed out')
              })
              .catch((error) => {
                console.error(error)
              })
          }}
        >
          <h2>Log out</h2>
        </button>
      </aside>
    </>
  )
}
