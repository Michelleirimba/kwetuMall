import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import EditIcon from '@mui/icons-material/Edit';

const EditCategoryModal = ( {categoryData, setCategoryData, id, name, updateCategory })=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EditIcon onClick={()=>{
        setCategoryData({...categoryData, name: name, id: id})
        handleShow()
      }}
       />
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={updateCategory}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={categoryData.name} onChange={(e)=> setCategoryData({...
                            categoryData, name: e.target.value}) } />
                        
                    </Form.Group>
                    <button style={{...styles.btn,...styles.submitBtn}}>Submit</button>
                </Form>
            </Modal.Body>
      </Modal>
    </>
  );
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

export default EditCategoryModal;