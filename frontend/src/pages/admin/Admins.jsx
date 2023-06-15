import React,{useState, useEffect} from 'react';
import adminApi from '../../api/adminApi';
import Sidenav from './Sidenav';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAdmin from '../../components/EditAdminModal';

function Admins() {
    const [admins, setAdmins] =useState([]);
    const[adminData, setAdminData]= useState({firstName: '', lastName: '', email: '', phoneNumber: ''})

    const getAdmins =async()=>{
         const {data} = await adminApi.get('/admin');
         console.log(data)
         setAdmins(data.data)
    }
    const deleteAdmin= async(id)=>{
        const {data} = await adminApi.post(`/admin/delete/${id}`)
        console.log(data)
        if(data.message === 'Admin deleted successfully!'){
          setAdmins(admins.filter((admin)=> admin._id !== id))
        }
    }
    const updateAdmin = async(e)=>{
        e.preventDefault()
        const {data} = await adminApi.post(`/admin/update/${adminData._id}`,adminData)
        console.log(data)
        setAdmins(admins.map((admin)=>{
           if(admin._id=== data.data._id){
            return data.data
           }else{
            return admin
           }
        })
        )
    }
    useEffect(()=>{
        getAdmins()
    },[])
    return(
        <div>
            <Sidenav/>
            <div style={styles.table}>
            <h3 style={styles.text}>Admins</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        admins.map((admin)=>{
                            return(
                                <tr key={admin._id}>
                                    <td>{admin.firstName}</td>
                                    <td>{admin.lastName}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.phoneNumber}</td>
                                    <td>
                                    <EditAdmin 
                                    id={admin._id }
                                    adminData={adminData}
                                    setAdminData={setAdminData}
                                    updateAdmin={updateAdmin}/>
                                    <DeleteIcon onClick={()=>deleteAdmin(admin._id) }/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </div>
        </div>
    )
}
const styles={
    table:{
        marginLeft: '260px'
    },
    text:{
        fontSize: '20px',
        fontWeight: '300'
    }
}


export default Admins