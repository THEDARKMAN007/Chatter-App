import notificationBellIcon from '../../assets/images/nav&search/basil_notification-outline.svg'
import searchIcon from '../../assets/images/nav&search/Vector.svg'

interface Props {
  profilePic: string
}

export const SearchBar = (props: Props) => {
  return (
    <header className='border grid grid-flow-col'>
      <img src={searchIcon} alt='feed-image' />
      <input type='search' name='' id='' className='border bg-top bg-centre bg-contain' style={{backgroundImage:"url('../../assets/images/nav&search/basil_notification-outline.svg')"}} />
      <img src={notificationBellIcon} alt='notification bell icon' />
      <img src={props.profilePic} alt='' className='border' />
    </header>
  )
}
