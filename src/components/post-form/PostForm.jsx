import React, { useCallback ,useEffect} from 'react'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from '../../appwrite/conf'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'

function PostForm({post}) {
    
    const {register,handleSubmit,control,watch,setValue,getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
            slug: post?.$id || ''
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)

    const Submit = async (data) => {
        if (post)
        {
            // update post
            const file = data.image[0] ? 
            await appwriteService.uploadFile(data.image[0]) : null;
            if(file)
                appwriteService.deleteFile(post.featuredImage)
            const updatedPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : post.featuredImage
            })

            if (updatedPost)
                navigate(`/post/${updatedPost.$id}`)
        }
        else{
            const file = data.image[0] ? 
            await appwriteService.uploadFile(data.image[0]) : null;
            if (file)
            {
                data.featuredImage = file.$id;
                const newPost = await appwriteService.createPost({
                    ...data,
                },userData.$id);
                if (newPost)
                    navigate(`/post/${newPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof(value) === 'string')
            return value
                .trim()              
                .toLowerCase()      
                .replace(/\s+/g, '-')
        else
            return ''
    },[])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title')
            setValue('slug',slugTransform(value.title),
            {shouldValidate: true})
        })
        return () => subscription.unsubscribe()
    }
    ,[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
        
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    onInput={(e) => {
                        setValue("slug",slugTransform(e.target.value), { shouldValidate: true });
                    }
                }
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                />
                
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                
            </div>
            
           <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
        
                <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
          </form>
    )
}

export default PostForm
