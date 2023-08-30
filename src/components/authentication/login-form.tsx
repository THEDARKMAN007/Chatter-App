// import openedEyeIcon from '../../assets/images/authentication/open-eye-icon-sign-up-screen.svg'
import googleLogoButton from '../../assets/images/authentication/google-logo-sign-up-page.svg'
import twitterLogoButton from '../../assets/images/authentication/twitter.png'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  AuthError,
} from 'firebase/auth'
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
        console.log('your email or password is incorrect')
      })
  }

  //implementing twitter provider sign-up
  const twitterSignIn = () => {
    const provider = new TwitterAuthProvider()
    auth.languageCode = 'it'
    provider.setCustomParameters({
      display: 'popup',
    })
    provider.setCustomParameters({
      lang: 'en',
    })
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const credential = TwitterAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const secret = credential?.secret
        const user = result.user
        console.log(token, secret, user)
      })
      .catch((error: AuthError) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = TwitterAuthProvider.credentialFromError(error)
        console.log(errorCode, errorMessage, email, credential)
      })
  }
  //implementing google sign-in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.languageCode = 'it'
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        console.log({ token: token, user: user })
      })
      .catch((error: AuthError) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log({
          errorCode: errorCode,
          errorMessage: errorMessage,
          email: email,
          credential: credential,
        })
      })
  }

  return (
    <div className='mx-auto w-[70%] justify-center sm:w-[63.5%]'>
      <header>
        <nav className='text-[0.8rem] flex flex-row items-center justify-evenly sm:justify-between sm:w-[84.6%] sm:text-[min(1.11vw,1rem)] font-[700] leading-[1.5em] sm:pb-[0.75em] mx-auto'>
          <Link to='/sign-up' replace>
            <h3>REGISTER</h3>
          </Link>
          <Link to='/sign-up/login' replace>
            <h3>LOG IN</h3>
          </Link>
        </nav>
        <div className='sm:w-[84.6%] flex flex-row mx-auto rounded-[8px]'>
          <div className='bg-[#D9D9D9] w-[50%] h-[6px] rounded-[8px]'></div>
          <div className='bg-[#543EE0] w-[50%] h-[6px] rounded-[8px]'></div>
        </div>
      </header>
      <h1 className='text-[1rem] sm:text-[min(2.22vw,2rem)] text-[#111] text-center leading-[1.5em] font-[500] py-[0.75em]'>
        Welcome back
      </h1>
      <form
        onSubmit={handleSubmit(formData)}
        className='flex flex-col items-center gap-[10px]'
      >
        <div className='w-[100%] flex flex-col'>
          <label
            htmlFor='email address'
            className='text-[1rem] sm:text-[min(1vw,14px)] font-[400] leading-[1.5em]'
          >
            Email address
          </label>
          <input
            type='email'
            id='email address'
            {...register('email', { required: 'email is required' })}
            aria-invalid={errors.email ? 'true' : 'false'}
            className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[0.5em] py-[0.1em] sm:px-[1em] sm:py-[0.625em] sm:mt-[0.75em] rounded-[0.5em]'
          />
          {errors.email && <p role='alert'>{errors.email?.message}</p>}
        </div>

        <div className='w-[100%] flex flex-col'>
          <label
            htmlFor='password'
            className='text-[1rem] sm:text-[min(1vw,14px)] font-[400] leading-[1.5em]'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            {...register('password', { required: 'password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
            className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[0.5em] py-[0.1em] sm:px-[1em] sm:py-[0.625em] sm:mt-[0.75em] rounded-[0.5em]'
          />
          {errors.password && <p role='alert'>{errors.password?.message}</p>}
          {/* <img src={openedEyeIcon} alt='open eye icon' /> */}
          {errors.password && <p role='alert'>{errors.password?.message}</p>}
        </div>
        <button
          type='submit'
          className='text-[1rem] border bg-blue-800 w-[100%] sm:text-[min(1vw,16px)] font-[700] leading-[1.5em] px-[1em] py-[0.625em] rounded-[0.5em] text-[#FFF]'
        >
          sign in
        </button>
      </form>
      {/* alternative sign-in */}
      <button
        type='button'
        className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[1em] py-[0.625em] mt-[0.75em] rounded-[0.5em] flex flex-row items-center justify-center'
        onClick={googleSignIn}
      >
        <img src={googleLogoButton} alt='google logo' /> Sign in with google
      </button>
      <button
        type='button'
        className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[1em] py-[0.625em] mt-[0.75em] rounded-[0.5em] flex flex-row items-center justify-center'
        onClick={twitterSignIn}
      >
        {' '}
        <img
          src={twitterLogoButton}
          alt='facebook logo'
          width={'25px'}
          height={'25px'}
        />{' '}
        Sign in with Facebook
      </button>
    </div>
  )
}
