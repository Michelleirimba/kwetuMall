import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EditIcon from '@mui/icons-material/Edit';
import publicApi from '../api/publicApi';
import DeleteIcon from '@mui/icons-material/Delete';


const EditProductsModal=({productData, setProductData, name, buyingPrice, price, stock, description, 
    category, id, updateProduct})=>{
    const [show, setShow] = useState(false);
    const[categories, setCategories]= useState([]);
    const getCategories= async() =>{
        const{ data}= await publicApi.get('/categories/')
        console.log(data)
        setCategories(data.data)
     }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        getCategories()
    },[])
  
    return (
      <>
        <EditIcon onClick={()=>{
          setProductData({name: name, buyingPrice: buyingPrice,price: price, stock: stock, 
            description: description, category: category, id: id})
          handleShow()
        }
    }/>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={updateProduct}>
                <Row className='mb-3'>
                    <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={productData.name}
                    onChange={(e)=>setProductData({...productData, name:e.target.value})}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Buying Price</Form.Label>
                    <Form.Control type='number' value={productData.buyingPrice || 0}
                    onChange={(e)=>setProductData({...productData, buyingPrice:e.target.value})}/>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Form.Label>Selling Price</Form.Label>
                    <Form.Control type='number' value={productData.price}
                    onChange={(e)=>setProductData({...productData, price:e.target.value})}/>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type='number' value={productData.stock}
                    onChange={(e)=>setProductData({...productData, stock:e.target.value})}/>
                    </Col>
                     <Col> 
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example" value={productData.category[0]}
                   onChange={(e)=> setProductData({...productData, category:[...productData.category, e.target.value]})}>
                   <option></option>
                   {
                       categories.map((category)=><option key={category._id}
                        value= {category.name}>{category.name}</option>)
                   }
                    </Form.Select>
                    </Col> 
                </Row> 
                <div style={styles.delete}>
                     <p>
                        {
                            productData.category.map((category)=> category+ ' ' )
                        }
                      </p>
                      {
                        productData.category.length > 0 ?
                        <DeleteIcon onClick={()=> setProductData({...productData, category:[]})}/>
                        :null
                      }
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Description</Form.Label>
                          <Form.Control  as='textarea' type="text" value={productData.description}
                    onChange={(e)=>setProductData({...productData, description:e.target.value})}/>
                      </Form.Group>
                      
                      <button style={{...styles.btn,...styles.submitBtn}}>Submit</button>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </>
    )
}

const styles={
    btn:{
        background: '#000',
        color: '#fff',
        borderRadius: '10px',
        width: '200px',
        border: 'none',
        padding: '10px',
        margin: '10px 0'
    },
    submitBtn: {
        width: '100%'
    },
    delete:{
        display: 'flex'
      }
}

export default EditProductsModal;