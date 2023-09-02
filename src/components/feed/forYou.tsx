import { db, auth } from '../../firebase/Firebase'
import { useEffect, useState } from 'react'
import {collection, query, getDocs } from 'firebase/firestore'

export const ForYou = () => {
  const [blogs, setBlogs] = useState<string[]>([])

  async function getBlogs() {
    const q = query(collection(db, "cities"))
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

  } 

  useEffect(() => {
    getBlogs().catch(()=>alert('error'))
  },[])

  return (
    <>
      <section>{blogs.map((blog) => {
        return (
          <div>
            {blog}
          </div>
        )
      })}</section>
    </>
  )
}
