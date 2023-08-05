import arrowCircleLeft from '../../assets/images/sign-up&in form/arrow-circle-left.svg'
import { SubmitHandler, useForm } from 'react-hook-form'

export const ConfirmationPage = () => {
  interface Inputs {
    one: number
    two: number
    three: number
    four: number
  }

  const { register, handleSubmit } = useForm<Inputs>()

  const formData: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }
  return (
    <>
      <p>
        <img src={arrowCircleLeft} alt='arrow-circle-left' />
        Back
      </p>
      <h1>Enter confirmation code</h1>
      <p>
        We emailed you a code. Please input the code here for account
        verification
      </p>
      <form action='GET' onSubmit={handleSubmit(formData)}>
        <input type='number' {...register('one', { required: true, max: 1 })} />
        <input type='number' {...register('two', { required: true, max: 1 })} />
        <input
          type='number'
          {...register('three', { required: true, max: 1 })}
        />
        <input
          type='number'
          {...register('four', { required: true, max: 1 })}
        />
        <button type='submit'>Create account</button>
      </form>
    </>
  )
}
