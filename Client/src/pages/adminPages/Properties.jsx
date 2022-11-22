import React from 'react'
import styled, { isStyledComponent } from 'styled-components'
import Sidebar from '../../components/admin/Sidebar'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'Title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'Type',
    headerName: 'Type',
    width: 150,
    editable: true,
  },
  {
    field: 'Price',
    headerName: 'Price',
    width: 210,
    editable: true,
  },
  {
    field: 'Location',
    headerName: 'Suburb',
    width: 210,
    editable: true,
  },
  {
    field: 'Bedrooms',
    headerName: 'Bedrooms',
    width: 210,
    editable: true,
  },
  {
    field: 'Bathrooms',
    headerName: 'Bathrooms',
    width: 210,
    editable: true,
  },
  {
    field: 'Garages',
    headerName: 'Garages',
    width: 210,
    editable: true,
  },
  {
    field: 'Size',
    headerName: 'Size',
    width: 210,
    editable: true,
  },
  {
    field: 'Land Size',
    headerName: 'LandSize',
    width: 210,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 210,
    editable: true,
  },
];

const Container = styled.div`
   display: flex;
`
const Button = styled.button`
  background: none; border: none; cursor: pointer;
`
function Properties() {
  const [Properties, setProperties] = useState([]);
  useEffect(() => {
    const getProperties = async () => {
      const res = await axios.get('/property')
      setProperties(res.data)
    }
    getProperties()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/property/delete/${id}`, { headers: { Cookie: "access_token" } },);
      console.log("object id is : " + id)
    } catch (err) {
      console.log(err)
    }

  }
  const handleEdit =  async (params) => {
    try {
      const res = await axios.put(`/property/update/${params._id}`, { 
        Title : `${params.Title}`,
        Type : `${params.Type}`,
        Price : `${params.Price}`,
        Adress : `${params.Adress}`,
        Bedrooms : `${params.Bedrooms}`,
      } , {header: { Cookie: "access_token"}})
    } catch (err) {
      console.log(err)
    }
    
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }} className="cellAction">
            <Button onClick={() => handleDelete(params.row._id)}> <DeleteOutlineIcon style={{color: "red"}}/></Button>
            <Button onClick={() => handleEdit(params.row)}> <EditIcon style={{color: "blue"}} /> </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Container>
      <Sidebar />
      <Box sx={{ height: '100vh', width: '90vw' }}>
        <DataGrid
          getRowId={(Properties) => Properties._id}
          rows={Properties}
          columns={columns.concat(actionColumn)}
          // pageSize={10}
          // rowsPerPageOptions={[10]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  )
}

export default Properties