import React from 'react'
import appwriteService from '../appwrite/conf'
import {Container,Postcard} from '../components/index'

function Home() {
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        appwriteService.getPosts()
        .then((posts) => {
            if (posts)
                setPosts(posts.documents)
        })
        .catch((err) => console.log(err))
    }
    ,[])

    if (posts.length === 0) {
        return (
            <Container>
                <h1>Please Login First!</h1>
            </Container>
        )
    }

    return (
        <div className=' w-full py-8 bg-gray-400'>
        <Container>
            <div className='flex flex-wrap bg-gray-400'>
            {posts.map((post) => (
                <div key = {post.$id} className='p-2 w-1/4'>
                    <Postcard {...post}/>
                </div>
            ))}
            </div>
        </Container>
    </div> )
}

export default Home
