import React from 'react'
import { PostForm,Container } from '../components/index'

function AddPost() {
    return (
        <div className='py-8  bg-gray-400'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
