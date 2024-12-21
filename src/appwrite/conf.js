import config from "../conf/config"
import { Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost ({title,slug,content,featuredImage,status},userId) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            );
        } catch (error) {
            console.log("Appwrite :: createPost  :: error :: ",error)
        }
    }

    async updatePost (slug,{title,content,featuredImage,status,userId}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            );
        } catch (error) {
            console.log("Appwrite :: updatePost  :: error :: ",error)
        }
    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
                slug
            );
            return true
        } catch (error) {
            console.log("Appwrite :: deletePost  :: error :: ",error)
            return false
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite :: getPost  :: error :: ",error)
            return null
        }
    }

    async getPosts (queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatbaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite :: getPosts  :: error :: ",error)
            return null
        }
    }

    //File Upload
    async uploadFile (file) {
        try {
             return await this.storage.createFile(
                config.appwriteBuckectId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite :: uploadFile  :: error :: ",error)
        }
    }

    async deleteFile (fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBuckectId,
                fileId
            );
            return true
        } catch (error) {
            console.log("Appwrite :: deleteFile  :: error :: ",error)
            return false
        }
    }

    getFilePreview (fileId)
    {
        return this.storage.getFilePreview(
            config.appwriteBuckectId,
            fileId
        );
    }


}

const service = new Service()

export default service