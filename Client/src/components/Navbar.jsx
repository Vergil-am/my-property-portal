import React from "react";
import styled from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, stepClasses } from "@mui/material";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountMenu from "./dropDown";
import MenuIcon from '@mui/icons-material/Menu';




const Container = styled.div`
  height: 65px; background-color: black;
  color: white;
  @media (max-width: 768px) {
    min-height: ${({ Open }) => (Open ? "300px" : "60px")};
    transition: min-height 0.3s ease-in-out;
  }
`
const Wrapper = styled.div`
  padding: 10px 20px; display: flex; justify-content: space-between;
  align-items: center;
  
`
const LinkContainer = styled.div``

// const Languages = styled.span`font-size: 14px; cursor: pointer;`
// const SearchContainer = styled.div`
//   border: 1px; border-radius :20px; 
//   background-color : white; border-color: white;
//   border-style: solid; margin-left: 5rem;
// `
// const Input = styled.input`
//   border: none ; border-radius: 20px;
// `
const Logo = styled.h1` 
  margin-top: 0; margin-bottom: 0; padding-bottom: 0;
  align-self: flex-start; font-size: 30px; position: absolute; top: 0px;
`
const SmallText = styled.p`
    margin-top: 0px; font-size: 15px;
`
// const Left = styled.div`flex: 1; display: flex;
//   align-items: center;
// `
const Div = styled.div`
  position: relative; 
`
const Select = styled.select`
   background-color: transparent; border: none;
   position: absolute; top: 0; left: 0;
   opacity: 0; height: 100% ;
`
const Center = styled.div`
  flex:1 ; align-items: flex-start; justify-content: flex-start;
`

const MenuDesk = styled.div`
  flex:1; display: flex ;
  justify-content: flex-end ; align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
  
`
const MenuPhone = styled.div`
   display: ${({ Open }) => (Open ? "flex" : "none")};;
   flex-direction: column; align-items: center; justify-content: center;
   overflow: hidden;
   @media (min-width: 768px) {
    display: none;
   }
`
const PhoneProfile = styled.div`
  @media (min-width: 768px){
    display: none;
  }
`
const Hamburger = styled.button`
  background: none; color: white; border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  @media (min-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};;
  }
`

const MenuItem = styled.div`
  font-size: large; cursor: pointer; margin-left: 2rem;

`
const MenuLink = styled(Link)`
  cursor: pointer; color: white; text-decoration: none;
  &:hover {
    transform: scale(1.2); opacity: 0.5;
    
  }
  @media (max-width: 768px){
    margin: 0.5rem; font-size: 30px;
    overflow: hidden;
  }

`
function Navbar() {
  const {currentUser} = useSelector(state => state.user)
  const [IsOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const handleLogout = (e)=> {
    dispatch(logout())
  }
    return (
      <Container Open={IsOpen}>
        <Wrapper>
          <Center>
            <Logo>
               <Link to={"/"} style={{textDecoration:"none", color:"white"}}>Prime West <br /><SmallText>Property group</SmallText></Link>
            </Logo>
          </Center>
          <MenuDesk >
            <MenuLink to={'/buy'}> Buy </MenuLink>
            <MenuLink to={`/sell`}> Sell </MenuLink>
            <MenuLink to={`/rent`}> Rent </MenuLink>
            <MenuLink to={`/manage`}> Manage </MenuLink>
            { currentUser ? (<AccountMenu />):

              <Link style={{textDecoration: 'none', color:'white', alignSelf: "center"}} to={`/login`}><MenuItem> sign in </MenuItem></Link>
            }
          </MenuDesk>
          <Hamburger onClick={() => setIsOpen(!IsOpen)}><MenuIcon /></Hamburger>
          <PhoneProfile>{ currentUser ? (<AccountMenu />):
              <Link style={{textDecoration: 'none', color:'white'}} to={`/login`}><MenuItem> sign in </MenuItem></Link>
            }</PhoneProfile>

        </Wrapper>
          <MenuPhone Open={IsOpen}>
            <MenuLink to={'/buy'}> Buy </MenuLink>
            <MenuLink to={`/sell`}> Sell </MenuLink>
            <MenuLink to={`/rent`}> Rent </MenuLink>
            <MenuLink to={`/manage`}> Manage </MenuLink>
          </MenuPhone>
      </Container>
    );
  }
  
export default Navbar;