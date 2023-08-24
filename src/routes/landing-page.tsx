import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from '../firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth'

//IMAGES
import aboutChatter from '../assets/images/landing-page/about-chatter-landing-page.svg'
import analyticIcon from '../assets/images/landing-page/Ellipse 6.jpg'
import socialIntIcon from '../assets/images/landing-page/Ellipse 6 (2).jpg'
import contCreatIcon from '../assets/images/landing-page/contentcreation.jpg'
import softwareEng from '../assets/images/landing-page/unsplash_ZHvM3XIOHoE.jpg'
import pic1 from '../assets/images/landing-page/1.png'
import pic2 from '../assets/images/landing-page/2.jpg'
import pic3 from '../assets/images/landing-page/3.jpg'

export const LandingPage = () => {
  const [userState, setUserState] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUserState(true)
      } else {
        setUserState(false)
      }
    })
  }, [userState])
  const navigate = useNavigate()

  return (
    <div className='text-[#111]'>
      <header className='flex flex-row w-[90%] mx-auto items-center justify-between'>
        <h1 className='text-[#543EE0] font-[700] leading-[1.5em] sm:text-[max(3.33vw)]'>
          CHATTER
        </h1>
        <nav className='flex flex-row items-center sm:w-[62.%] sm:gap-[12vw]'>
          <ul className='text-[#111] font-[700] leading-[1.5em] hidden flex-row sm:flex sm:text-[1.11vw] gap-[1.67vw]'>
            <li>
              <Link to={{ pathname: '/' }}>Home</Link>
            </li>
            <li>
              <a href='/#about us'>About us</a>
            </li>
            <li>
              <a href='/#contacts'>Contacts</a>
            </li>
            <li>
              <Link to={{ pathname: '/feed' }}>Blogs</Link>
            </li>
          </ul>
          {userState ? (
            <div className='flex flex-row items-center justify-between'>
              <div className='hidden'>
                welcome!! {auth.currentUser?.photoURL}
              </div>{' '}
              <div
                onClick={() => {
                  auth
                    .signOut()
                    .then(() => setUserState(false))
                    .catch((error) =>
                      console.log('Error during sign-out: ', error),
                    )
                }}
                className='border border-[#543EE0] font-[700] leading-[1.5em] rounded-[0.44em] sm:text-[1.25vw] sm:py-[0.44em] sm:px-[0.88em] mr-[1.44vw]'
              >
                Log out
              </div>
            </div>
          ) : (
            <div>
              <Link to='sign-up/login'>
                <button
                  type='button'
                  className='border border-[#543EE0] font-[700] leading-[1.5em] rounded-[0.44em] sm:text-[1.25vw] sm:py-[0.44em] sm:px-[0.88em] mr-[1.44vw]'
                >
                  Log in
                </button>
              </Link>
              <Link to='sign-up'>
                <button
                  type='button'
                  className='bg-[#543EE0] text-[#FFF] font-[700] leading-[1.5em] rounded-[0.44em] sm:text-[1.25vw] sm:py-[0.44em] sm:px-[0.88em]'
                >
                  sign up
                </button>
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section
          className='py-[216px] px-[228px] text-[#FFF] bg-cover bg-center bg-no-repeat opacity-100'
          style={{
            backgroundImage:
              "url('/src/assets/images/landing-page/chatter-hero-img.jpg')",
          }}
        >
          <h1 className='font-[700] leading-[1.5em] sm:text-[3.33vw] mb-[0.5em] text-[black]'>
            Welcome to Chatter: A Haven for Text-Based Content
          </h1>
          <p className='font-[500] leading-[1.5em] sm:text-[1.67vw] sm:w-[75%] mb-[1.5em] text-[black]'>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
          <button
            type='button'
            className='bg-[#543EE0] leading-[1.5em] font-[700] sm:text-[1.25vw] sm:py-[0.44em] sm:px-[0.88em] rounded-[0.44em]'
            onClick={() => {
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  navigate('/feed')
                } else {
                  navigate('sign-up')
                }
              })
            }}
          >
            Get started
          </button>
        </section>

        <section
          className='text-[#111] flex flex-col sm:w-[90%] sm:mx-auto sm:flex-row sm:justify-between sm:mt-[6.67vw]'
          id='about us'
        >
          <aside className='sm:w-[53%]'>
            <h1 className='font-[700] leading-[1.5em] sm:text-[3.33vw] mb-[1.4em]'>
              About Chatter
            </h1>
            <p className='font-[400] leading-[1.5em] sm:text-[1.25vw]'>
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive{' '}
            </p>
          </aside>
          <img
            src={aboutChatter}
            alt='about-chatter-img'
            className='sm:w-[38.6%]'
          />
        </section>

        <section className='sm:w-[74.28%] sm:mx-auto sm:mt-[6.66vw]'>
          <h1 className='text-center font-[700] leading-[1.5em] sm:text-[3.33vw] mb-[0.5em]'>
            Why you should join chatter
          </h1>
          <p className='font-[400] leading-[1.5em] sm:text-[1.25vw] sm:mb-[3em]'>
            Our goal is to make writers and readers see our platform as their
            next heaven for blogging, ensuring ease in interactions, connecting
            with like-minded peers, have access to favorite content based on
            interests and able to communicate your great ideas with people
          </p>
          <ul className='flex flex-col sm:flex-row sm:items-start sm:justify-between'>
            <li className='sm:w-[29.4%] border rounded-[0.44em] border-[#D0D0D0] sm:py-[1.04vw] sm:px-[1.25vw] sm:flex sm:flex-col sm:gap-[0.83vw]'>
              <img
                src={analyticIcon}
                alt='analytics-icon'
                className='sm:w-[6.4vw] sm:h-[6.11vw]'
              />
              <h3 className='font-[500] sm:text-[1.67vw] leading-[1.5em]'>
                Analytics
              </h3>
              <p className='font-[400] leading-[1.5em] sm:text-[1.25vw] text-[#626262]'>
                Analytics to track the number of views, likes and comment and
                also analyze the performance of your articles over a period of
                time
              </p>
            </li>
            <li className='sm:w-[29.4%] border rounded-[0.44em] border-[#D0D0D0] sm:py-[1.04vw] sm:px-[1.25vw] sm:flex sm:flex-col sm:gap-[0.83vw]'>
              <img
                src={socialIntIcon}
                alt='social-interaction-icon'
                className='sm:w-[6.4vw] sm:h-[6.11vw]'
              />
              <h3 className='font-[500] sm:text-[1.67vw] leading-[1.5em]'>
                Social interactions
              </h3>
              <p className='font-[400] leading-[1.5em] sm:text-[1.25vw] text-[#626262]'>
                Users on the platform can interact with posts they like, comment
                and engage in discussions
              </p>
            </li>
            <li className='sm:w-[29.4%] border rounded-[0.44em] border-[#D0D0D0] sm:py-[1.04vw] sm:px-[1.25vw] sm:flex sm:flex-col sm:gap-[0.83vw]'>
              <img
                src={contCreatIcon}
                alt='cont-creation-icon'
                className='sm:w-[6.4vw] sm:h-[6.11vw]'
              />
              <h3 className='font-[500] sm:text-[1.67vw] leading-[1.5em]'>
                Content creation
              </h3>
              <p className='font-[400] leading-[1.5em] sm:text-[1.25vw] text-[#626262]'>
                Write nice and appealing with our in-built markdown, a rich text
                editor
              </p>
            </li>
          </ul>
        </section>

        <section className='mt-[7.43vw] bg-[#FFEDCC80] flex flex-col sm:flex-row sm:gap-[1.8vw] py-[3.61vw] px-[3.68vw] text-[#111]'>
          <img
            src={softwareEng}
            alt='software engineer at apple'
            className='sm:w-[25vw] sm:h-[25vw]'
          />
          <div className='flex flex-col'>
            <blockquote className='font-[400] leading-[1.5em] sm:text-[1.25vw] mb-[3.2em]'>
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”
            </blockquote>
            <cite className='font-[500] sm:text-[1.67vw] leading-[1.5em] sm:mb-[1em]'>
              <b>Adebobola Muhydeen,</b> Software developer at Apple{' '}
            </cite>
            <button
              type='button'
              className='sm:w-[17%] sm:text-[1.25vw] font-[700] px-[0.89em] py-[0.44em]  leading-[1.5em] rounded-[0.44em] text-[#FFF] bg-[#543EE0]'
              onClick={() => {
                onAuthStateChanged(auth, (user) => {
                  if (user) {
                    navigate('/feed')
                  } else {
                    navigate('sign-up')
                  }
                })
              }}
            >
              Join chatter
            </button>
          </div>
        </section>
        <section className='sm:w-[78.26%] sm:mx-auto sm:flex sm:flex-row sm:justify-between sm:my-[6.67vw]'>
          <div className='sm:w-[31.2%] text-center flex flex-col'>
            <img
              src={pic1}
              alt='pic1'
              className='sm:rounded-[100%] sm:w-[11.7vw] sm:h-[11.7vw]'
            />
            <img
              src={pic2}
              alt='pic2'
              className='sm:rounded-[100%] sm:w-[11.7vw] sm:h-[11.7vw] sm:self-end'
            />
            <img
              src={pic3}
              alt='pic3'
              className='sm:rounded-[100%] sm:w-[11.7vw] sm:h-[11.7vw]'
            />
          </div>
          <div className='sm:w-[58.2%]'>
            <h1 className='sm:text-[3.33vw] sm:pb-[0.5em] leading-[1.5em] font-[700]'>
              Write, read and connect with great minds on chatter
            </h1>
            <p className='sm:text-[1.25vw] sm:pb-[1.78em] font-[400] leading-[1.5em]'>
              Share people your great ideas, and also read write-ups based on
              your interests. connect with people of same interests and goals{' '}
            </p>
            <button
              type='button'
              className='sm:w-[24%] sm:text-[1.25vw] font-[700] px-[0.89em] py-[0.44em]  leading-[1.5em] rounded-[0.44em] text-[#FFF] bg-[#543EE0]'
              onClick={() => {
                onAuthStateChanged(auth, (user) => {
                  if (user) {
                    navigate('/feed')
                  } else {
                    navigate('sign-up')
                  }
                })
              }}
            >
              Get started
            </button>
          </div>
        </section>
      </main>
      <footer
        className='bg-[#FFEDCC80] flex sm:flex-row sm:justify-around sm:pb-[11.45vw] sm:pt-[4.16vw]'
        id='contacts'
      >
        <h1 className='text-[#543EE0] font-[700] leading-[1.5em] sm:text-[max(3.33vw)]'>
          CHATTER
        </h1>
        <div>
          <h2 className='leading-[1.5em] font-[500] sm:text-[1.67vw] pb-[1.16vw]'>
            Explore
          </h2>
          <nav className='sm:text-[1.25vw] flex flex-col gap-[1.125em]'>
            <ul>community</ul>
            <ul>Trending blogs</ul>
            <ul>Chatter for teams</ul>
          </nav>
        </div>
        <div>
          <h2 className='leading-[1.5em] font-[500] sm:text-[1.67vw] pb-[1.16vw]'>
            Support
          </h2>
          <nav className='sm:text-[1.25vw] flex flex-col gap-[1.125em]'>
            <ul>Support docs</ul>
            <ul>Join slack</ul>
            <ul>Contact</ul>
          </nav>
        </div>
        <div>
          <h2 className='leading-[1.5em] font-[500] sm:text-[1.67vw] pb-[1.16vw]'>
            Official blog
          </h2>
          <nav className='sm:text-[1.25vw] flex flex-col gap-[1.125em]'>
            <ul>Official blog</ul>
            <ul>Engineering blog</ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}
