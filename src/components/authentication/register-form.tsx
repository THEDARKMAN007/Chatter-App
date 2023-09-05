// icons
// import openedEyeIcon from '../../assets/images/authentication/open-eye-icon-sign-up-screen.svg'
// import closedEyeIcon from '../../assets/images/authentication/closed-eye-icon-sign-up-screen.svg'
import googleLogoButton from '../../assets/images/authentication/google-logo-sign-up-page.svg'
import twitterLogoButton from '../../assets/images/authentication/twitter.png'

//navigation
import { Link, useNavigate } from 'react-router-dom'

//form validation
import { useForm, SubmitHandler } from 'react-hook-form'

//firebase auth
import { auth } from '../../firebase/Firebase'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  AuthError,
  UserCredential,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'

export const FormRegister = () => {
  ////TYPE
  enum RoleEnum {
    writer = 'writer',
    reader = 'reader',
    writerAndReader = 'writer and reader',
  }
  interface Inputs {
    firstName: string
    lastName: string
    role: RoleEnum
    email: string
    password: string
    confirmPassword: string
  }

  //implementing react-hook-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()

  //AUTHENTICATION METHODS
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
  //implementing google provider signup
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.languageCode = 'it'
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log({ token: token, user: user })
      })
      .catch((error: AuthError) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        console.log({
          errorCode: errorCode,
          errorMessage: errorMessage,
          email: email,
          credential: credential,
        })
      })
  }
  //implementing email&password sign-up
  const formData: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.confirmPassword) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in successful
          const user1 = userCredential.user
          console.log(user1)

          // setting user basic info
          onAuthStateChanged(auth, (user) => {
            if (user) {
              updateProfile(user, {
                displayName: `${(data.firstName, data.lastName)}`,
              }).catch((error) => {
                  console.log(error)
                })
            }
          })
        })
        .then(() => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              auth.languageCode = 'it'
              sendEmailVerification(user)
                .then(() => {
                  alert('check your email to verify your account')
                })
                .catch((error) => {
                  console.log(error)
                })
            }
          })
        })
        .then(() => {
          navigate('/sign-up/confirmation-page', { replace: true })
        })
        .catch((error: { code: string; message: string }) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    } else {
      alert('your passwords do not match')
    }
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
          <div className='bg-[#543EE0] w-[50%] h-[6px] rounded-[8px]'></div>
          <div className='bg-[#D9D9D9] w-[50%] h-[6px] rounded-[8px]'></div>
        </div>
      </header>

      <h1 className='text-[1rem] sm:text-[min(2.22vw,2rem)] text-[#111] text-center leading-[1.5em] font-[500] py-[0.75em]'>
        Register as a Writer/Reader
      </h1>

      <form
        onSubmit={handleSubmit(formData)}
        className='flex flex-col items-center gap-[10px]'
      >
        <div className='flex flex-col sm:flex-row items-center sm:justify-between w-[100%]'>
          <div className='w-[100%] sm:w-[48.46%]'>
            <label
              htmlFor='First name'
              className='text-[1rem] sm:text-[min(1vw,14px)] font-[400] leading-[1.5em]'
            >
              First name
            </label>
            <input
              type='text'
              id='First name'
              {...register('firstName', { required: 'first name is required' })}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[0.5em] py-[0.1em] sm:px-[1em] sm:py-[0.625em] sm:mt-[0.75em] rounded-[0.5em]'
            />
            {errors.firstName && (
              <p role='alert' className='bg-[red] text-[white] text-center'>
                {errors.firstName?.message}
              </p>
            )}
          </div>
          <div className='w-[100%] sm:w-[48.46%]'>
            <label
              htmlFor='Last name'
              className='text-[1rem] sm:text-[min(1vw,14px)] font-[400] leading-[1.5em]'
            >
              Last name
            </label>
            <input
              type='text'
              id='Last name'
              {...register('lastName', { required: 'last name is required' })}
              aria-invalid={errors.lastName ? 'true' : 'false'}
              className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[0.5em] py-[0.1em] sm:px-[1em] sm:py-[0.625em] sm:mt-[0.75em] rounded-[0.5em]'
            />
            {errors.lastName && <p role='alert'>{errors.lastName?.message}</p>}
          </div>
        </div>

        <div className='w-[100%] flex flex-col'>
          <label
            htmlFor='role'
            className='text-[1rem] sm:text-[min(1vw,14px)] font-[400] leading-[1.5em]'
          >
            You are joining as?
          </label>
          <select
            id='role'
            {...register('role', { required: 'role is required' })}
            aria-invalid={errors.role ? 'true' : 'false'}
            className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[0.5em] py-[0.1em] sm:px-[1em] sm:py-[0.625em] sm:mt-[0.75em] rounded-[0.5em]'
          >
            <option value='writer'>Writer</option>
            <option value='reader'>Reader</option>
            <option value='writer and reader'>Writer & Reader</option>
          </select>
          {errors.role && <p role='alert'>{errors.role?.message}</p>}
        </div>

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
          {/* <img src={openedEyeIcon} alt='open eye icon' /> */}
          {errors.password && <p role='alert'>{errors.password?.message}</p>}
        </div>
        <div className='w-[100%] flex flex-col'>
          <label
            htmlFor='Confirm password'
            className='text-[1rem] sm:text-[min(1vw,14px)] font-[400] leading-[1.5em]'
          >
            Confirm password
          </label>
          <input
            type='password'
            id='Confirm password'
            {...register('confirmPassword', {
              required: 'confirm your password',
            })}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[0.5em] py-[0.1em] sm:px-[1em] sm:py-[0.625em] sm:mt-[0.75em] rounded-[0.5em]'
          />
          {/* <img src={closedEyeIcon} alt='closed eye icon' /> */}
          {errors.confirmPassword && (
            <p role='alert'>{errors.confirmPassword?.message}</p>
          )}
        </div>
        <button
          type='submit'
          className='text-[1rem] border bg-blue-800 w-[100%] sm:text-[min(1vw,16px)] font-[700] leading-[1.5em] px-[1em] py-[0.625em] rounded-[0.5em] text-[#FFF]'
        >
          Create account
        </button>
      </form>
      {/* alternative sign-in */}
      <button
        type='button'
        onClick={googleSignIn}
        className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[1em] py-[0.625em] mt-[0.75em] rounded-[0.5em] flex flex-row items-center justify-center'
      >
        <img src={googleLogoButton} alt='google logo' />
        <div className='ml-[1em]'>Sign up with Google</div>
      </button>
      <button
        type='button'
        onClick={twitterSignIn}
        className='text-[1rem] border border-[#CED4DA] w-[100%] sm:text-[min(1vw,16px)] font-[400] leading-[1.5em] px-[1em] py-[0.625em] mt-[0.75em] rounded-[0.5em] flex flex-row items-center justify-center'
      >
        <img
          src={twitterLogoButton}
          alt='linkedIn logo'
          height={'10px'}
          width={'20px'}
        />
        <div className='ml-[1em]'>Sign up with Twitter</div>
      </button>
    </div>
  )
}
