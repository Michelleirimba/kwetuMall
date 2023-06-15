import React,{useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import publicApi from '../api/publicApi';
import DeleteIcon from '@mui/icons-material/Delete';

const AddProductModal = ( {productData, setProductData, createProduct})=> {
    const [show, setShow] = useState(false);
    const[categories, setCategories]= useState([]);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getCategories= async() =>{
        const{ data}= await publicApi.get('/categories/')
        console.log(data)
        setCategories(data.data)
     }

     const saveFiles= (e) =>{
       let imgArr = [];
       let images= e.target.files;
       for(let i = 0; i < images.length; i++){
        imgArr= [...imgArr, images[i]];
       }
       setProductData({...productData, images: imgArr})
     }

     
     useEffect(()=>{
        getCategories()
     },[])

  
    return (
      <>
        <button style={styles.btn}  onClick={handleShow}>Add product</button>
  
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={createProduct}>
                <Row className='mb-3'>
                    <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={productData.name}
                    onChange={(e)=> setProductData({...productData, name:e.target.value})}/>
                    </Col>
                    <Col>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file'
                    onChange={(e)=> setProductData({...productData, image:e.target.files[0]})}/>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                    <Form.Label>Images</Form.Label>
                    <Form.Control type='file' multiple
                    onChange={(e)=> saveFiles(e)}/>
                    </Col>
                    <Col>
                    <Form.Label>Buying Price</Form.Label>
                    <Form.Control type='number' value={productData.buyingPrice}
                     onChange={(e)=> setProductData({...productData, buyingPrice:e.target.value})}/>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Form.Label>Selling Price</Form.Label>
                    <Form.Control type='number' value={productData.price}
                     onChange={(e)=> setProductData({...productData, price:e.target.value})}/>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type='number' value={productData.stock}
                     onChange={(e)=> setProductData({...productData, stock:e.target.value})}/>
                    </Col>
                    <Col> 
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example"
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
                          <Form.Control  as='textarea' type="text"
                          onChange={(e)=> setProductData({...productData, description: e.target.value})} />
                      </Form.Group>
                      
                      <button style={{...styles.btn,...styles.submitBtn}}>Submit</button>
              </Form>
              </Modal.Body>
        </Modal>
      </>
    );
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

export default AddProductModal;