import { Outlet, Link, useLocation } from 'react-router-dom';
import { NavMenu } from '../components/nav&search/navigation-menu';
import { SearchBar } from '../components/nav&search/search-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, query, orderBy, DocumentData } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';
import { useEffect, useState } from 'react';
import userProfileImg from '../assets/images/nav&search/userProfileImg.png';
import showdown from 'showdown';

// Define Blog Type
interface Blog {
  id: string;
  content: string;
  timestamp: number;
}

// Define Blog Data Type
interface BlogData extends DocumentData {
  blogPost: string;
  timeStamp: { toDate: () => Date };
}

export const Feed = () => {
  const [profilePic, setProfilePic] = useState(userProfileImg);
  const [userID, setUserID] = useState<string | null>(null);
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setProfilePic(user?.photoURL || userProfileImg);
      setUserID(user?.uid || null);
      setUserName(user?.displayName || '');
      setImage(user?.photoURL || null);
    });

    const fetchBlogs = async () => {
      if (!auth.currentUser) return;
      const userCollection = collection(db, auth.currentUser.uid);
      const querySnapshot = await getDocs(query(userCollection, orderBy('timeStamp', 'desc')));
      const blogPosts: Blog[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as BlogData;
        if (typeof data.blogPost === 'string') {
          blogPosts.push({
            id: doc.id,
            content: new showdown.Converter().makeHtml(data.blogPost),
            timestamp: data.timeStamp.toDate().getTime(),
          });
        }
      });

      setBlogs(blogPosts);
    };

    fetchBlogs().catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:block w-1/4 bg-white shadow-lg p-5">
        <NavMenu />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <SearchBar profilePic={profilePic} search={search} onSearchChange={setSearch} />

        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Feed</h1>
            <Link to='/post'>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">Post Content</button>
            </Link>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex justify-between mt-6 border-b pb-2">
            {['/feed', '/feed/featured', '/feed/recent'].map((path, index) => (
              <Link key={index} to={path} className="relative px-4 py-2 text-gray-600 hover:text-indigo-600">
                <h2 className="font-medium capitalize">{path.split('/')[2] || 'For You'}</h2>
                {location.pathname === path && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600" />}
              </Link>
            ))}
          </nav>

          {/* Blog Feed */}
          <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md p-4 transition transform hover:-translate-y-1 hover:shadow-lg">
                <div className="text-gray-700 text-sm mb-2">By {userName || 'Anonymous'}</div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-800" />
                <div className="text-gray-500 text-xs mt-4">{new Date(blog.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Content Outlet */}
          <div className="mt-6">
            <Outlet context={{ profilePic, blogs, userName, image }} />
          </div>
        </div>
      </div>
    </div>
  );
};
