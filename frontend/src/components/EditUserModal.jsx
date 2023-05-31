import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import publicApi from '../api/publicApi'

function EditUser ({id, userData, setUserData, updateUser}) {
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUser = async ()=>{
     const {data} = await publicApi.get(`/users/${id}`)
     console.log(data)
     setUserData(data.data)
    }

        return (
            <>
            <EditIcon onClick = {()=>{
                getUser()
                handleShow()
                }}/>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit= {updateUser} style= {styles.form} >
                    <Row style={styles.row}>
                        <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type= "text" value= {userData.firstName}
                        onChange={(e)=>setUserData({...userData ,firstName: e.target.value})}/>
                        </Col>
                        <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type= "text" value= {userData.lastName}
                        onChange={(e)=>setUserData({...userData ,lastName: e.target.value})}/>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type= "email" value= {userData.email}
                        onChange={(e)=>setUserData({...userData ,email: e.target.value})}/>
                        </Col>
                        <Col>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type= "number"  value= {userData.phoneNumber}
                        onChange={(e)=>setUserData({...userData ,phoneNumber: e.target.value})} />
                        </Col>
                    </Row>
                        <button style={styles.btn}>  Submit </button>
                    </Form>
                    
                </Modal.Body>
            </Modal>
            </>
        )
}
const styles = {
    form:{
      paddingLeft: '5px',
      paddingRight : '5px'
    },
    row: {
        marginTop : '5px'
    },
    btn:{
        height: '40px',
        width: '450px',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '10px',
        paddingLeft : '5px',
        paddingRight: '5px',
        marginTop : '5px'

    }
}

export default EditUser;