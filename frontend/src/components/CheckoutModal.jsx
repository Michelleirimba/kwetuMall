import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import privateApi from '../api/publicApi'

function Checkout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[pickuppoint, setPickupPoint]= useState({});
  const getPickupPoints = async ()=>{
    const{data} = await privateApi.get('/pickupPoints');
    console.log(data);
    setPickupPoint(data.data)
  };

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
        <Form style={styles.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pick check out locaion</Form.Label>
                <Form.Select required>
                    <option></option>
                </Form.Select>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Choose pickup point</Form.Label>
                <Form.Select required>
                    <option></option>
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