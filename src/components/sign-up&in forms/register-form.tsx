// icons
import openedEyeIcon from '../../assets/images/sign-up&in form/open-eye-icon-sign-up-screen.svg'
import closedEyeIcon from '../../assets/images/sign-up&in form/closed-eye-icon-sign-up-screen.svg'
import googleLogoButton from '../../assets/images/sign-up&in form/google-logo-sign-up-page.svg'
import linkedinLogoButton from '../../assets/images/sign-up&in form/linkedin-logo-sign-up-page.svg'

//navigation
import { Link, useNavigate } from 'react-router-dom'

//form validation
import { useForm, SubmitHandler } from 'react-hook-form'

//firebase auth
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  AuthError,
  UserCredential,
} from 'firebase/auth'
import { auth } from '../../firebase/Firebase'

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
  //implementing facebook provider sign-up {facebook enforces https}
  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope('user_birthday');
    auth.languageCode = 'it';
    provider.setCustomParameters({
  'display': 'popup'
});
    signInWithPopup(auth, provider)
  .then((result: UserCredential) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log({user:user,accessToken:accessToken})
  })
  .catch((error: AuthError) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
    console.log({errorCode:errorCode,errorMessage:errorMessage,email:email,credential:credential})
  });


  }
  //implementing google provider signup
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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
    console.log(data)
    if (data.password === data.confirmPassword) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log(user)
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
        <h1>Register as a Writer/Reader</h1>
      </header>
      <form action='POST' onSubmit={handleSubmit(formData)}>
        <div>
          <label htmlFor='First name'>First name</label>
          <input
            type='text'
            id='First name'
            {...register('firstName', { required: 'first name is required' })}
            aria-invalid={errors.firstName ? 'true' : 'false'}
            className='border'
          />
          {errors.firstName && <p role='alert'>{errors.firstName?.message}</p>}
          <label htmlFor='Last name'>Last name</label>
          <input
            type='text'
            id='Last name'
            {...register('lastName', { required: 'last name is required' })}
            aria-invalid={errors.lastName ? 'true' : 'false'}
            className='border'
          />
          {errors.lastName && <p role='alert'>{errors.lastName?.message}</p>}
        </div>
        <div>
          <label htmlFor='role'>You are joining as?</label>
          <select
            id='role'
            {...register('role', { required: 'role is required' })}
            aria-invalid={errors.role ? 'true' : 'false'}
            className='border'
          >
            You are joining as?
            <option value='writer'>writer</option>
            <option value='reader'>reader</option>
            <option value='writer and reader'>writer and reader</option>
          </select>
          {errors.role && <p role='alert'>{errors.role?.message}</p>}
        </div>
        <div>
          <label htmlFor='email address'>Email address</label>
          <input
            type='email'
            id='email address'
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
            aria-invalid={errors.password ? 'true' : 'false'}
            className='border'
          />
          <img src={openedEyeIcon} alt='open eye icon' />
          {errors.password && <p role='alert'>{errors.password?.message}</p>}
        </div>
        <div>
          <label htmlFor='Confirm password'>Confirm password</label>
          <input
            type='password'
            id='Confirm password'
            {...register('confirmPassword', {
              required: 'confirm your password',
            })}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            className='border'
          />
          <img src={closedEyeIcon} alt='closed eye icon' />
          {errors.confirmPassword && (
            <p role='alert'>{errors.confirmPassword?.message}</p>
          )}
        </div>
        <button type='submit' className='border bg-blue-800'>
          Create account
        </button>
      </form>
      {/* alternative sign-in */}
      <button type='button' className='border' onClick={googleSignIn}>
        <img src={googleLogoButton} alt='google logo' /> Sign up with google
      </button>
      <button type='button' className='border' onClick={facebookSignIn}>
        {' '}
        <img src={linkedinLogoButton} alt='linkedIn logo' /> Sign up with
        Linkedin
      </button>
    </>
  )
}
