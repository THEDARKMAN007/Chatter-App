import { auth } from '../../firebase/Firebase'

auth
export const ForYou = () => {
  console.log(auth.currentUser)
  return (
    <>
      <section>for you</section>
    </>
  )
}
