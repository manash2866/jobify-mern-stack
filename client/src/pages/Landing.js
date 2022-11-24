
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'
import {Logo} from '../components'
import {Link, Navigate} from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import React from 'react';


const Landing = () => {
  const {user} = useAppContext()
  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>job <span>traking</span> app</h1>
          <p>
          I'm baby man bun deep v same yes plz, gochujang green juice hexagon fanny pack pork belly. Man braid shabby chic tousled, pork belly hell of pinterest migas seitan plaid. Wayfarers VHS stumptown health goth occupy cardigan.
          </p>
          <Link to='/register' className='btn btn-hero'>Login/Register</Link>
        </div>

        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
    </React.Fragment>
  )
}


export default Landing