import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faList} from '@fortawesome/free-solid-svg-icons'
import style from './RegistroTabla.module.scss'
import Swal from 'sweetalert2'
import axios from "axios";
import {Form,Modal, Button, Row, Col} from 'react-bootstrap';

const RegistroTabla = (props) => {
    const [eliminado, setEliminado] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //inputs
    const [user_id_text, setUser_id_text ] = useState(props.registro.user_id);
    const [user_name_text, setUser_name_text] = useState(props.registro.user_name);
    const [date_text, setDate_text] = useState(props.registro.date);
    const [punch_in_text, setPunch_in_text] = useState(props.registro.punch_out);
    const [punch_out_text, setPunch_out_text] = useState(props.registro.punch_out);

    const alertEliminar = () =>{
        let id_= props.registro._id;
        console.log(id_)
        const url = 'https://api-rest-keyence-prueba.herokuapp.com/api/user/'+id_;    

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
            const result = axios.delete(url);
            console.log(result.data);
            setEliminado(true);
            props.recargar(eliminado);

              Swal.fire(
                'Eliminado!',
                '',
                'success'
              )
            }
        })
    }

    const handleUpdate = ()=>{
        let id_= props.registro._id;
        const url = 'https://api-rest-keyence-prueba.herokuapp.com/api/user/'+id_;

        let data = {
            user_name: user_name_text, 
            date: date_text, 
            punch_in: punch_in_text, 
            punch_out: punch_out_text, 
        }

        const result = axios.put(url, data);
        console.log(result.data);

        setEliminado(true);
        
        props.recargar(eliminado);
        handleClose();

        Swal.fire(
            'Usuario Actualizado',
            '',
            'success'
        )
    }

    return (
        <>
            <tr>
                <td>{props.registro.user_id}</td>
                <td>{props.registro.user_name}</td>
                <td>{props.registro.date.substring(0,10)}</td>
                <td>{props.registro.punch_in}</td>
                <td>{props.registro.punch_out}</td>
                <td>
                    <div className={style.accion_btn}>
                        <FontAwesomeIcon icon={ faTrashCan } onClick={alertEliminar}/>
                        <FontAwesomeIcon icon={ faList } onClick={handleShow}/>
                    </div>
                </td>
            </tr>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de {props.registro.user_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="user_id">
                                <Form.Label>User Id</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.registro.user_id}
                                    onChange = {e => setUser_id_text(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="user_name">
                            <Form.Label>User name</Form.Label>
                            <Form.Control
                                    type="text"
                                    placeholder={props.registro.user_name}
                                    onChange = {e => setUser_name_text(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.registro.date.substring(0,10)}
                                    onChange = {e => setDate_text(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="punch_in">
                                <Form.Label>Punch in</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.registro.punch_in}
                                    onChange = {e => setPunch_in_text(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="punch_out">
                            <Form.Label>Punch out</Form.Label>
                            <Form.Control
                                    type="text"
                                    placeholder={props.registro.punch_out}
                                    onChange = {e => setPunch_out_text(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default RegistroTabla;