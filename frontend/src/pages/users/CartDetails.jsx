import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../admin/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import privateApi from '../../api/privateApi';
import { useParams } from 'react-router-dom';
import Checkout from '../../components/CheckoutModal';

function CartDetails () {
    const {id}= useParams();
    const [cart, setCart]= useState([]);
    const backendUrl =import.meta.env.VITE_APP_BACKEND_URL
    const getCart = async ()=>{
        const {data}= await privateApi.get('/cart/get')
        console.log(data)
        setCart(data.data)
    }

    const deleteCart= async (id)=>{
        const {data}= await privateApi.post(`/cart/delete/${id}`)
        console.log(data)
        if (data.message ==='Deleted cart successfully'){
           let newCart= cart.filter((cartt)=>{
                return cartt.productId !== id
            })
            setCart(newCart);
        }
    }

    const getTotal = ()=>{
        let total = 0
      for(let i=0; i< cart.length; i++){
        let sum = cart[i].product.price * cart[i].number;
        total = total + sum
      }
      return total
    }
    useEffect(()=>{
        getCart();
    },[])
    return(
        <div>
          <Container >
            <Navbar/>
                {
                    cart.map((dta)=>{
                        return(
                       <Row key={dta} >
                          <Col style={styles.row}> 
                            <img style={styles.img} src={backendUrl + dta.product.image}/>
                            <p style={styles.text}>{dta.product.name}</p>
                            <p style={styles.text}>{dta.product.price}</p>
                            <p style={styles.text}>{dta.number}</p>
                            <DeleteIcon onClick={()=> deleteCart(dta.product._id)}/>
                          </Col>
                       </Row>
                            )
                    })
                }
                <p style={styles.price}>Total: Ksh{getTotal()}</p>
                <Checkout/>
          </Container>
        </div>
    )
}

const styles={
    row:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
        width: '700px',
        marginTop: '5px',
        borderRadius: '10px',
        border: '0.5px solid black'
    },
    img:{
        height: '40px',
        width: '90px'
    },
    text:{
        fontSize: '23px',
        color: 'black'
    },
    price:{
        fontSize: '20px',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
    }
}
export default CartDetails;