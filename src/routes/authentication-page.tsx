import '../index.css'
import { Outlet } from 'react-router-dom'

export const AuthenticationPage = () => {
  return (
    <>
      <main className='grid grid-cols-2 text-start'>
        <section>
          <h1>CHATTER</h1>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
        </section>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  )
}
