import notificationBellIcon from '../../assets/images/nav&search/basil_notification-outline.svg'
import searchIcon from '../../assets/images/nav&search/Vector.svg'

interface Props {
  profilePic: string
  search: string
  onSearchChange: (arg:string)=>void
}

export const SearchBar = (props: Props) => {

  return (
    <header className='col-span-5 flex flex-row items-center justify-evenly border'>
      <div className='flex flex-row w-[70%] gap-5'>
        <input
          type='search'
          name='search'
          id='search'
          className='border'
          value={props.search}
          onChange={(e) => {
            e.preventDefault()
            props.onSearchChange(e.target.value)
          }}
        />
        <button className='bg-[blue] px-5'>
          <img src={searchIcon} alt='feed-image' className='inline mr-2' />
          search
        </button>
      </div>
      <div className='flex flex-row gap-9'>
        <img src={notificationBellIcon} alt='notification bell icon' />
        <img
          src={props.profilePic}
          alt=''
          className='border rounded-full'
          width={'30px'}
          height={'30px'}
        />
      </div>
    </header>
  )
}
