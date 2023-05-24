import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';

function Navbar () {
    return(
        <div style={styles.navBar}>
           <h2 style={styles.text1}>Kwetumall</h2>
               <div style={styles.icon}>
                    <AccountCircleIcon/>
                    <ShoppingCartIcon/>
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
        marginTop: '15px'
     },
}

export default Navbar;