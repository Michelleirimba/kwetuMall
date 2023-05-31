import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import publicApi from '../../api/publicApi';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUser from '../../components/EditUserModal';

function Users () {
    const[users, setUsers] = useState([]);
    const [userData, setUserData] = useState({firstName: '', lastName: '', phoneNumber: '', email: ''})
    const getUsers = async ()=>{
        const {data} = await publicApi.get('/users')
        console.log(data)
        setUsers(data.data)
    };
    const deleteUser = async (id)=>{
        const{data} = await publicApi.post(`/users/delete/${id}`);
        console.log(data);
        if(data.message === 'User deleted successfully!'){
            setUsers(users.filter((user)=>{
               return user._id !== id
            }))
        }
    }
    const updateUser = async (e)=>{
        e.preventDefault();
        const{data} = await publicApi.post(`/users/update/${userData._id}`, userData);
        console.log(data);
       setUsers (users.map((user)=>{
            if(user._id=== data.data._id){
                return data.data
            }else{
                return user
            }
        }))
    }
    useEffect(()=>{
        getUsers()
    },[]);
    return(
        <div>
            <Sidenav/>
          <div style= {styles.table}>
            <h3 style={styles.text}>Users</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map ((user)=>{
                            return(
                     <tr key= {user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                        <EditUser 
                        id= {user._id}
                        userData ={userData}
                        setUserData = {setUserData}
                        updateUser = {updateUser}
                        />
                        <DeleteIcon onClick= {()=> deleteUser(user._id)}/>
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

export default Users;