import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidenav(){
    const navigate = useNavigate()
    return(
        <div style={styles.cont}>
            <h4 style={styles.heading}>KwetuMall <br/> Admin Panel</h4>
            <div style={styles.dflex}>
            <div>
                <button onClick={()=> navigate('/admin/products')} className='btn1 btn3'>Products
                </button>
                <button onClick={()=> navigate('/admin/categories')} className='btn1 btn3'>Categories
                </button>
                <button onClick={()=> navigate('/admin/pickuppoints')} className='btn1 btn3'>Pickup Points
                </button>
                <button onClick={()=> navigate('/admin/users')} className='btn1 btn3'>Users
                </button>
                <button className='btn1 btn3'>Admins</button>
            </div>
            <div>
                <button className='btn1 btn3'>My Account</button>
                <button className='btn1 btn3'>Log Out</button>  
            </div>
            </div>
        </div>
    )
}

const styles={
    cont:{
       height: '100vh',
       background: 'rgb(0, 0 , 0)',
       width: '250px',
       position: 'absolute',
       top: 0,
       left: 0,
       bottom: 0
    },
    heading: {
        color: '#fff'
    },
    
    dflex:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80%'
    },
    
}

export default Sidenav;