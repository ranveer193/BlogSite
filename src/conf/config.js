const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatbaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBuckectId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    tinymceapikey : String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default config