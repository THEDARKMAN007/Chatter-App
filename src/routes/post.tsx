import { useState, useEffect } from 'react';
import { NavMenu } from '../components/nav&search/navigation-menu';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Showdown from 'showdown';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/Firebase';
import { SearchBar } from '../components/nav&search/search-bar';
import { onAuthStateChanged } from 'firebase/auth';
import userProfileImg from '../assets/images/nav&search/userProfileImg.png';

export const BlogPostCreator = () => {
  const [content, setContent] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>(userProfileImg);
  const [userID, setUserID] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>('');

  const converter = new Showdown.Converter();

  const handleContentChange = (value: string) => setContent(value);

  // Converting to markdown and saving to Firestore
  const saveContentInMarkdown = async () => {
    const markdownContent = converter.makeMarkdown(content);
    try {
      await addAndReadDocs(markdownContent);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to save in Firestore
  const addAndReadDocs = async (savedContent: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not signed in.');

      const collectionID = user.uid;
      const userCollectionRef = collection(db, collectionID);
      const newDocRef = await addDoc(userCollectionRef, {
        userId: user.uid,
        name: user.displayName,
        contentType: 'blogPost',
        blogPost: savedContent,
        timeStamp: serverTimestamp(),
        date: new Date(),
      });

      console.log('Document written with ID:', newDocRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  // Auth state listener for user profile and ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfilePic(user.photoURL || userProfileImg);
        setUserID(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  // Word count for the blog post
  const wordCount = content.trim().split(/\s+/).length;

  return (
    <div className="flex flex-row bg-gray-50 min-h-screen">
      <NavMenu />
      <div className="flex flex-col w-full p-8 bg-white shadow-lg rounded-lg">
        <SearchBar profilePic={profilePic} search={search} onSearchChange={setSearch} />

        <div className="mb-4 text-2xl font-semibold text-gray-800">Create a New Blog Post</div>

        <ReactQuill
          value={content}
          onChange={handleContentChange}
          modules={BlogPostCreator.modules}
          formats={BlogPostCreator.formats}
          placeholder="Write your content here..."
          className="mb-4 bg-gray-100 rounded-lg min-h-[80%]"
        />

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">Word Count: {wordCount}</div>

          <button
            onClick={() => {
              saveContentInMarkdown().catch((err) => console.error(err)); // Handle promise rejection
            }}
            className="py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
};

BlogPostCreator.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [
      { header: 1 },
      { header: 2 },
      { header: 3 },
      { header: 4 },
      { header: 5 },
      { header: 6 },
      { header: false },
    ],
    ['video'],
    ['code', { language: 'javascript' }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

BlogPostCreator.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'align',
  'color',
  'background',
  'link',
  'image',
  'clean',
  'script',
  'indent',
  'direction',
  'size',
  'video',
  'code',
];
