import React, {useState, useEffect} from 'react';
import publicApi from '../../api/publicApi';
import Sidenav from './Sidenav';
import AddPickupPointModal from '../../components/AddPickupPointModal';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPickupPointModal from '../../components/EditPickupPointModal';

function PickupPoint() {
    const [pickupPoints, setPickupPoints]= useState([]);
    const [pickupPointsData, setPickupPointsData]= useState({location:'', name:''})
    const getPickupPoints= async ()=>{
        const {data}= await publicApi.get('/pickuppoints/')
        console.log(data)
        setPickupPoints(data.data)
    }

    const createPickupPoints=async (e)=>{
        e.preventDefault();
        const {data}=await publicApi.post('/pickuppoints/create', pickupPointsData)
        console.log(data)
        if(data.message ==='Created pickupPoint successfully!'){
            setPickupPoints([...pickupPoints,data.data])
        }
    }

    const updatePickupPoints= async (e)=>{
        e.preventDefault()
        const {data}= await publicApi.post(`/pickuppoints/update/${pickupPointsData.id}`, pickupPointsData)
        console.log(data)
        if(data.message === "Updated pickupPoint succesfully!"){
            setPickupPoints(pickupPoints.map((pickupPoint)=>{
                 if(pickupPointsData.id === pickupPoint._id){
                    return data.data;
                 }else {
                   return pickupPoint;
                }
            })
            )
        }
    }

    const deletePickupPoint= async (id)=>{
       const{data}= await publicApi.post(`/pickuppoints/delete/${id}`)
       console.log(data)
    if(data.message === "pickupPoint deleted successfully!"){
       let newPickupPoints= pickupPoints.filter((pickupPoint)=>{
            return pickupPoint._id !== id
        })
        setPickupPoints(newPickupPoints)
    }
   }

    useEffect(()=>{
        getPickupPoints()
    }, [])
       
    return(
        <div>
           <Sidenav/>
            <div style={styles.cont}>
              <h3>PickupPoints</h3>
              <AddPickupPointModal pickupPointsData={pickupPointsData} setPickupPointsData={setPickupPointsData}
               createPickupPoints={createPickupPoints}/>
            {/* <p>bgjkbjk{pickupPointsData.location}</p>
            <input type="text"
            onChange={(e)=> setPickupPointsData({...pickupPointsData, location: e.target.value}) } /> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       pickupPoints.map((pickupPoint) =>{
                        return(
                        <tr key={pickupPoint._id}>
                            <td>{pickupPoint._id}</td>
                            <td>{pickupPoint.location}</td>
                            <td>{pickupPoint.name}</td>
                            <td>
                              <EditPickupPointModal 
                              id={pickupPoint._id}
                              location={pickupPoint.location}
                              name={pickupPoint.name}
                            //   pickupPointsData={pickupPointsData}
                            //   setPickupPointsData={setPickupPointsData}
                              updatePickupPoints={updatePickupPoints}
                              pickupPointsData ={pickupPointsData}
                              setPickupPointsData ={setPickupPointsData}
                              />
                              <DeleteIcon onClick={()=> deletePickupPoint(pickupPoint._id)}/>
                            </td>
                        </tr>
                        )
                       }
                    )}
                </tbody>
                </Table>
            </div>
        </div>
    )
}
const styles={
    cont:{
        marginLeft: '260px'
    }
}

export default PickupPoint;