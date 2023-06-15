import React, {useState , useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import adminApi from '../api/adminApi'


function EditAdmin ({id, updateAdmin, adminData, setAdminData}) {
    const [show, setShow] = useState(false);
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAdmin =async()=>{
        const{data} = await adminApi.get(`/admin/${id}`)
        console.log(data)
        if(data.message === 'Admin fetched successfully!'){
            setAdminData(data.data)
        }
    }
        return (
            <>
            <EditIcon onClick={()=>{
                getAdmin()
                handleShow()
            }
            }/>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={updateAdmin} style= {styles.form} >
                    <Row style={styles.row}>
                        <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type= "text" value={adminData.firstName} 
                        onChange={(e)=>setAdminData({...adminData ,firstName: e.target.value})}/>
                        </Col>
                        <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type= "text" value={adminData.lastName}
                        onChange={(e)=>setAdminData({...adminData ,lastName: e.target.value})}/>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type= "email" value={adminData.email}
                        onChange={(e)=>setAdminData({...adminData ,email: e.target.value})} />
                        </Col>
                        <Col>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type= "number" value={adminData.phoneNumber}
                        onChange={(e)=>setAdminData({...adminData ,phoneNumber: e.target.value})} />
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

export default EditAdmin;