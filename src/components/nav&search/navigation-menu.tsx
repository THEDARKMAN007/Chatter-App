import { auth } from './../../firebase/Firebase'
import { Link } from 'react-router-dom'

import feed from '../../assets/images/nav&search/ftxtoken.svg'
import bookmarks from '../../assets/images/nav&search/material-symbols_bookmarks-outline.svg'
import teamBlogs from '../../assets/images/nav&search/ant-design_team-outlined.svg'
import drafts from '../../assets/images/nav&search/material-symbols_drafts-outline.svg'
import analytics from '../../assets/images/nav&search/ic_outline-analytics.svg'
import trending from '../../assets/images/nav&search/eva_trending-up-outline.svg'
import account from '../../assets/images/nav&search/mdi_account-outline.svg'
import notifications from '../../assets/images/nav&search/basil_notification-outline.svg'

const blogCategoriesArray: string[] = [
  'Programming',
  'Data science',
  'Technology',
  'Machine learning',
  'Politics',
]
const blogCategories = blogCategoriesArray.map((blogCategory) => {
  return (
    <li key={blogCategory} className='text-[#626262] font-[400] leading-[1.5]'>
      {blogCategory}
    </li>
  )
})

export const NavMenu = () => {
  return (
    <nav className='col-span-1 md:flex flex-col items-center border min-h-screen hidden'>
      <Link to='/'>
        <h1 className='text-[#543EE0] text-[calc(1rem+1.111vw)] leading-[1.5] font-[500]'>
          CHATTER
        </h1>
      </Link>
      <h2 className='text-[calc(0.6rem+0.625vw)] py-[1.3em] font-[400]'>
        Overview
      </h2>
      <ul className='flex flex-col gap-[calc(0.9375rem+1.0417vw)]'>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={feed} alt='feed-image' />
            <h3>Feed</h3>
          </Link>
        </li>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={bookmarks} alt='bookmarks-image' />
            <h3>Bookmarks</h3>
          </Link>
        </li>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={teamBlogs} alt='teamBlogs-image' />
            <h3>Team blogs</h3>
          </Link>
        </li>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={drafts} alt='drafts-image' />
            <h3>Drafts</h3>
          </Link>
        </li>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={analytics} alt='analytics-image' />
            <h3>Analytics</h3>
          </Link>
        </li>
      </ul>

      <h2 className='flex flex-row text-[calc(0.6rem+0.625vw)] py-[1.3em] gap-1 font-[400]'>
        <div>Trending Tags</div>
        <img src={trending} alt='trending-image' />
      </h2>
      <ul className='flex flex-col gap-[calc(0.9375rem+1.0417vw)]'>
        {blogCategories}
      </ul>

      <h2 className='text-[calc(0.6rem+0.625vw)] py-[1.3em]'>Personal</h2>
      <ul className='flex flex-col gap-[calc(0.9375rem+1.0417vw)]'>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={account} alt='account-image' />
            <h3>Account</h3>
          </Link>
        </li>
        <li>
          <Link
            to='/feed'
            className='flex flex-row gap-[calc(0.375rem+0.42vw)] text-[#626262] font-[400] leading-[1.5]'
          >
            <img src={notifications} alt='notifications-image' />
            <h3>Notifications</h3>
          </Link>
        </li>
      </ul>

      <button
        type='button'
        className='text-[calc(0.6rem+0.625vw)] py-[1.3em] font-[400]'
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
        Log out
      </button>
    </nav>
  )
}
