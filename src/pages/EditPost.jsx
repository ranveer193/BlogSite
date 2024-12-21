import React, { useState } from 'react'
import {Container,PostForm} from '../components/index'
import authService from '../appwrite/conf'
import { useParams,useNavigate } from 'react-router-dom'

function EditPost() {
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
            if (slug) {
                authService.getPost(slug)
                .then((response) => {
                    if (response)
                        setPost(response)   
                    else navigate('/')             
                })
            } else {
                navigate('/')
            }
    }, [navigate, slug])

    return post ? (
        <div className='py-8 bg-gray-400'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div> 
    ) : null
}

export default EditPost
