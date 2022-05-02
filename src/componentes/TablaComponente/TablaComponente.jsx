import React  from "react";
import Table from 'react-bootstrap/Table';
import RegistroTabla from '../RegistroTabla'

const TablaComponente = (props) =>{
    const tr = () => {
        return (
            props.data
            .map((registro) =>
                <RegistroTabla key={registro._id} registro={registro} recargar={recargar} />
            )
        )
    }

    const recargar = (status) =>{
        props.recargar(status);
    }

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