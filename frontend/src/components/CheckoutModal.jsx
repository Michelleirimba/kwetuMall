import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import privateApi from '../api/privateApi';
import Alert from 'react-bootstrap/Alert';

function Checkout({cart}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[pickuppoints, setPickupPoints]= useState([]);
  const[locations, setLocations]= useState([]);
  const[names, setNames] = useState([]);
  const[message, setMessage] = useState(null);
  const getPickupPoints = async ()=>{
    const{data} = await privateApi.get('/pickupPoints');
    console.log(data);
    if(data.message === 'Fetched pickupPoints successfully!'){
    setPickupPoints(data.data)
    let arr = [];
    for( let i =0; i<data.data.length; i++){
      arr = [...arr, data.data[i].location];
    }
    let newArr = new Set(arr);
    console.log(newArr);
    setLocations([...newArr])
    }
  };
  const getNames = (e) =>{
    let filteredPickuppoints = pickuppoints.filter((pickuppoint)=>{
        return pickuppoint.location === e;
    })
    setNames(filteredPickuppoints)
  }
  const checkout = async(e)=>{
  e.preventDefault();
  const {data} = await privateApi.post('/cart/clear',cart);
  console.log(data)
  if(data.message === 'Checked out successfully!'){
    setMessage('Cleared')
  }
  }
  useEffect(()=>{
    getPickupPoints()
  },[])

  return (
    <>
    <div style={styles.items}>
      <button style={styles.btn} onClick={handleShow}>
        Proceed to checkout
      </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <>
         {
           message ?
            <Alert  variant={'success'}>
              Checked out successfully!<br/>
              Pick up your order within 7 days<br/>
              <Alert.Link href="/">Continue browsing</Alert.Link>
            </Alert>
            :null
          }
        </>
        <Form style={styles.form} onSubmit={checkout}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pick check out location</Form.Label>
                <Form.Select required onChange={(e) => getNames(e.target.value)}>
                    <option></option>
                    {
                      locations.map((location)=>{
                        return(
                          <option key={location} value= {location}> {location} </option>
                        )
                      })
                    }
                </Form.Select>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Choose pickup point</Form.Label>
                <Form.Select required>
                    <option></option>
                    {
                      names.map((name)=>{
                        return(
                          <option key={name.name} value= {name.name}> {name.name} </option>
                        )
                      })
                    }
                </Form.Select>
            </Form.Group>
            <button style={styles.btn2}>
             Checkout 
            </button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
const styles={
    btn:{
        height: '55px',
        width: '340px',
        borderRadius: '10px',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
    },
    items:{
        display: 'flex',
        justifyContent: 'center'
    },
    btn2:{
        height: '50px',
        width: '100%',
        borderRadius: '10px',
        backgroundColor: 'black', 
        color: 'white',
        textAlign: 'center',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    form:{
        paddingLeft: '15px',
        paddingRight: '15px'
    }
}

export default Checkout;