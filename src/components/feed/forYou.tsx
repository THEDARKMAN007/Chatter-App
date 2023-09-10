import { db, auth } from '../../firebase/Firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'


export const ForYou = () => {
  const [blogs, setBlogs] = useState<object[]>([])
  const [userID, setUserID] = useState<string[]>([])

  useEffect(() => {
    async function getBlogs() {
      if (auth.currentUser) {
        const UserID = auth.currentUser.uid
        const querySnapshot = await getDocs(collection(db, UserID))
        return querySnapshot
      }
    }

    const documents: object[] = []
    const ID: string[] = []

    getBlogs()
      .then((querySnapshot) => {
        querySnapshot?.forEach((doc) => {
          documents.push(doc.data())
          ID.push(doc.id)
          setBlogs(documents)
          setUserID(ID)
        })
      })
      .catch(() => console.log('error result'))
  }, [])

  return (
    <section>
      {blogs.map((blog) => {
        return userID.map((id)=>{
        return (<div className='border' key={id}>{blog.blogPost}</div>)
        })
      })}
    </section>
  )
}
