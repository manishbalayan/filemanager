const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs');
const {unlink}=require('node:fs/promises')
const { copyFile, constants }=require('node:fs/promises');
const console = require('console');
const app = express()
const currentpath=path.join(__dirname,'/userdata')
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.get('/',(req,res)=>{
    res.send(currentpath)
})
app.use(express.json())
app.post('/createdir',async (req,res)=>{
    foldername=req.body.data
    console.log(foldername)
    await fs.promises.mkdir(`${currentpath}/${foldername}`,{ recursive: true })
    .then(()=>{
        res.status(201).send("dircreated")
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send(err.message)
    })
})
app.post('/createfile',(req,res)=>{
    filename=req.body.data
    console.log(filename)
    fs.writeFile(`${currentpath}/${filename}`,'',(err)=>{
        if (err){
            console.log(`err:${err}`)
        }
        res.status(201).send('filecreated')
    })
})
app.post('/copyfile',async (req,res)=>{
    src=req.body.source
    dest=req.body.dest
    console.log(src)
    await copyFile(`${currentpath}/${src}`,`${currentpath}/${dest}`,constants.COPYFILE_EXCL)
    .then(()=>{
        res.status(201).send('filecopied')
    })
    .catch((err)=>{
        res.status(500).send(err.message)
    })
})
app.post('/copydir',async(req,res)=>{
    src=req.body.src
    dest=req.body.dest
    console.log(src)
    await fs.promises.cp(`${currentpath}/${src}`,`${currentpath}/${dest}`,{ recursive: true ,force:true})
    .then(()=>{
        res.status(201).send('dircopied')
    })
    .catch((err)=>{
        res.status(500).send(err.message)
    })
})
app.delete('/deletefile',async(req,res)=>{
    src=req.body.src
    await unlink(`${currentpath}/${src}`)
    .then(()=>{
        res.status(204).send('filedeleted')
    })
    .catch((err)=>{
        res.status(500).send(err.message)
    })
})
app.delete('/deletedir',async(req,res)=>{
    src=req.body.src
    console.log(src)
    await fs.promises.rm(`${currentpath}/${src}`,{ recursive: true, force: true })
    .then(()=>{
        res.status(204).send('dirdeleted')
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err.message)
    })
})
app.put('/move',async(req,res)=>{
    src=req.body.src
    dest=req.body.dest
    await fs.promises.rename(`${currentpath}/${src}`,`${currentpath}/${dest}`)
    .then(()=>{
        res.send('moved')
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
})
app.get('/files',(req,res)=>{
    const endpath = req.query.path || '';
    console.log(endpath)
    safepath=path.normalize(endpath).replace(/^(\.\.[\/\\])+/, '')
    fs.readdir(`${currentpath}/${safepath}`,{withFileTypes:true},(err,files)=>{
        if(err){
            console.log(err)
            return res.status(500).json({"err":err.message})
        }
        const fileList=files.map(file=>({
            name:file.name,
            isDirectory:file.isDirectory(),
            path:`${safepath}/${file.name}`
        }))
        return res.status(200).json({ "data": fileList })
        
    })
})
app.get('/file',(req,res)=>{
    const filePath=req.query.path;
    const safePath=path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    res.sendFile(`${currentpath}/${safePath}`);
})
PORT=3004;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})