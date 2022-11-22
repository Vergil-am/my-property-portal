import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const Container = styled.div`
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;
`

const Center = styled.div`padding-left: 10px;`
const Ul = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`
const Li = styled.li`
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;

`
const Title = styled.p`
        font-size: 10px;
        font-weight: bold;
        color: #999;
        margin-top: 15px;
        margin-bottom: 5px;
`
const Span = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #888;
    margin-left: 10px;
`
const Button = styled.button`
  background: none; border-style: none;
  cursor: pointer; color: #888 ; font-weight: 600;
  font-size: 13px; margin-left: 5px;
`
const Sidebar = () => {
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = (e)=> {
    dispatch(logout())
  }
  return (
    <Container>
      <Center>
        <Ul>
          <Title >MAIN</Title>
          <Link to="/" style={{textDecoration: 'none'}} >
            <Li>
              <DashboardIcon  style={{ color: "darkblue" }}/>
              <Span>Home</Span>
            </Li>
          </Link>

          <Title>LISTS</Title>
          <Link to="/admin/users" style={{ textDecoration: "none",color: "darkblue" }}>
            <Li>
              <PersonOutlineIcon />
              <Span>Users</Span>
            </Li>
          </Link>
          <Link to="/admin/joinforms" style={{ textDecoration: "none",color: "darkblue" }}>
            <Li>
              <PersonOutlineIcon />
              <Span>Join aplications</Span>
            </Li>
          </Link>
          <Link to="/admin/properties" style={{ textDecoration: "none",color: "darkblue" }}>
            <Li>
              <StoreIcon />
              <Span>Properties</Span>
            </Li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" ,color: "darkblue"}}>
              <Li>
                <CreditCardIcon/>
                <Span>Orders</Span>
              </Li>

          
          </Link>

          
          
          <Link to="/admin/properties/create" style={{ textDecoration: "none" ,color: "darkblue"}}>
            <Li>
              <AddCircleOutlineIcon />
              <Span>new property</Span>
            </Li>
          </Link>
          <Title>USER</Title>
          <Link to="/admin/users/create" style={{ textDecoration: "none",color: "darkblue" }}>
            <Li>
              <PersonAddIcon />
              <Span>Create new user</Span>
            </Li>
          </Link>
          <Li>
            <ExitToAppIcon style={{ color: "darkblue" }}/>
            <Button onClick={handleLogout}> Logout</Button>
          </Li>
        </Ul>
      </Center>
      
    </Container>
  );
};

export default Sidebar;
