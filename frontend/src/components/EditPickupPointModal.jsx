import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import EditIcon from '@mui/icons-material/Edit';


const EditPickupPointModal=({pickupPointsData, setPickupPointsData, location, name, id, updatePickupPoints})=>{
    console.log(location)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <EditIcon onClick={()=>{
          // console.log(pickupPointsData.location)
          setPickupPointsData({...pickupPointsData, location: location, name: name, id: id })
          handleShow()
        }
    }/>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pickup Points</Modal.Title>
            {console.log(pickupPointsData)}
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={updatePickupPoints}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={pickupPointsData.location} 
                onChange={(e)=> setPickupPointsData({...pickupPointsData, location: e.target.value}) } />
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={pickupPointsData.name} 
                onChange={(e)=> setPickupPointsData({...pickupPointsData, name: e.target.value}) } />
                
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

export default EditPickupPointModal;