import React, { Fragment } from 'react'
import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const CRUD = () => {
 const heroData=[
    {
        id: 1,
        name: "super man",
        firstName: "super",
        lastName: "man",
        place: "london"
      },

      {
        id: 2,
        name: "iron man",
        firstName: "iron",
        lastName: "man",
        place: "london"
      },
      {
        id: 3,
        name: "Spider man",
        firstName: "peter",
        lastName: "parker",
        place: "london"
      }
 ]
  const [data,setData] = useState([]);
  
  const handleEdit=(id)=>{
      alert(id);
  }

  const handleDelete=(id)=>{
    if(window.confirm("Are you sure to delete this hero?")== true){
      alert(id);
    }
    
  }




  //defining default loading data
  useEffect(()=>{
    setData(heroData);
  },[])
    return (
    <>
      <Table striped bordered hover size="sm" className='mytable'>  
      <thead>
        <tr>
          <th>Number</th>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Place</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length>0?
            data.map((item,index)  => {
                return(
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.place}</td>
                    <td  colSpan={2}>
                        <button className='btn btn-primary' onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                        <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
            }
            ):'Loading...'
        }
      
      </tbody>
    </Table>

  
    </>
  )
}

export default CRUD;