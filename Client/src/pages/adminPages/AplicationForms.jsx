import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/admin/Sidebar'
//import Datagrid from '../../components/admin/Dataagrid';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'FirstName' ,
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'LastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'Email',
    headerName: 'Email',
    width: 210,
    editable: true,
  },
  {
    field: 'Phone',
    headerName: 'Phone number',
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

function ApplicationForms() {
  const [Forms, setForms] = useState([]);
  useEffect(() => {
    const getForms = async () => {
      const res = await axios.get('/join/find/', {headers:{ Cookie:"access_token"}})
      setForms(res.data)
    }
    getForms()
  }, [])

  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`/join/delete/${id}`,{ headers: { Cookie: "access_token" } },);
      console.log("Form id is : " + id)
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
          <div style={{ display: "flex"}} className="cellAction">
            <Button onClick={() => handleDelete(params.row._id)}>
              <DeleteOutlineIcon style={{color: "red"}}/>
            </Button>
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
          getRowId={(Forms) => Forms._id}
          rows={Forms}
          columns={columns.concat(actionColumn)}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  )
}

export default ApplicationForms