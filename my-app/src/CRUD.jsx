import React, { Fragment } from 'react'
import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

 //model popup
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const [data,setData] = useState([]);
const [name,setName] = useState('');
const [firstName,setFirstName] = useState('');
const [lastName,setlastName] = useState('');
const [place,setplace] = useState('');

const [editName,setEditName] = useState('');
const [editFirstName,setEditFirstName] = useState('');
const [editLastName,setEditlastName] = useState('');
const [editPlace,setEditplace] = useState('');
const [editId,setEditId] = useState('');

  const handleEdit=(id)=>{
     // alert(id);
     handleShow();

  }

  const handleDelete=(id)=>{
    if(window.confirm("Are you sure to delete this hero?")== true){
      alert(id);
    }
    
  }


   
  const getData = ()=>{
    axios.get('https://localhost:7151/api/SuperHero')
    .then((result)=>{
      setData(result.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const handleSave =() =>{
    const url = "https://localhost:7151/api/SuperHero"
    const data={
        "name": name,
        "firstName": firstName,
        "lastName": lastName,
        "place": place    
    }
    axios.post(url,data)
    .then((result) => {
      getData();
      clear();
      toast.success('Hero has been added');
    })
  }
   
  const clear = () =>{
     setName('');
     setFirstName('');
     setlastName('');
     setplace('');
     setEditName('');
     setEditFirstName('');
     setEditlastName('');
     setEditplace('');
     setEditId('');

  }

  //defining default loading data
  useEffect(()=>{
    getData();
  
  },[])

    return (
    <>
      <ToastContainer />
          {/* submit form */}
       <Container className='mytable'>
      <br />
      <Row>
        <Col>
        <input type="text" className='form-control ' placeholder='Enter Name'
        value={name} onChange={(e)=>setName(e.target.value)}/></Col>
        <Col>
          <input type="text" className='form-control ' placeholder='Enter First Name'
          value={firstName} onChange={(e)=>setFirstName(e.target.value)}
           />
        </Col>
        <Col>
          <input type="text" className='form-control ' placeholder='Enter Last Name'
          value={lastName} onChange={(e)=>setlastName(e.target.value)} />
        </Col>
        <Col><input type="text" className='form-control ' placeholder='Enter Place' 
        value={place} onChange={(e)=>setplace(e.target.value)}/></Col>
        <Col>
         <button className='btn btn-primary'onClick={()=> handleSave()}>Add Item</button>
        </Col>
      </Row>
      <br />
      <Row>
      </Row>
    </Container>
     
     
     
     
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

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
      <br />
      <Row>
      <Col>
        <input type="text" className='form-control ' placeholder='Name'
        value={editName} onChange={(e)=>setEditName(e.target.value)}/></Col>
        <Col>
          <input type="text" className='form-control ' placeholder='First Name'
          value={editFirstName} onChange={(e)=>setEditFirstName(e.target.value)}
           />
        </Col>
        <Col>
          <input type="text" className='form-control ' placeholder='Last Name'
          value={editLastName} onChange={(e)=>setEditlastName(e.target.value)} />
        </Col>
        <Col><input type="text" className='form-control ' placeholder='Place' 
        value={editPlace} onChange={(e)=>setEditplace(e.target.value)}/></Col>
      </Row>
      <br />
      <Row>
      </Row>
    </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  
    </>
  )
}

export default CRUD;