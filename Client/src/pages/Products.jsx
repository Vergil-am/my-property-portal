import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathtubIcon from '@mui/icons-material/Bathtub';
import TerrainIcon from '@mui/icons-material/Terrain';
import StraightenIcon from '@mui/icons-material/Straighten';


const Body = styled.div``
const FilterContainer = styled.div`
    display: flex; justify-content: space-between;
    @media (max-width: 768px) {
        display: flex; flex-wrap: wrap-reverse;
    }
`
const Filter = styled.div`
    margin: 20px; display: flex;
`
const Text = styled.span`
  font-size: 20px; font-weight: 600;
`
const Container = styled.div`
    display: flex; flex-wrap: wrap;
    align-items: center; padding: 20px;
    @media (max-width: 768px) {
        width: 90%; height: 90%;
        padding: 0;
    }
`
const Background = styled.div`
    background-color: rgba(34, 27, 43, 0.5); opacity: 0;
    position: absolute; top: 0; left: 0;  height: 100%; width: 100%;
`
const Info = styled.div`
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%; display: flex;
    justify-content: center; align-items: center;
    
    
`
const Title = styled.h3`
    color: black; position: absolute;
    left: 10px; bottom: 20%;
`
const ProductContainer = styled.div`
    flex: 1;
    min-width: 200px; max-width: 200px;
    min-height: 300px; max-height: 300px;
    padding: 10px; margin: 10px;
    position: relative; display: inline-block;
    align-items: center; justify-content: center;
    &:hover ${Background}{
        opacity: 0.5; border-radius: 25px;
        border-style: none; box-shadow: 2px 2px 26px -2px rgba(34,27,43,0.7);
        @media (max-width: 768px) {
            border: none; border-radius: 0;
            padding: 0; margin: 0;
        }
    }
    &:hover {
        @media (min-width: 768px) {
            scale: 1.1
        }
    }
    @media (max-width: 768px) {
        min-width: 100vw;
        margin: 0; padding: 0;
        max-height: 100vh;
    }
`
const Select = styled.select`
    border: none; font-weight: 600; margin-left: 10px;
    max-height: 40px;
    border-radius: 20px; margin-right: 10px;
    background-color: rgba(34, 27, 43, 0.1);
    padding-left: 10px;
    @media (max-width: 768px) {
        display: ${props => props.visibility ? 'flex': 'none'};
    }
    
`
const Option = styled.option`
    
`
const ImgContainer = styled.div`
   width: 200px; height: 200px;
   display: flex; align-items: center;
   justify-content: center;
   @media (max-width: 768px) {
    width: 100%; object-fit: contain;
   }

`
const Image = styled.img`
    height: 100%; width: 100%;
    object-fit: cover; align-items: center;
    justify-content: center;

`
const Price = styled.p`
   position: absolute;
   bottom: 10px; left: 10px;
   display: flex; align-items: center; justify-content: center;
   color: black; font-weight: 600;
`
const Description = styled.div`
   position: absolute;
   bottom: 17%; color: gray;
   display: flex; justify-content: space-between; align-items: center;
`
const SearchContainer = styled.div`
  border: 1px; border-radius :20px; width: 90%;
  background-color : rgba(34, 27, 43, 0.1); border-color: rgba(0,0,0, 0.3);
  border-style: solid; margin-left: 5rem;
  max-height: 40px;
  font-size: larger; padding: 10px;
  justify-content: center; display: flex;
  @media (max-width: 768px) {
    margin-left: 0;
  }    
  

`
const Input = styled.input`
  border: none ; border-radius: 20px;
  background-color: transparent;

`


function Product ({product}) {
    return(
        <Link to={`/property/${product._id}`}>
        <ProductContainer>
            <ImgContainer><Image key={product.id} src={product.Image}/></ImgContainer>
            <Background></Background> 
            <Info>
                <Title key={product.id}>{product.Title}</Title>
                {(product.Type == "House") && <Description>
                    <BedIcon /> {product.Bedrooms} | <BathtubIcon /> {product.Bathrooms}| <HouseIcon /> {product.Size} m<sup>2</sup>
                </Description> }
                {(product.Type == "Land") && <Description>
                    <TerrainIcon /> {product.Size} m<sup>2</sup> | <StraightenIcon /> {product.Width} m
                </Description> }
                <Price key={product.id}> <MonetizationOnIcon sx={{marginRight: '5px'}} /> {product.Price}$</Price>
            </Info>
        </ProductContainer>
        
        
        </Link>

    )
}


function Products () {

    const [ProductList, setProducts] = useState(null);
    const [Toggle, setToggle] = useState(false)
    
    const [Category, setCategory] = useState(null)
    const [query, setQuery] = useState("");



    useEffect(() => {
        const getProperties = async () =>{
            try{
                const res = await axios.get(Category ? `/property?category=${Category}` :
                `/property`
                )
                setProducts(res.data)
            } catch (err){

            }
        }
        getProperties()
    }, [Category])

  return (
    <Body>
       <Navbar />
       <FilterContainer>
            <Filter>
                <button style={{backgroundColor: "transparent", border: "none"}} onClick={()=> {
                    setToggle(!Toggle)
                }}><TuneIcon /></button>
                <Select visibility={Toggle} onChange={(e) => setQuery(e.target.value)}>
                    <Option value={""}>Bedrooms</Option>
                    <Option >1</Option>
                    <Option >2</Option>
                    <Option >3</Option>
                </Select>
                <Select visibility={Toggle} onChange={(e) => setQuery(e.target.value)}>
                    <Option value={""}>All</Option>
                    <Option>House</Option>
                    <Option>Land</Option>
                </Select>
            </Filter>
           <Filter>
                <SearchContainer>
                    <Input placeholder="Search..." onChange={e => setQuery(e.target.value)}/>
                    <SearchOutlinedIcon style={{color:"#4B0082", fontSize:"larger"}}/>
                </SearchContainer>
            </Filter>
       </FilterContainer>
    {ProductList && <Container> {ProductList.filter(product=> product.Title.toLowerCase().includes(query) || product.Bedrooms.toString().includes(query)|| product.Location.includes(query) ||  product.Type.includes(query) || product.Description.toLowerCase().includes(query)).map((product) => <Product cat={Category} key={product._id} product={product}/>)}</Container>}
       <Footer />
    </Body>

    
  )
}


export default Products