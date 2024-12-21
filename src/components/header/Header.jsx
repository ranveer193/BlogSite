import React from 'react'
import {Logo,LogoutBtn,Container} from '../index'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Header() {

    const authStatus = useSelector((state) => state.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name:'Home',
            route:'/',
            active:true
        },
        {
            name:'Login',
            route:'/login',
            active:!authStatus
        },
        {
            name:'Signup',
            route:'/signup',
            active:!authStatus
        },
        {
            name:'Add Post',
            route:'/add-post',
            active:authStatus,
        },
        {
            name:'All Posts',
            route:'/all-posts',
            active:authStatus
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-400'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />
              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.route)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
                <li>
                    <LogoutBtn/>
                </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
    )
}

export default Header
