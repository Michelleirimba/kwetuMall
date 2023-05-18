import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


function Register(){
return(
    <div  className="bg-img">
      <Container style={styles.cont}>
        <div style={styles.forms}>
      <h3>Register</h3>
        <Form >
            <Row>
               <Col>
                  <Form.Control placeholder="First name" />
                    </Col>
                    <Col>
                  <Form.Control placeholder="Last name" />
                </Col>
            </Row>
        </Form>
        <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label></Form.Label>
            <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        </Form>
        <Form>
            <Row>
               <Col>
                <Form.Control placeholder="Password" />
               </Col>
               <Col>
                <Form.Control placeholder="Phone Number" />
               </Col>
            </Row>
       </Form>
       <button style={styles.btn}>Register</button>
       </div>
      </Container>
       
    </div>
)
}
const styles={
    home:{
        // height: '100%'
    },
    cont:{
        marginLeft: '450px',
        margin: '20px',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '5px',
        minHeight: '260px'
        // paddingTop: '30px'
    },
    btn:{
        width: '360px',
        height: '40px',
        backgroundColor: 'black',
        color: '#fff',
        borderRadius: '15px',
        border: 'none',
        margin: '8px'
    },
    forms:{
        display: 'block'
    }
}

export default Register;