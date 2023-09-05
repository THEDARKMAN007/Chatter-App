import { db,auth } from '../../firebase/Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect } from 'react';


export const ForYou = () => {
// const [blogs, setBlogs] = useState()
  async function getBlogs() {
    const user = auth.currentUser
    if(user !== null)
    {
      const collectionID = user.uid
      console.log(collectionID)
      const querySnapshot = await getDocs(collection(db, collectionID))
      console.log(querySnapshot)
      return querySnapshot 
    }

    }


  useEffect(() => {
    getBlogs().then((querySnapshot) => {
     querySnapshot?.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
     })
   }).catch(()=>console.log('error'))
  },[])
  

  return (
    <>
      <section>
        blogs
      </section>
    </>
  )
}
