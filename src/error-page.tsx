import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  interface Error {
    status: number
    internal: boolean
    data: string
    statusText: string
    error: { message: string; stack: string }
  }

  const error: Error = useRouteError()
  console.error(error)

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.error.message}</i>
      </p>
    </div>
  )
}
