import { Client, Account, ID } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.tompolo.aora-mobile',
    projectId: 'com.tompolo.aora-mobile',
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

export const createUser = () => {
    account.create(ID.unique(), 'ifeanyi', 'omejua', '')
}