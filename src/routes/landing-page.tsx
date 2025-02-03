import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback } from 'react';
import { BarChart, MessageCircle, Edit } from 'lucide-react';


// IMAGES
import heroImage from '../assets/images/landing-page/landing-page-hero-img.jpg';
import aboutChatter from '../assets/images/landing-page/about-chatter-landing-page.svg'
export const LandingPage = () => {
  const [userState, setUserState] = useState(false);
  const handleSignOut = useCallback(async () => {
  try {
    await auth.signOut();
    setUserState(false);
  } catch (error) {
    console.error("Error during sign-out: ", error);
  }
}, []);



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserState(!!user);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="text-[#111]">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
  <h1 className="text-[#543EE0] font-extrabold text-3xl tracking-wide">CHATTER</h1>
  <nav className="flex gap-8">
    <Link to="/" className="text-lg text-gray-700 hover:text-[#543EE0] transition duration-200">Home</Link>
    <Link to="#about" className="text-lg text-gray-700 hover:text-[#543EE0] transition duration-200">About</Link>
    <Link to="#contact" className="text-lg text-gray-700 hover:text-[#543EE0] transition duration-200">Contact</Link>
    {userState ? (
      <button
        className="font-semibold border-2 border-[#543EE0] rounded-full px-6 py-2 text-[#543EE0] hover:bg-[#543EE0] hover:text-white transition duration-200"
        onClick={handleSignOut}
      >
        Log Out
      </button>
    ) : (
      <div className="flex gap-6">
        <Link to="/sign-up/login">
          <button className="font-semibold border-2 border-[#543EE0] rounded-full px-6 py-2 text-[#543EE0] hover:bg-[#543EE0] hover:text-white transition duration-200">
            Log In
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="font-semibold bg-[#543EE0] text-white rounded-full px-6 py-2 hover:bg-[#4b32cc] transition duration-200">
            Sign Up
          </button>
        </Link>
      </div>
    )}
  </nav>
</header>


      <main>
        <section
          className="bg-cover bg-center text-center py-32"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <h1 className="text-4xl text-white font-bold mb-4">Welcome to Chatter</h1>
          <p className="text-lg text-white mb-6">Unleash the power of words. Connect with like-minded readers and writers.</p>
          <button
            className="bg-[#543EE0] text-white px-6 py-3 rounded-full"
            onClick={() => onAuthStateChanged(auth, (user) => user ? navigate('/feed') : navigate('sign-up'))}
          >
            Get Started
          </button>
        </section>

        <section id="about" className="text-center py-16 px-8">
          <h2 className="text-3xl font-bold mb-4">About Chatter</h2>
          <p className="text-lg text-gray-700 mb-6">
            Chatter is a community-driven platform where writers and readers can share ideas, explore content, and engage in meaningful discussions.
          </p>
          <img src={aboutChatter} alt="About Chatter" className="mx-auto" />
        </section>

        <section className="text-center py-16 px-8 bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">Why Join Chatter?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Chatter offers a seamless platform for writers to create, readers to explore, and everyone to engage.
          </p>
          <div className="flex justify-around">
            <div className="w-1/3">
             <BarChart className="mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Track your content's performance with detailed analytics.</p>
            </div>
            <div className="w-1/3">
              <MessageCircle className="mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Social Interactions</h3>
              <p className="text-gray-600">Engage with other users through comments and discussions.</p>
            </div>
            <div className="w-1/3">
              <Edit className="mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Content Creation</h3>
              <p className="text-gray-600">Create rich, engaging content with our powerful editor.</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-8">
          <blockquote className="text-center italic text-lg mb-4">
            "Chatter has become an integral part of my online experience. It's a vibrant community for sharing ideas and engaging in thoughtful discussions."
          </blockquote>
          <cite className="block text-center font-semibold text-xl mb-6">
            Adebobola Muhydeen, Software Developer at Apple
          </cite>
          <button
            className="bg-[#543EE0] text-white px-6 py-3 rounded-full mx-auto block"
            onClick={() => onAuthStateChanged(auth, (user) => user ? navigate('/feed') : navigate('sign-up'))}
          >
            Join Chatter
          </button>
        </section>
      </main>

      <footer id="contact" className="bg-[#FFEDCC80] py-8 text-center">
        <h1 className="text-[#543EE0] font-bold text-2xl mb-4">CHATTER</h1>
        <div className="flex justify-around">
          <div>
            <h2 className="font-semibold mb-2">Explore</h2>
            <ul className="text-sm">
              <li>Community</li>
              <li>Trending Blogs</li>
              <li>Chatter for Teams</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Support</h2>
            <ul className="text-sm">
              <li>Support Docs</li>
              <li>Join Slack</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Official Blog</h2>
            <ul className="text-sm">
              <li>Official Blog</li>
              <li>Engineering Blog</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
