import { db, auth } from '../../firebase/Firebase'
import { getDocs, collection, DocumentData, query, orderBy } from 'firebase/firestore'
import { useEffect, useState } from 'react'



export const ForYou = () => {
  const [blogs, setBlogs] = useState<string[]|null>(null)
  const [userID2, setUserID2] = useState<string[]>([])
  // const [{profilePic}] = useOutletContext()


  useEffect(() => {
     const documents: string[] = []
  const IDs: string[] = []
    async function getBlogs() {
      if (auth.currentUser) {
        const UserID = auth.currentUser.uid
        const querySnapshot = await getDocs(query(collection(db, UserID), orderBy('timeStamp', 'desc')))
        return querySnapshot
      }
    }

    getBlogs()
      .then((querySnapshot) => {
       
        querySnapshot?.forEach((doc) => {
          const document: DocumentData = doc.data()
          if (typeof document.blogPost === 'string') {
            documents.push(document.blogPost);
          } else {
            console.error('Invalid blogPost data:', document.blogPost);
          }
          IDs.push(doc.id)
        })
        return {documents,IDs}
        
      }).then(({documents,IDs}) => {
        setBlogs(documents)
        setUserID2(IDs)
      })
      .catch(() => console.log('error result'))
  }, [])

  return (
    <section>
      {
      blogs === null ?<h1 className=''>Loading...</h1> : blogs.map((blog, index) => {
        return (<>
          <img src={''} alt="" />
          <div className='border min-h-[10rem] p-4' key={userID2[index]}>{blog}</div>
        </>)
        })   
      }
    </section>
  )
}
