import { Client, Account, ID, Avatars,  Databases, } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.tompolo.aora-mobile',
    projectId: '676a7388000647082bd7',
    dbId: '676a7a84001afa2cb964',
    userCollectionId: '676a7add002f0094fa2b',
    videoCollectionId: '676a82fa003a3d199bfd',
    storageId: '676a85da00005ae89228'
}



const client = new Client();


client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


const account = new Account(client);
const storage = new Storage();
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser (email: string, password: string, username: string) {
    try {
        const newAcct = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAcct.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )

        return newUser;
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }

}


export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}
