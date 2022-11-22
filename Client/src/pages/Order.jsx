
import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const columns = [
    {
      field: 'FirstName',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'LastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
    },
    {
      field: 'Email',
      headerName: 'Email',
      width: 210,
      editable: false,
    },
    {
      field: 'Phone',
      headerName: 'Phone number',
      width: 210,
      editable: false,
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 210,
      editable: true,
    },
  ];


const Container = styled.div``
const Wrapper = styled.div``

function Order () {

    const {id} = useParams();
    const [Orders, setOrders] = useState([])
    useEffect(() => {
        const getUser = async () =>{
            try{
                const res = await axios.get(`/order/find/${id}`, {headers:{ Cookie:"access_token"}})
                setOrders(res.data)
            } catch (err){

            }
        }
        getUser()
    }, [])
    return (
        <Container>
            <Navbar />
            <Wrapper>
            <Box sx={{ height: '100vh', width: '100%' }}>
            <DataGrid
                getRowId={(Orders) => Orders._id}
                rows={Orders}
                columns={columns}
                // pageSize={5}
                // rowsPerPageOptions={[20]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
            </Box>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Order

































































