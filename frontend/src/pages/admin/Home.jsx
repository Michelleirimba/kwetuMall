import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import MoneyIcon from '@mui/icons-material/Money';
import privateApi from '../../api/privateApi';

function Home () {
    const[home, setHome]= useState({});
    const getHome = async()=>{
        const{data} = await privateApi.get('/admin/reports');
        console.log(data)
        setHome(data)
    };

    useEffect (()=>{
        getHome()
    },[])
    return(
      <div>
        <Sidenav/>
        <div style={styles.cont}>
            <Container>
                <Row style={styles.col}>
                    <Col >
                    <div style={styles.profit}>
                       <AttachMoneyIcon style={styles.iconCircle1}/>
                       <p style={styles.text}>Profit<br/>Ksh {home.profit}</p>
                    </div>
                    </Col>
                    <Col>
                    <div style={styles.sales}>
                       <ShoppingBagIcon style={styles.iconCircle2}/>
                       <p style={styles.text}>Sales<br/>{home.sales}</p>
                    </div>
                    </Col>
                </Row>
                <Row style={styles.col2}>
                    <Col >
                    <div style={styles.users}>
                       <PeopleIcon style={styles.iconCircle3}/>
                       <p style={styles.text}>Users<br/>{home.users}</p>
                    </div>
                    </Col>
                    <Col>
                    <div style={styles.sSum}>
                       <MoneyIcon style={styles.iconCircle4}/>
                       <p style={styles.text}>Sales Sum<br/> Ksh {home.salesSum}</p>
                    </div>
                    </Col>
                </Row>
            </Container>
            </div>
      </div>
    )
}
const styles={
    cont:{
        marginLeft: '260px'
    },
    col:{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '30px'
    },
    col2:{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '50px'
    },
    profit:{
        backgroundColor: '#52FFA8',
        height: '150px',
        width: '350px',
        borderRadius: '5px',
        color: 'white ',
        marginTop: '20px',
        textAlign: 'center'
    },
    iconCircle1:{
        borderRadius: '50%',
        backgroundColor: '#52FFA8',
        marginTop: '-20px',
        height: '45px',
        width: '45px',
        fontSize: '15px',
        fontWeight: '500',
        padding: '0',
        textAlign: 'center',
        color: 'black'
    },
    text:{
        fontSize: '25px',
        // textAlign: 'center'
    },
    sales:{
        backgroundColor: '#3C64A9',
        height: '150px',
        width: '350px',
        borderRadius: '5px',
        color: 'white ',
        marginTop: '20px',
        textAlign: 'center'
    },
    iconCircle2:{
        borderRadius: '50%',
        backgroundColor: '#3C64A9',
        marginTop: '-20px',
        height: '45px',
        width: '45px',
        fontSize: '15px',
        fontWeight: '500',
        padding: '0',
        textAlign: 'center',
        color: 'black'
    },
    users:{
        backgroundColor: '#2E321F',
        height: '150px',
        width: '350px',
        borderRadius: '5px',
        color: 'white ',
        marginTop: '20px',
        textAlign: 'center'
    },
    iconCircle3:{
        borderRadius: '50%',
        backgroundColor: '#2E321F',
        marginTop: '-20px',
        height: '45px',
        width: '45px',
        fontSize: '15px',
        fontWeight: '500',
        padding: '0',
        textAlign: 'center',
        color: 'black'
    },
    sSum:{
        backgroundColor: '#7C3295',
        height: '150px',
        width: '350px',
        borderRadius: '5px',
        color: 'white ',
        marginTop: '20px',
        textAlign: 'center'
    },
    iconCircle4:{
        borderRadius: '50%',
        backgroundColor: '#7C3295',
        marginTop: '-20px',
        height: '45px',
        width: '45px',
        fontSize: '15px',
        fontWeight: '500',
        padding: '0',
        textAlign: 'center',
        color: 'black'
    },
}

export default Home;