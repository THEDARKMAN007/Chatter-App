import '../index.css'
import { Outlet } from 'react-router-dom'
import backgroudImg from '../assets/images/authentication/young-woman-with-book-on-head.jpg'

export const AuthenticationPage = () => {
  return (
    <>
      <main className='flex flex-col sm:flex-row h-[100vh]'>
        <section
          className='h-[35vh] bg-cover flex items-center sm:justify-center sm:h-[auto] sm:w-[43.2%] bg-center sm:bg-cover bg-no-repeat'
          style={{ backgroundImage: `url(${backgroudImg})` }}
        >
          <div className='w-[88.4%] mx-auto'>
            <h1 className='text-[max(40px,10.6vw)] sm:text-[3.33vw] font-[700] leading-[1.5em] pb-[0.5em] text-center text-[white]'>
              CHATTER
            </h1>
            <p className='text-[max(15px,4vw)] text-center sm:text-[1.665vw] sm:text-start font-[500] leading-[1.5em] text-[white]'>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </section>
        <section className='sm:w-[56.8%] flex items-center justify-center'>
          <Outlet />
        </section>
      </main>
    </>
  )
}
