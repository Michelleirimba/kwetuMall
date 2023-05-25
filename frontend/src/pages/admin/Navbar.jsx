import React, {useState, useEffect} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import privateApi from '../../api/privateApi';
import { useNavigate } from 'react-router-dom';

function Navbar () {
    const navigate = useNavigate();
    const[count, setCount]= useState(0);
    const getItemsCount = async()=>{
        try {
           const {data} = await privateApi.get('/cart/items/count')
           console.log(data);
           setCount(data.number)
        } catch (error) {
            console.log(error.message)
        }
         
    }
    useEffect(()=>{
        getItemsCount()
    },[])
    return(
        <div style={styles.navBar}>
           <h2 style={styles.text1} onClick={()=>{navigate('/')}}>Kwetumall</h2>
               <div style={styles.icon}>
                    <AccountCircleIcon/>
                    <ShoppingCartIcon style={styles.icon2} onClick={()=>{navigate('/cart')}}/>
                    <p style={styles.num}>{count}</p>
               </div>
        </div> 
    )
} 

const styles={
    navBar:{
        width:'100%',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid gray',
     },
     icon:{
        display: 'flex',
        justifyContent: 'space-between',
        width: '60px',
        marginTop: '15px'
     },
     text1:{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '15px',
        cursor: 'pointer'
     },
     num:{
        borderRadius: '50%',
        backgroundColor: 'black',
        marginTop: '-12px',
        marginLeft: '-10px',
        height: '15px',
        width: '15px',
        fontSize: '10px',
        fontWeight: '500',
        padding: '0',
        textAlign: 'center',
        color: 'white'
     },
     icon2:{
        cursor: 'pointer'
     }
}

export default Navbar;