import React, {useState} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import publicApi from '../../../api/publicApi';
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [registerData, setRegisterData]= useState({firstName: '', lastName: '', email: '',
 password: '', phoneNumber: ''})
     const[errorMsg, setErrorMsg]= useState(null)
 const register = async(e)=>{
   e.preventDefault();
   try{
    const {data}=await publicApi.post('/register', registerData);
    console.log(data)
    if(data.message ==='User created successfully!'){
     navigate('/login')
    }
   }catch(error){
     setErrorMsg('Something went wrong, try again')
   }
   
 }

return(
    <div  className="bg-img">
        <div style={styles.cont}>
        <Form onSubmit={register}>
            <h3>Register</h3>
            <Row>
               <Col>
                  <Form.Control type="text" placeholder="First name" value={registerData.firstName}
                  onChange={(e)=>{setRegisterData({...registerData, firstName: e.target.value})}} required/>
                    </Col>
                    <Col>
                  <Form.Control type="text" placeholder="Last name" value={registerData.lastName}
                  onChange={(e)=>{setRegisterData ({ ...registerData, lastName:e.target.value})}} required/>
                </Col>
            </Row>
        
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label></Form.Label>
                <Form.Control type="email" placeholder="Email" value={registerData.email}
                onChange={(e)=>{setRegisterData ({ ...registerData, email: e.target.value})}} required/>
            </Form.Group>
        
            <Row>
                <Col>
                <Form.Control type="password" placeholder="Password" value={registerData.password}
                onChange={(e)=>{setRegisterData ({ ...registerData, password: e.target.value})}} required/>
                </Col>
                <Col>
                <Form.Control type="text" placeholder="Phone Number" value={registerData.phoneNumber}
                onChange={(e)=>{setRegisterData({...registerData, phoneNumber: e.target.value})}} required/>
                </Col>
            </Row>
            <button style={styles.btn}>Submit</button>
            { errorMsg ? <p style={styles.msg}>{errorMsg}</p> : null}
       </Form>
       
       </div>
    </div>
)
}
const styles={
    cont:{
        marginLeft: '450px',
        margin: '20px',
        maxWidth: '700px',
        backgroundColor: 'white',
        borderRadius: '5px',
        minHeight: '270px',
        padding: '10px'
    },
    btn:{
        width: '420px',
        height: '40px',
        backgroundColor: 'black',
        color: '#fff',
        borderRadius: '15px',
        border: 'none',
        margin: '8px'
    },
    msg:{
        color: 'red',
        fonstSize: '8px'
    }
    
}

export default Register;