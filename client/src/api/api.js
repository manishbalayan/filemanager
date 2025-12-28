import axios from 'axios';
const URL = 'http://localhost:3004';
export function getFiles(path=''){
    return axios.get(`${URL}/files`,{
        params:{path:path}
    })
    .then((response)=>{
        return response.data.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}
export function createFolder(folderPath){
    return axios.post(`${URL}/createdir`,{
        data: folderPath
    })
}
export function createFile(filePath){
    return axios.post(`${URL}/createfile`,{
        data: filePath
    })
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}
export function deleteFile(path) {
    return axios.delete(`${URL}/deletefile`, {
        data: { src: path } 
    });
}
export function deleteFolder(path) {
    return axios.delete(`${URL}/deletedir`, {
        data: { src: path }
    });
}
export function moveItem(sourcePath, destinationPath) {
    return axios.put(`${URL}/move`, {
        src: sourcePath,
        dest: destinationPath
    });
}