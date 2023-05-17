import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddCategoryModal = ( {categoryData, setCategoryData, createCategory })=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button style={styles.btn}  onClick={handleShow}>Add category</button>

      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createCategory}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setCategoryData({...
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

export default AddCategoryModal;