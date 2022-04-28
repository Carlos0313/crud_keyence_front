import React  from "react";
import styles from "./TablaComponente.module.scss"
import Table from 'react-bootstrap/Table';
import RegistroTabla from '../RegistroTabla'

const TablaComponente = (props) =>{

    const tr = () => (
        props.data
        .map((registro,llave) => 
            <RegistroTabla registro={registro} key={llave}/>
        )
    )

    return (
        <div className="container">
            <Table responsive>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Date</th>
                    <th>Punch In</th>
                    <th>Punch Out</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tr()}
            </tbody>
            </Table>
        </div>
    )
}

export default TablaComponente;