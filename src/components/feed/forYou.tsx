import { useOutletContext } from 'react-router-dom'

export const ForYou = () => {
  interface BlogData {
    blogs: string[] | null
    userID2: string[]
  }

  const blogData = useOutletContext<BlogData>()

  return (
    <section>
      {blogData.blogs === null ? (
        <div>Loading...</div>
      ) : (
        blogData.blogs.map((blog, index) => {
          return (
            <div className='border' key={blogData.userID2[index]}>
              {blog}
            </div>
          )
        })
      )}
    </section>
  )
}
