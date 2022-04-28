import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faList} from '@fortawesome/free-solid-svg-icons'
import style from './RegistroTabla.module.scss'
import Swal from 'sweetalert2'

const RegistroTabla = (props) => {
    
    const alertEliminar = () =>{

        Swal.fire({
            title: `¿Deseas Eliminar al usuario ${props.registro.user_name}?`,
            text: "Esta accion no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
            // aqui funcion de eliminar                 
              Swal.fire(
                'Eliminado!',
                '',
                'success'
              )
            }
        })
    }

    return (
        <tr key={props.llave}>
            <td>{props.registro.user_id}</td>
            <td>{props.registro.user_name}</td>
            <td>{props.registro.date}</td>
            <td>{props.registro.punch_in}</td>
            <td>{props.registro.punch_out}</td>
            <td>
                <div className={style.accion_btn}>
                    <FontAwesomeIcon icon={ faTrashCan } onClick={alertEliminar}/>
                    <FontAwesomeIcon icon={ faList }/>
                </div>
            </td>
        </tr>
    )
}


export default RegistroTabla;