import { useRouteError } from 'react-router-dom'

interface Error {
  status: number
  internal: boolean
  data: string
  statusText: string
  error: { message: string; stack: string }
}

export default function ErrorPage() {
  const error: Error | undefined = useRouteError() as Error
  console.error(error)

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || (error?.error && error.error.message)}</i>
      </p>
    </div>
  )
}
