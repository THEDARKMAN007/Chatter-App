import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../firebase/Firebase';

export const ForYou = () => {
  const [blogs, setBlogs] = useState<string[]>([]);
  const [userID2, setUserID2] = useState<string[]>([]);
  const [userName, setUserName] = useState<string | null | undefined>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [blogsPerPage] = useState<number>(6); // Number of blogs per page

  useEffect(() => {
    async function fetchBlogs() {
      const user = auth.currentUser;
      if (!user) {
        setError("User not signed in.");
        setLoading(false);
        return;
      }

      try {
        const collectionRef = collection(db, user.uid); // Fetch from the user's collection
        const querySnapshot = await getDocs(collectionRef);
        const fetchedBlogs: string[] = [];
        const fetchedUserID2: string[] = [];

        querySnapshot.forEach((doc) => {
          fetchedBlogs.push(doc.data().blogPost as string);
          fetchedUserID2.push(doc.data().userId as string);
        });

        setBlogs(fetchedBlogs);
        setUserID2(fetchedUserID2);
        setUserName(user.displayName || "Anonymous");
        setImage(user.photoURL || undefined);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("There was an error fetching your blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic: Determine which blogs to display based on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle next and previous page clicks
  const handleNextPage = () => {
    if (currentPage < Math.ceil(blogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-lg text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      {blogs.length === 0 ? (
        <h1 className="text-center text-xl font-semibold text-gray-600">No blogs available</h1>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto"
          style={{ maxHeight: "70vh" }} // Restrict the height to 70% of the screen
        >
          {currentBlogs.map((blog, index) => (
            <div
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              key={userID2[index]}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={image || "defaultProfilePicUrl"}
                  alt="User"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <span className="text-lg font-semibold text-gray-800">{userName || "Anonymous"}</span>
                  <p className="text-sm text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: blog }}
                className="text-gray-700 text-sm space-y-4"
              />

              <div className="mt-4 text-right">
                <button
                  className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-full hover:bg-blue-500 transition-all duration-200"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-gray-300 text-sm py-2 px-4 rounded-full hover:bg-gray-400 transition-all"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 text-sm py-2 px-4 rounded-full hover:bg-gray-400 transition-all"
          disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
        >
          Next
        </button>
      </div>
    </section>
  );
};
