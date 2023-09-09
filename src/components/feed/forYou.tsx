import { db, auth } from '../../firebase/Firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

// interface BlogData {
//   id: string,
//   data: object
// }

export const ForYou = () => {
  const [blogs, setBlogs] = useState<object[]>([])
  // const [userID, setUserID] = useState('')

  useEffect(() => {
    async function getBlogs() {
      if (auth.currentUser) {
        const UserID = auth.currentUser.uid
        const querySnapshot = await getDocs(collection(db, UserID))
        return querySnapshot
      }
    }
    const data: object[] = []
    getBlogs()
      .then((querySnapshot) => {
        querySnapshot?.forEach((doc) => {
          console.log(doc)
          data.push({ID:doc.id,data:doc.data()})
          setBlogs(data)
        })
      })
      .catch(() => console.log('error result'))
  }, [])

  return (
    <section>
      {/* {
        blogs.map((blog) => {
        console.log(blogs)

            return (
      <div className='border'>
              {blog.blogPost}
      </div>
            )
          })
      } */}
      {blogs.map((blog) => {
        return (<div className='border' key={blog.ID}>{blog.data.blogPost}</div>)
      })}
    </section>
  )
}
