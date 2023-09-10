import { db, auth } from '../../firebase/Firebase'
import { getDocs, collection, DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'


export const ForYou = () => {
  const [blogs, setBlogs] = useState<string[]>([])
  const [userID, setUserID] = useState<string[]>([])



  useEffect(() => {
    async function getBlogs() {
      if (auth.currentUser) {
        const UserID = auth.currentUser.uid
        const querySnapshot = await getDocs(collection(db, UserID))
        return querySnapshot
      }
    }

    const documents: string[] = []
    const ID: string[] = []

    getBlogs()
      .then((querySnapshot) => {
        querySnapshot?.forEach((doc) => {
          const document: DocumentData = doc.data()
          if (typeof document.blogPost === 'string') {
            documents.push(document.blogPost);
          } else {
            console.error('Invalid blogPost data:', document.blogPost);
          }
          ID.push(doc.id)
        })
        setBlogs(documents)
        setUserID(ID)
      })
      .catch(() => console.log('error result'))
  }, [])

  return (
    <section>
      {blogs.map((blog,index) => {
        return (<div className='border' key={userID[index]}>{blog}</div>)
      })}
    </section>
  )
}
