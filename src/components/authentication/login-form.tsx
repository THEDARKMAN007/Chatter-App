import openedEyeIcon from '../../assets/images/authentication/open-eye-icon-sign-up-screen.svg'
import googleLogoButton from '../../assets/images/authentication/google-logo-sign-up-page.svg'
import linkedinLogoButton from '../../assets/images/authentication/linkedin-logo-sign-up-page.svg'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/Firebase'
import { useNavigate } from 'react-router-dom'

export const FormLogIn = () => {
  interface Inputs {
    email: string
    password: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()

  const formData: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
      })
      .then(() => {
        navigate('/sign-up/confirmation-page', { replace: true })
      })
      .catch((error: { code: string; message: string }) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        alert('your email or password is incorrect')
      })
  }

  return (
    <>
      <header>
        <nav>
          <Link to='/sign-up' replace>
            <h1>REGISTER</h1>
          </Link>
          <Link to='/sign-up/login' replace>
            <h1>LOG IN</h1>
          </Link>
        </nav>
        <h1>Welcome back</h1>
      </header>
      <form onSubmit={handleSubmit(formData)}>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            {...register('email', { required: 'email is required' })}
            aria-invalid={errors.email ? 'true' : 'false'}
            className='border'
          />
          {errors.email && <p role='alert'>{errors.email?.message}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            {...register('password', { required: 'password is required' })}
            className='border'
          />
          <img src={openedEyeIcon} alt='open eye icon' />
          {errors.password && <p role='alert'>{errors.password?.message}</p>}
        </div>
        <button type='submit' className='border'>
          sign in
        </button>
      </form>
      {/* alternative sign-in */}
      <button type='button' className='border'>
        <img src={googleLogoButton} alt='google logo' /> Sign in with google
      </button>
      <button type='button' className='border'>
        {' '}
        <img src={linkedinLogoButton} alt='linkedIn logo' /> Sign in with
        Linkedin
      </button>
    </>
  )
}
