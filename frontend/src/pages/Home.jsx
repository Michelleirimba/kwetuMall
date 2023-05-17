import React, { useEffect, useState }  from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import publicApi from '../api/publicApi';

function Home() {
  const [products, setProducts]= useState([]);
  const backendUrl= import.meta.env.VITE_APP_BACKEND_URL
    const getProducts= async ()=>{
      const {data}= await publicApi.get('/products/')
      console.log(data)
      setProducts(data.data)
    }

    useEffect(()=>{
      getProducts()
    },[]);
  return (
    <div>
      <ShoppingCartIcon style={styles.icon} />
      <h1 style={styles.text}>Kwetumall</h1>
      <Container style={styles.img2}>
        <img style={styles.img1} alt="clothing" src='Rectangle 52.png' />
        <Row xs={1} md={3} lg={4} className="g-4" style={styles.img2}>
          {
          products.map((product)=>{
            return(
          <Col>
            <Card style={styles.card}>
              <Card.Img style={styles.img} variant="top" src={backendUrl + product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description.substring(0, 50)}...
                </Card.Text>
                <div style={styles.text1}>
                  <div style={styles.text2}>Ksh {product.price}</div>
                      <button className="btn">
                        View
                      </button>
                </div>
              </Card.Body>
            </Card>
          </Col>)
          })
          }
          </Row>
      </Container>
    </div>
  );
}

const styles={
 text:{
    color: 'black',
    fontWeight: '500',
    fontSize: 'medium',
    marginLeft: '120px',
 },
 img1:{
    width: '1115px'
 },
 text1:{
  display: 'flex',
  justifyContent: 'space-between'
 },
 img2: {
   paddingTop: '20px',
   marginTop: '-13px'
 },
 icon:{
  height: '20px',
  width: '30px',
  marginLeft: '112px',
  marginTop: '10px'
 },
 text2:{
  fontWeight: '700'
 },
 img:{
  height: '150px'
 },
 card:{
  height: '350px'
 }
}

export default Home