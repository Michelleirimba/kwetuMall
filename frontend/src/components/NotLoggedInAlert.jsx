import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';


function NotLoggedInAlert({show, setShow, path}){
    
    if (show) {
        return (
            <Alert style={styles.pos} variant="danger" onClose={() => setShow(false)} dismissible>
                You are not logged in! Login <Alert.Link href= {path}> here</Alert.Link>
            </Alert>
            );
    }
   
}
const styles={
    pos:{
        position: 'absolute',
        marginLeft: '300px'
    }
}

export default NotLoggedInAlert;