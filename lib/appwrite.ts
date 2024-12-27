import { Client, Account, ID, Avatars,  Databases, Query, Storage} from 'react-native-appwrite';


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
const storage = new Storage(client);
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

        // const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.dbId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAcct.$id,
                email: email,
                username: username,
                // avatar: avatarUrl,
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


export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error: any) {
      throw new Error(error);
    }
  }


export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.dbId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
}


//sign out
export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  // Upload File
  export async function uploadFile(file: any, type: any) {
    if (!file) return;
  
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId: any, type: any) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          appwriteConfig.storageId,
          fileId,
          2000,
          2000,
          // "top",
          // 100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error: any) {
      throw new Error(error);
    }
  }


// Create Video Post
export async function createVideoPost(form: any) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        appwriteConfig.dbId,
        appwriteConfig.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  // Get all video Posts
  export async function getAllPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.dbId,
        appwriteConfig.videoCollectionId
      );
  
      return posts.documents;
    } catch (error: any) {
      throw new Error(error);
    }
  }


// Get video posts created by user
export async function getUserPosts(userId: string) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.dbId,
        appwriteConfig.videoCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  // Get video posts that matches search query
  export async function searchPosts(query: any) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.dbId,
        appwriteConfig.videoCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  // Get latest created video posts
  export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.dbId,
        appwriteConfig.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error: any) {
      throw new Error(error);
    }
  }
