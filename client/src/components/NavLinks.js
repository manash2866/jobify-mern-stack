import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({toggleSidebar}) => {
  return (
    <div className='nav-links'>
    {links.map((link)=>{
      const {id, path, icon, text} = link
      return <NavLink key={id} to={path} onClick={toggleSidebar} end className={
        ({isActive})=> isActive ? 'nav-link active' : 'nav-link'
      }>
        <span className='icon'>{icon}</span>
        {text}
      </NavLink>
    })}
  </div>
  )
}
export default NavLinks