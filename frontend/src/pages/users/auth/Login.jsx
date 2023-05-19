import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import publicApi from '../../../api/publicApi';

function Login() {
    const[loginData, setLoginData]= useState({email: '', password:''})
    const login = async(e)=>{
        e.preventDefault();
       const {data}= await publicApi.post('/login', loginData)
       console.log(data)
    }

return(
    <div className="bg-img">
        <div style={styles.cont}>
        <Form>
            <h3 style={styles.txt}>Login</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" value={loginData.email} 
        onChange={(e)=>{setLoginData({...loginData, email:e.target.value})}} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password"  value={loginData.password}
        onChange={(e)=>{setLoginData({...loginData, password:e.target.value})}}  required/>
      </Form.Group>
      <button style={styles.btn}> Submit</button>
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
        minHeight: '240px',
        padding: '15px'
    },
    btn:{
        width: '440px',
        height: '40px',
        backgroundColor: 'black',
        color: '#fff',
        borderRadius: '10px',
        border: 'none',
        margin: '8px'
    },
    txt:{
        borderBottom:'0.3px solid black'
    }
}

export default Login;