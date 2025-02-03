import { auth } from './../../firebase/Firebase';
import { Link } from 'react-router-dom';
import { Home, Bookmark, Users, Edit, BarChart } from 'lucide-react';

export const NavMenu = () => {

  const handleSignOut = () => {
    auth.signOut().then(() => {
      alert('Successfully signed out');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <nav className="md:flex flex-col items-center min-h-screen bg-white shadow-xl rounded-lg p-8 hidden transition-all duration-300 ease-in-out transform hover:scale-105">
      <Link to="/" className="mb-8">
        <h1 className="text-[#543EE0] text-3xl font-semibold tracking-wide hover:text-[#4327B9] transition-all duration-200">
          CHATTER
        </h1>
      </Link>

      {/* Overview Section */}
      <h2 className="text-lg text-gray-700 font-medium my-6">Overview</h2>
      <ul className="space-y-6">
        <li>
          <Link to="/feed" className="flex items-center gap-4 text-gray-700 hover:text-[#543EE0] transition-all duration-200">
            <Home size={22} />
            <span>Feed</span>
          </Link>
        </li>
        <li>
          <Link to="/bookmarks" className="flex items-center gap-4 text-gray-700 hover:text-[#543EE0] transition-all duration-200">
            <Bookmark size={22} />
            <span>Bookmarks</span>
          </Link>
        </li>
        <li>
          <Link to="/team-blogs" className="flex items-center gap-4 text-gray-700 hover:text-[#543EE0] transition-all duration-200">
            <Users size={22} />
            <span>Team Blogs</span>
          </Link>
        </li>
        <li>
          <Link to="/drafts" className="flex items-center gap-4 text-gray-700 hover:text-[#543EE0] transition-all duration-200">
            <Edit size={22} />
            <span>Drafts</span>
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="flex items-center gap-4 text-gray-700 hover:text-[#543EE0] transition-all duration-200">
            <BarChart size={22} />
            <span>Analytics</span>
          </Link>
        </li>
      </ul>

      {/* Log Out Button */}
      <button
        type="button"
        onClick={handleSignOut}
        className="mt-8 w-full py-3 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200"
      >
        Log Out
      </button>
    </nav>
  );
};
