import React from 'react'
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../FireBase'


function TestPage() {

  const [Files, setFiles] = useState([])
  const [Links, setLinks] = useState([])
  const [Progress, setProgress] = useState("");

  const handleUpload = async (e) => {
    // firebase upload
    const filename = new Date().getTime() + Files.name
    const storage = getStorage(app);

    const storageRef = ref(storage, `images/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, File);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            setProgress("uploading please wait...")
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setProgress("Upload finished")
          setLinks(Links => [...Links, downloadURL])
            ;
        });
      }
    );
  } 




  console.log(Files)
  console.log(Files[0].Name)
    return (
      <div>
        <input type="file" multiple onChange={(e) => setFiles(Files => [...Files, e.target.files])}></input>
        {Files && Files.map((file, index) => <span key={index}>{file.name}</span>)}
        <button>send</button>
      </div>
    );
}

export default TestPage
