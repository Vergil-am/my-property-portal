import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../FireBase'
import Sidebar from '../../components/admin/Sidebar'
import { Button, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import OutlinedInput from '@mui/material/OutlinedInput';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Container = styled.div`
   display: flex;
`
const Wrapper = styled.div`
    min-height: 100vh; width: 90vw;
    display: flex; justify-content: center;
    align-items: center;
`
const FormContainer = styled.div`
    display: flex; flex-direction: column; width: 100%;
    justify-content: center; align-items: center;
`
const H1 = styled.h1`
    font-size: 24px;
   font-weight: 300;
`
const Form = styled.form`
    display: flex; flex-direction: column;
    width: 100%;
`
const Error = styled.span`
    align-self: center; margin-top: 20px; margin-bottom: 20px;
`
const UploadContainer = styled.div`
   display: flex;
`

function CreateNewProperty() {
    const navigate = useNavigate();
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Image, setImage] = useState("");
    const [File, setFile] = useState(null);
    const [Location, setLocation] = useState("");
    const [Size, setSize] = useState("");
    const [Bedrooms, setBedrooms] = useState("");
    const [Bathrooms, setBathrooms] = useState("");
    const [Garages, setGarages] = useState("");
    const [LandSize, setLandSize] = useState("");
    const [Width, setWidth] = useState("");
    const [Frontage, setFrontage] = useState("");
    const [Price, setPrice] = useState("");
    const [error, seterror] = useState(false);
    const [Progress, setProgress] = useState("");


    const handleUpload = async (e) => {
        // firebase upload
        const filename = new Date().getTime() + File.name
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
                    setImage(downloadURL)
                    ;
                });
            }
        );
    } 

    const handlePostHouse = async (e) => {
        e.preventDefault();
        const Type = "House"
        // Send the post request
        try {

            const res = await axios.post("/property", { Title, Description, Image, Location, Bedrooms , Bathrooms, Garages, LandSize, Size, Type , Price }, { headers: { Cookie: "access_token" } },);
            console.log(res.data)
            navigate("/properties")
        } catch (err) {
            console.log(err)
            seterror(true)
        }
    }
    const handlePostLand = async (e) => {
        e.preventDefault();
        

        // Send the post request
        try {
            const Type = "Land"
            const res = await axios.post("/property", { Title, Description, Image, Location, Type, Size, Width, Frontage , Price }, { headers: { Cookie: "access_token" } },);
            console.log(res.data)
            navigate("/properties")
        } catch (err) {
            console.log(err)
            seterror(true)
        }
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Container>
            <Sidebar />

            <Wrapper>
                <Box sx={{ width: '100vw', display: "flex", flexDirection: "column",alignItems: "center" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="House" {...a11yProps(0)} />
                            <Tab label="Land" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <FormContainer>
                            <H1>Add new house</H1>
                            <Form>
                                <OutlinedInput fullWidth={true} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Description" onChange={e => setDescription(e.target.value)} />
                                <UploadContainer><Button sx={{ cursor: 'pointer' }}>
                                    <OutlinedInput sx={{ Height: '50%', Width: '50%', opacity: '1', flex: '1', cursor: 'pointer' }} type='file' onChange={e => setFile(e.target.files[0])} /> </Button>
                                    <Button sx={{ margin: '10px' }} variant='contained' onClick={handleUpload}>upload picture</Button>
                                </UploadContainer>
                                <Error>{Progress}</Error>
                                <OutlinedInput fullWidth={true} placeholder="Bedrooms" type="number" onChange={e => setBedrooms(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Bathrooms" type="number" onChange={e => setBathrooms(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Garages" type="number" onChange={e => setGarages(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Land size" type="number" onChange={e => setLandSize(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="size" type="number" onChange={e => setSize(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Suburb" onChange={e => setLocation(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder='Price' type="number" onChange={e => setPrice(e.target.value)} />
                            </Form>
                            {error && <Error>Somethinng went wrong</Error>}

                            <Button sx={{ marginTop: '20px' }} variant='contained' endIcon={<SendIcon />} onClick={handlePostHouse} >Post</Button>

                        </FormContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <FormContainer>
                            <H1>Add new Land</H1>
                            <Form>
                                <OutlinedInput fullWidth={true} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Description" onChange={e => setDescription(e.target.value)} />
                                <UploadContainer><Button sx={{ cursor: 'pointer' }}>
                                    <OutlinedInput sx={{ Height: '50%', Width: '50%', opacity: '1', flex: '1', cursor: 'pointer' }} type='file' onChange={e => setFile(e.target.files[0])} /> </Button>
                                    <Button sx={{ margin: '10px' }} variant='contained' onClick={handleUpload}>upload picture</Button>
                                </UploadContainer>
                                <Error>{Progress}</Error>
                                <OutlinedInput fullWidth={true} placeholder="Size" type="number" onChange={e => setSize(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="width" type="number" onChange={e => setWidth(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="frontage" onChange={e => setFrontage(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder="Suburb" onChange={e => setLocation(e.target.value)} />
                                <OutlinedInput fullWidth={true} placeholder='price' type="number" onChange={e => setPrice(e.target.value)} />
                            </Form>
                            {error && <Error>Somethinng went wrong</Error>}

                            <Button sx={{ marginTop: '20px' }} variant='contained' endIcon={<SendIcon />} onClick={handlePostLand} >Post</Button>

                        </FormContainer>
                    </TabPanel>
                </Box>
                

            </Wrapper>
        </Container>

    )
}

export default CreateNewProperty