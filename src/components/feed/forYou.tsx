import { useOutletContext } from "react-router-dom"



interface dat {
  userID2:string[],
  blogs:string[]
}
export const ForYou = () => {

  const {userID2, blogs} = useOutletContext<dat>()

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
