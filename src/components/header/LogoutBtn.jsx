import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.error(error)
            alert('Failed to logout')
        })
    }

    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
