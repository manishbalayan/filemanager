import { useState,useEffect } from 'react';
import './App.css';
import { createFile,createFolder,getFiles,deleteFile,deleteFolder,moveItem } from './api/api.js';

function App() {
  const[currentPath,setPath]=useState('')
  const[files,setFiles]=useState([])
  const [activeMenu, setActiveMenu] = useState(null)
  const [copy, setCopy] = useState(null)
  useEffect(()=>{
    getFiles(currentPath)
    .then((data)=>{
      if(currentPath!==''){
        data.unshift({name:'..',isDirectory:true})
      }
      setFiles(data)
    }).catch((err)=>{
      if(err){
        console.log(err)
      }
    })
  },[currentPath])
  function handleNav(file){
    if(file.isDirectory){
      if(file.name=='..'){
        const previousPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
        setPath(previousPath)
      }else{
        const newPath = `${currentPath}/${file.name}`
        setPath(newPath)
      }
    }else{
      const fileUrl = `http://localhost:3004/file?path=${currentPath}/${file.name}`
      window.open(fileUrl, '_blank')
    }
  }
  function handleCreatedir(){
    let folderName = prompt("Enter folder name:")
    if(!folderName){
      folderName = `Untitled_Folder${Math.floor(Math.random() * 1000)}`
    }
    const fullPathCreatedir = currentPath === '' ? folderName : `${currentPath}/${folderName}`
    createFolder(fullPathCreatedir)
    .then(()=>{
      getFiles(currentPath).then((data)=>{
        if(currentPath!==''){
          data.unshift({name:'..',isDirectory:true})
        }
        setFiles(data)
      })
    }).catch((err)=>(console.log(err)))

  }
  function handleCreateFile(){
    const fileName = prompt("Enter file name :")
    if(!fileName)return
    const fullPathCreatefile=currentPath === '' ? fileName : `${currentPath}/${fileName}`
    createFile(fullPathCreatefile)
    .then(()=>{
      getFiles(currentPath).then((data)=>{
        if(currentPath!==''){
          data.unshift({name:'..',isDirectory:true})
        }
        setFiles(data)
      })
    }).catch((err)=>(console.log(err)))
  }
  function handleDelete(file){
    const fullPath = currentPath === '' ? file.name : `${currentPath}/${file.name}`
    const wannaDelete = window.confirm(`Are you sure you want to delete ${file.name}?`)
    if(!wannaDelete)return;
    const apiCall = file.isDirectory ? deleteFolder(fullPath) : deleteFile(fullPath)
    apiCall.then(()=>{
      console.log('deleted')
      setActiveMenu(null)
      getFiles(currentPath).then((data)=>{
        if(currentPath !== '') data.unshift({name:'..',isDirectory:true})
          setFiles(data)
      })
    }).catch((err)=>{
      console.log(err)
      alert('not deleted')
    })
  }
  function handleCut(file){
    const fullPath = currentPath === '' ? file.name : `${currentPath}/${file.name}`
    setCopy({path:fullPath,name:file.name})
    setActiveMenu(null)
  }
  function handlePaste(){
    if (!copy) return;
    const destination = currentPath === '' ? copy.name : `${currentPath}/${copy.name}`
    moveItem(copy.path, destination)
    .then(()=>{
      setCopy(null)
      getFiles(currentPath).then((data)=>{
        if(currentPath !== '') data.unshift({name:'..',isDirectory:true});
        setFiles(data)
      }).catch((err)=>{
        console.log(err)
        alert('did not moved')
      })
    })

  }

  return (
    <div>
      <h1>File Manager</h1>
      <h3>Path: {currentPath || 'User'}</h3>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleCreatedir}>+ New Folder</button>
        <button onClick={handleCreateFile}>+ New File</button>
        {copy && (<button  onClick={handlePaste}  style={{ background: 'brown', marginLeft:'10px'}}>Paste "{copy.name}" Here</button>)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> 
        {files.map((file)=>(
          <div 
            key={file.name}
            style={{ position: 'relative', width: '100px', textAlign: 'center' }} >
            <div onClick={() => handleNav(file)}>
              <div style={{ fontSize: '40px' }}>{file.isDirectory ? '📂' : '📄'}</div>
              <div>{file.name}</div>
            </div>
            {file.name !== '..' && (
              <div 
                onClick={(e) => {
                  e.stopPropagation() 
                  setActiveMenu(activeMenu === file.name ? null : file.name)
                }}
                style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', fontWeight: 'bold' }}
              >
                ⋮
              </div>
            )}
            {activeMenu === file.name && (
              <div style={{ position: 'absolute', top: '20px', right: 0, zIndex: 10 }}>
                <button onClick={(e) => {
                  e.stopPropagation()
                  handleCut(file)
                }}>Cut</button>
                <button onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(file)
                }}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
