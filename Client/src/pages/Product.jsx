import React, { useEffect } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathtubIcon from '@mui/icons-material/Bathtub';
import TerrainIcon from '@mui/icons-material/Terrain';
import FenceIcon from '@mui/icons-material/Fence';
import StraightenIcon from '@mui/icons-material/Straighten';

const Container = styled.div`
    
`
const Wrapper = styled.div`
  height: 90vh; display: flex;
  @media (max-width: 768px){
    flex-direction: column;
    width: 100%; padding: 0;
    
  }
`
const ImgContainer =styled.div`
  flex: 1; display: flex;
  justify-content: center; align-items: center;
`
const Image = styled.img`
  min-height: 80%; max-width: 80%;
  max-width: 100%; max-height: 100%;
  justify-self: center; align-self: center ;
  @media (max-width: 768px) {
    width:100%; height: 100%;
  }
`
const Info = styled.div`
  flex: 1; display: flex;
  flex-direction: column; 
  justify-self: center;
  align-self: center;
  padding-left: 50px ;
  @media (max-width: 768px){
    padding: 0;
  }
`
const Title = styled.h1`
  
`
const Description = styled.p``
const Text = styled.span`
  display: flex; margin-left: 10px;
`

const Button = styled.button`
   padding: 15px; max-width: 30%;
   background-color: black;
   color: white; font-size: large;
   border-radius: 30px; cursor: pointer;
   @media (max-width: 768px) {
    max-width: 100%;
   }
   
`
const CloseButton = styled.button`
    border: none; background-color: transparent;
    align-self: flex-end;
    padding: 10px; cursor: pointer;
`
const PostButton = styled.button`
   height: 100%; font-size: larger;
   background-color: black;
   border: none;  color: white; cursor: pointer;
`
const Price = styled.span`
  font-weight: 500; font-size: 25px;
`
const FormContainer = styled.div`
    position: absolute; display: ${props => props.visibility ? 'flex': 'none'};
    left: 0; top: 0; width: 100vw; height: 100vh;
    justify-content: center; align-items: center;
    background-color: rgba(34, 27, 43, 0.7);
`
const Form = styled.form`
    display: flex; flex-direction: column;
    background-color: white;
    height: 50%; width: 30%;
    @media (max-width: 768px){
    height: 60%; width: 80%;
    
  }

`
const Input = styled.input`
   margin: 20px; padding: 10px;
`


function Product() {
  const { id } = useParams();
  const [Property, setProperty] = useState({});
  useEffect( () => {
    fetch('/property/' + id)
    .then(res => {
        return res.json()
    })
    .then(data => {
        //console.log(data)
        setProperty(data);
    })
  }, [])
  const [Toggle, setToggle] = useState(false)
  const navigate = useNavigate();

  const PropertyId = id
  const PropertyTitle = Property.Title
  console.log("Property id " +PropertyId)
  const [UserId, setUserId] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const user = useSelector(state => state.user.currentUser);
   //const [Error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUserId(user)
            const res = await axios.post("/order", {FirstName, LastName ,Email, UserId, PropertyId, PropertyTitle, Phone}, {headers:{ Cookie:"access_token"}},);
            console.log(res.data)
            setToggle(!Toggle)
        } catch (err) {
            console.log(err)
            //setError(true)
        }
    }
  



  return (
    <Container>
        <Navbar />
        <Wrapper>
            <ImgContainer>
              {Property && <Image key={Property._id} src={Property.Image} />} 
            </ImgContainer>

            <Info> 
              {Property && <Title>{ Property.Title }</Title>}
              {Property && <Description>{ Property.Description }</Description>}
              {(Property.Type == "House") && <Text> <BedIcon sx={{marginRight: '10px', color: 'gray'}}/> Bedrooms : {Property.Bedrooms} </Text>}
              {(Property.Type == "House") && <Text> <BathtubIcon sx={{marginRight: '10px', color: 'gray'}}/> Bathrooms : {Property.Bathrooms} </Text>}
              {(Property.Type == "House") && <Text> <GarageIcon sx={{marginRight: '10px', color: 'gray'}}/> Garages : {Property.Garages} </Text>}
              {(Property.Type == "House") && <Text> <HouseIcon sx={{marginRight: '10px', color: 'gray'}}/> House size : {Property.Size} m<sup>2</sup></Text>}
              {(Property.Type == "House") && <Text> <TerrainIcon sx={{marginRight: '10px', color: 'gray'}}/> Land size : {Property.LandSize} m<sup>2</sup></Text>}
              {(Property.Type == "Land") && <Text> <TerrainIcon sx={{marginRight: '10px', color: 'gray'}}/> Land size : {Property.Size} m<sup>2</sup></Text>}
              {(Property.Type == "Land") && <Text> <StraightenIcon sx={{marginRight: '10px', color: 'gray'}}/> Width : {Property.Width} m</Text>}
              {(Property.Type == "Land") && <Text> <FenceIcon sx={{marginRight: '10px', color: 'gray'}}/> Frontage : {Property.Frontage}</Text>}
              {Property && <Text><LocationOnIcon sx={{marginRight: '10px',color: 'gray'}}/> Suburb : {Property.Location}</Text>}
              {Property && <Text> <ApartmentIcon sx={{marginRight: '10px', color: 'gray'}}/> {Property.Type} </Text>}
              {Property && <Price> <AttachMoneyIcon sx={{fontSize: "large", color: 'gray'}}/> {Property.Price}</Price>}
              
                <Button onClick={() => 
                  { if (user) {{setToggle(!Toggle)}}
                  else {navigate("/login")}                
                }}> Hold </Button>
            </Info>       
        </Wrapper>
        <Footer />
        <FormContainer visibility={Toggle}>
          <Form>
            <CloseButton onClick={()=> {setToggle(!Toggle)}}><CloseIcon /></CloseButton>
            <Input placeholder='First Name' onChange={e => setFirstName(e.target.value)}></Input>
            <Input placeholder='last Name' onChange={e => setLastName(e.target.value)}></Input>
            <Input placeholder='Email' onChange={e => setEmail(e.target.value)}></Input>
            <Input placeholder='Phone Number' onChange={e => setPhone(e.target.value)}></Input>
            <PostButton onClick={handleSubmit}><PublishIcon style={{fontZise: "large"}}/></PostButton>
          </Form>
        </FormContainer>
    </Container>
  )
}


export default Product