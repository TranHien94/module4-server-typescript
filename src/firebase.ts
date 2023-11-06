// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCyK-dptj22zSeOZAgpSGu3NmGswExKZQo",
    authDomain: "projectmodule4-5fe93.firebaseapp.com",
    projectId: "projectmodule4-5fe93",
    storageBucket: "projectmodule4-5fe93.appspot.com",
    messagingSenderId: "75341875018",
    appId: "1:75341875018:web:2f046f9bc0629dfa54a3b3",
    measurementId: "G-8RDT0RSFL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFileToStorage(file: any, folderName: any, bufferData: any) {
    //nếu file null thì không làm gì
    if(!file) {
        return false
    }
    let fileRef;
    let metadata;
    if (!bufferData) {
        //tên file trên firebase
        fileRef = ref(storage, `${folderName}/` + file.name)
    } else {
        fileRef = ref(storage, `${folderName}/` + (file as any).fileName)
        metadata = {
            contentType: (file as any).minetype,
        }
    }
    let url;
    if(bufferData) {
        //upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            //khi up thành công thì tìm url
            return await getDownloadURL(res.ref)
                .then(url => {
                    console.log("url", url)
                    return url
                })
                .catch(er => false)
        })
    } else {
        url = await uploadBytes(fileRef, file).then(async res => {
            //khi up thành công thì tìm url
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }
    return url
}
