import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const AddPickupPointModal=({pickupPointsData, setPickupPointsData, createPickupPoints})=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button style={styles.btn}  onClick={handleShow}>Add PickupPoint</button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pickup Points</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={createPickupPoints}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" onChange={(e)=> setPickupPointsData({...
                            pickupPointsData, location: e.target.value}) } />
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e)=> setPickupPointsData({...
                            pickupPointsData, name: e.target.value}) } />
                
            </Form.Group>
            <button style={{...styles.btn,...styles.submitBtn}}>Submit</button>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </>
    )
}

const styles={
    btn:{
        background: '#000',
        color: '#fff',
        borderRadius: '10px',
        width: '200px',
        border: 'none',
        padding: '10px',
        margin: '10px 0'
    },
    submitBtn: {
        width: '100%'
    }
}

export default AddPickupPointModal;