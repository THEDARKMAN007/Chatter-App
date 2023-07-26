import { Link } from 'react-router-dom'
import aboutChatter from '../assets/images/landing-page/about-chatter-landing-page.svg'

export const LandingPage = () => {
  return (
    <div className='w-[min(100%,1440px)] border m-auto'>
      <header>
        <h1>CHATTER</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
          <Link to='sign-up/login'>
            <button type='button'>Log in</button>
          </Link>

          <Link to='sign-up'>
            <button type='button'>sign up</button>
          </Link>
        </nav>
      </header>
      <main>
        <section>
          <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>{' '}
          <button type='button'>Get started</button>
        </section>
        <section>
          <article>
            <h1>About Chatter</h1>
            <p>
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive{' '}
            </p>
          </article>
          <aside>
            <img src={aboutChatter} alt='about-chatter-img' />
          </aside>
        </section>
        <section>
          <article>
            <h1>Why you should join chatter</h1>
            <p>
              Our goal is to make writers and readers see our platform as their
              next heaven for blogging, ensuring ease in interactions,
              connecting with like-minded peers, have access to favorite content
              based on interests and able to communicate your great ideas with
              people
            </p>
          </article>
          <article>
            <div>
              <h1>Analytics</h1>
              <p>
                Analytics to track the number of views, likes and comment and
                also analyze the performance of your articles over a period of
                time
              </p>
            </div>
            <div>
              <h1>Social interactions</h1>
              <p>
                Users on the platform can interact with posts they like, comment
                and engage in discussions
              </p>
            </div>
            <div>
              <h1>Content creation</h1>
              <p>
                Write nice and appealing with our in-built markdown, a rich text
                editor
              </p>
            </div>
          </article>
        </section>
        <section>
          <aside>
            <img src='' alt='img' />
          </aside>
          <article>
            <p>
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”
            </p>
            <h1>Adebobola Muhydeen, Software developer at Apple </h1>
            <button type='button'>Join chatter</button>
          </article>
        </section>
        <section>
          <aside>
            <img src='' alt='' />
            <img src='' alt='' />
            <img src='' alt='' />
          </aside>
          <article>
            <h1>Write, read and connect with great minds on chatter</h1>
            <p>
              Share people your great ideas, and also read write-ups based on
              your interests. connect with people of same interests and goals{' '}
            </p>
            <button type='button'>Get started</button>
          </article>
        </section>
      </main>
      <footer>
        <h1>CHATTER</h1>
        <h2>Explore</h2>
        <nav>
          <ul>community</ul>
          <ul>Trending blogs</ul>
          <ul>Chatter for teams</ul>
        </nav>
        <h2>Support</h2>
        <nav>
          <ul>Support docs</ul>
          <ul>Join slack</ul>
          <ul>Contact</ul>
        </nav>
        <h2>Official blog</h2>
        <nav>
          <ul>Official blog</ul>
          <ul>Engineering blog</ul>
        </nav>
      </footer>
    </div>
  )
}
