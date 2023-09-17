import { useOutletContext } from "react-router-dom"



interface dat {
  userID2:string[],
  blogs: string[],
  userName:string|null|undefined,
  image:string|undefined
}
export const ForYou = () => {

  const {userID2, blogs, userName, image} = useOutletContext<dat>()

  return (
    <section>
      {
      blogs === null ?<h1 className=''>Loading...</h1> : blogs.map((blog, index) => {
        return (<>
          <div className='border min-h-[5rem] p-4' key={userID2[index]}>
            <span><img src={image} alt="" width={"105px"} height={"102px"} className="rounded-full "/>{userName}</span>
            
            <div dangerouslySetInnerHTML={{ __html: blog }} />
          </div>
        </>)
        })   
      }
    </section>
  )
}
