import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Form from 'react-bootstrap/Form';
import adminApi from '../../api/adminApi'

function MyAccount() {
    const[admin, setAdmin]= useState([]);
    const[adminData, setAdminData]= useState({firstName: '', lastName: '', email: '', phoneNumber: ''})

    const getMyAccount = async()=>{
        const {data} = await adminApi.get('/admin/myaccount')
        console.log(data)
        setAdminData(data.data)
    }

    const updateMyAccount = async(e)=>{
        e.preventDefault();
        const {data} = await adminApi.post('/admin/update', adminData)
        console.log(data)
    }
    useEffect(()=>{
        getMyAccount()
    },[])
    return(
        <div>
            <Sidenav/>
            <div style={styles.cont}>
            <h3>My Account</h3>
           <Form onSubmit={updateMyAccount} style={styles.form}>
                <Form.Group >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={adminData.firstName}
                    onChange={(e)=>setAdminData({...adminData, firstName:e.target.value})}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={adminData.lastName} 
                    onChange={(e)=>setAdminData({...adminData, lastName:e.target.value})}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={adminData.email}
                    onChange={(e)=>setAdminData({...adminData, email:e.target.value})} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" value={adminData.phoneNumber}
                    onChange={(e)=>setAdminData({...adminData, phoneNumber:e.target.value})}/>
                </Form.Group>
                <button style={styles.btn}>Submit</button>
            </Form>
            </div>
        </div>
    )
}
const styles={
    cont:{
        marginLeft: '260px'
      },
      form:{
        padding: '10px'
      },
      btn:{
        backgroundColor: 'black',
        color: 'white',
        width: '1050px',
        height: '40px',
        paddingLeft: '10px',
        borderRadius: '15px',
        marginTop: '10px'
      }
}

export default MyAccount;