import { useEffect, useState } from "react"
import {Logo,FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from "../context/appContext"
import {useNavigate} from 'react-router-dom'

const initailState = {
  name:'',
  email:'',
  password:'',
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initailState)
  
  const { user, isLoading, showAlert, displayAlert, setupUser} = useAppContext()


  const toggleMember = () => {
    setValues({...values, isMember:!values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values
    if(!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = {name, email, password}
    if(isMember){
      setupUser({currentUser, endPoint: 'login',
      alertText: 'login successful! redirecting...'
      })
    } else {
      setupUser({currentUser, endPoint: 'register',
      alertText: 'user created! redirecting...'
      })
    }
  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/')
      },3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form action='' className='form' onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember?'Login':'Register'}</h3>
        {showAlert && <Alert/>}
        {/* name input */}
        {!values.isMember && (
        <FormRow type='text' name='name' handleChange={handleChange} value={values.name}
        />
        )}
        <FormRow type='email' name='email' handleChange={handleChange} value={values.email} />
        <FormRow type='password' name='password' handleChange={handleChange} value={values.password} />
        <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
        <button type='button' className='btn btn-block btn-hipster' disabled={isLoading}
          onClick={()=>{
            setupUser({currentUser:{email: 'testuser@gmail.com', password: 'secret'},
            endPoint: 'login',
            alertText: 'login successful! redirecting...'}) 
          }}>
        {isLoading ? 'loading..' : 'test user'} 
        </button>
        <p>{values.isMember ? "not a member" : "already a member?"}
          <button type='button' onClick={toggleMember} className="member-btn">
          {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>

      </form>
    </Wrapper>
  )
}
export default Register