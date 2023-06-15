import React,{useState, useEffect} from 'react';
import publicApi from '../../api/publicApi';
import Sidenav from './Sidenav';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddProductModal from '../../components/AddProductsModal';
import EditProductsModal from '../../components/EditProductsModal';

function Products(){
    const [products, setProducts]= useState ([]);
    const backendUrl= import.meta.env.VITE_APP_BACKEND_URL
    const [productData, setProductData] = useState({
        name:'', image: '', images:[],buyingPrice:'', price:'', stock:'', description:'', category:[]
    })
       const getProducts= async ()=>{
       const{data}=  await publicApi.get('/products/')
       console.log(data)
       setProducts(data.data)
       }

       const createProduct= async(e)=>{
        e.preventDefault();
        let formData= new FormData();
        formData.append('name', productData.name);
        formData.append('image', productData.image);
       for(let i=0;  i<productData.images.length; i++){
        formData.append('images', productData.images[i])
       }
       formData.append('buyingPrice', productData.buyingPrice);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        formData.append('description', productData.description);
        for(let i=0;  i<productData.category.length; i++){
            formData.append('category', productData.category[i]);
           }

           const{data}= await publicApi.post('/products/create', formData);
           console.log(data)
        if(data.message=== 'Product created successfully!'){
            setProducts([...products, data.data])
        }
       };

       const updateProduct= async(e)=>{
        e.preventDefault();
        const {data}= await publicApi.post(`/products/update/${productData.id}`, productData)
        console.log(data)
        if(data.message === "Product updated succesfully!"){
            setProducts(products.map((product)=>{
                if(productData.id ===product._id){
                    return data.data;
                }else{
                    return product;
                }
            }))
        }
    }

       const deleteProduct= async(id)=>{
        const {data}= await publicApi.post(`/products/delete/${id}`)
        console.log(data)
        if (data.message ==='Deleted products successfully'){
           let newProducts= products.filter((product)=>{
                return product._id !== id
            })
            setProducts(newProducts);
        }
       }

       useEffect(()=>{
        getProducts()
       },[])
    return(
        <div>
            <Sidenav/>
            <div style={styles.table}>
                <h3 style={styles.text}>Products</h3>
            <AddProductModal productData= {productData} setProductData={setProductData} 
            createProduct={createProduct} />
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Category</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
             {products.map( (product)=>{
                return(
                <tr key={product._id}>
                <td>
                    <img src={backendUrl + product.image} style={styles.img}/>
                    </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description.substring(0,20)}...</td>
                <td>{product.category}</td>
                <td>
                    <EditProductsModal
                     id={product._id}
                     name={product.name}
                     buyingPrice={product.buyingPrice}
                     price={product.price}
                     stock={product.stock}
                     category={product.category}
                     description={product.description}
                      updateProduct={updateProduct}
                      productData ={productData}
                      setProductData ={setProductData}
                    />
                    <DeleteIcon onClick={()=> deleteProduct(product._id)}/>
                </td>
                </tr>
            )}
            )}
            </tbody>
            </Table>
            </div>
        </div>
    )
}
const styles={
    img:{
        height: '70px',
        width: '80px'
    },
    table:{
        marginLeft: '260px'
    },
    text:{
        fontSize: '20px',
        fontWeight: '300'
    }
}

export default Products;