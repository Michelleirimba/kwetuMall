import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';


function ProductDetails() {
   const[number, setNumber]=useState(0)
   const addNum= ()=>{
      setNumber(number+1)
   }
   const minusNum= ()=>{
      setNumber(number-1)
   }
     return(
      <div>
         <Container style={styles.cont}>
           <div style={styles.navBar}>
               <h2 style={styles.text1}>Kwetumall</h2>
               <div style={styles.icon}>
               <AccountCircleIcon/>
               <ShoppingCartIcon/>
            </div>
         </div>
            <Row>
                  <Col>
                     <img style={styles.img1} alt='bag' src='Rectangle 58(3).png'/>
                      <div style={styles.imgs}>
                           <img style={styles.img2} alt='bag1' src='Rectangle 62.png'/>
                           <img style={styles.img2} alt='bag2' src='Rectangle 63.png'/>
                           <img style={styles.img2} alt='bag3' src='Rectangle 64.png'/>
                           <img style={styles.img2} alt='bag4' src='Rectangle 58(3).png'/>
                      </div>
                  </Col>
                  <Col>
                  
                  <h3 style={styles.text2} >Laptop bag</h3>
                  <p style={styles.text3} >
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat libero
                      in semper rhoncus. Proin pretium ex sit amet ligula efficitur, sit amet consectetur
                       leo condimentum. Donec nec bibendum leo. Praesent auctor massa sit amet tortor
                        imperdiet, vel mattis nisi accumsan. Nunc est tortor, euismod eu euismod euismod,
                         eleifend nec lorem. Phasellus et eleifend elit. Vivamus vitae tellus ac nibh 
                         interdum placerat. Fusce vel vehicula urna.
                  </p>
                  <div style={styles.btn1}>
                     <div style={styles.btn3}>
                        <button style={styles.btn2} onClick={addNum}>+</button>
                        <p>{number}</p>
                        <button style={styles.btn2} onClick={minusNum}>-</button>
                    </div>
                  <p style={styles.price}>Ksh 1,500</p>
                  </div>
                  <button style={styles.btn4}>Add to cart</button>
                  </Col>
            </Row>
         </Container>
        </div>
     )
}

const styles={
   cont:{
      height: '100vh'
   },
   navBar:{
      width:'100%',
      height: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid gray'
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
   img1:{
      height: '400px',
      width: '500px',
   },
   imgs:{
      display: 'flex',
      justifyContent: 'space-around',
      width: '500px',
      marginTop: '40px'
   },
   img2:{
      height: '100px',
      width: '100px'
   },
   text2:{
      fontSize: '30px',
      fontWeight: '750',
      letterSpacing: '2px'
   },
   text3:{
      fontSize: '15px',
      fontWeight: '500',
      letterSpacing: '2px'
   },
   btn1:{
      display: 'flex',
      justifyContent: 'space-between'
   },
   btn2:{
      borderRadius: '10px',
      width: '30px',
      height: '30px',
   },
   price:{
      fontSize: '20px',
      fontWeight: '600',
   },
   btn3:{
      width: '100px',
      display: 'flex',
      justifyContent: 'space-between'
   },
   btn4:{
      width: '525px',
      height: '50px',
      backgroundColor: 'black',
      color: '#fff',
      borderRadius: '15px',
      border: 'none'

   }
}
export default ProductDetails;