import React, { useEffect, useState } from 'react'
import authService from '../appwrite/conf'
import { Postcard,Container } from '../components/index'

function AllPosts() {
    const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState([])

    useEffect(() => {
        authService.getPosts()
        .then((posts) => {
            if (posts)
                setPosts(posts.documents)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
    ,[])

    if (!loading)
        return posts && posts.length > 0 ? (
            <div className=' w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key = {post.$id} className='p-2 w-1/4'>
                        <Postcard {...post}/>
                    </div>
                ))}
                </div>
            </Container>
        </div> ) : null
}

export default AllPosts
