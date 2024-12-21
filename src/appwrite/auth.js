import config from "../conf/config"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account; 

    constructor (){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount ({email,password,name}) {
        try {
            const userAccount = await this.account
                .create(ID.unique(),email,password,name);
            if (userAccount)
                //call another method
                return this.login({email,password});
            else
                return userAccount
        } catch (error) {
            console.log("Appwrite :: createAccount :: error :: ",error)
        }
    }

    async login ({email,password})
    {
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("Appwrite :: login :: error :: ",error)
        }
    }

    async getCurrentUser () {
        try {
            const account = await this.account.get();
            if (account)
                return account;
            else
                return null;
        } catch (error) {
            console.log("Appwrite :: getCurrentUser :: error :: ",error)
            return null;
        }
    }

    async logout () {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite :: logout :: error :: ",error)
        }
    }
}

const authService = new AuthService()

export default authService