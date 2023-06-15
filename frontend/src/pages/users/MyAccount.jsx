import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from '../admin/Navbar';
import Form from 'react-bootstrap/Form';
import privateApi from '../../api/privateApi';

function MyAccount() {
    const[myData, setMyData]= useState({firstName : '', lastName: '', email: '', phoneNumber: ''})
    const[message, setMessage]= useState(null)
    const getMe =async()=>{
      const{data} = await privateApi.get('/users/getme')
      setMyData(data.data)
       console.log(data)
    };
    const updateUser = async(e)=>{
        e.preventDefault();
        const{data}= await privateApi.post('/users/update/me', myData)
        console.log(data)
        if(data.message ==='Updated user successfully!'){
            setMyData(data.data);
            setMessage('Updated details successfully!')
            setTimeout(()=>{
                setMessage(null)
            },3000)
        }
    }
    useEffect(()=>{
      getMe()
    },[])
    return(
        <div>
            <Container>
               <Navbar/>
               <h3>My Account</h3>
           <Form onSubmit={updateUser} style={styles.form}>
                <Form.Group >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={myData.firstName}
                    onChange={(e)=>setMyData({...myData, firstName:e.target.value})}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={myData.lastName}
                    onChange={(e)=>setMyData({...myData, lastName:e.target.value})}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={myData.email}
                    onChange={(e)=>setMyData({...myData, email:e.target.value})} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='number' value={myData.phoneNumber}
                    onChange={(e)=>setMyData({...myData, phoneNumber:e.target.value})}/>
                </Form.Group>
                <button style={styles.btn}>Submit</button>
                {message? <p>{message}</p> :null}
            </Form>
            </Container>
        </div>
    )
}

const styles={
    form:{
        padding: '20px'
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