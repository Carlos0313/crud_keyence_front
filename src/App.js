import React, {useState, useEffect} from "react";

import Loader from "./componentes/Loader/Loader";
import SubirArchivo from "./componentes/SubirArchivo/SubirArchivo";
import TituloComponente from "./componentes/TituloComponente/TituloComponente";
import TablaComponente from './componentes/TablaComponente';

import axios from "axios";


function App() {
  const url = 'https://api-rest-keyence-prueba.herokuapp.com/api/';

  // Estados 
  const [loaderState, setLoaderState] = useState({
    active: false,
    mensaje: ''
  });

  const [titleState, setTitleState] = useState({
    active: false,
    titulo: 'Prueba Crud Keyence',
    button: 'Eliminar Datos'
  });

  const [dataUploaded, setDataUploaded] = useState({
    active: true,
    users: []
  });

  const [tablaState, setTablaState] = useState(false);
  const [registrosState, setRegistrosState] = useState([]);

  //Cargar datos
  const uploadData = (data) =>{

    setLoaderState({
      active: true,
      mensaje: 'Subiendo Datos...'
    });

    setDataUploaded({ active: false ,users: data});
  }

  useEffect(() => {
    const saveDataUsers = async () => {
      if(!dataUploaded.active){
        const result = await axios.post(url+'users', {users:dataUploaded.users});
        console.log(result.data);

        setLoaderState({active: false,mensaje: ''});
        setTablaState(true);
      }
    }

    saveDataUsers();

  }, [dataUploaded.users]);


  useEffect(()=>{
    setLoaderState({
      active: true,
      mensaje: 'Consultando Datos...'
    });

    const mostrarAllUsersDB = async () =>{
      const result = await axios.get(url+'/users');
      console.log(result.data);
      if(result.data.users.length > 0){
        setDataUploaded({ ...dataUploaded, active: false });
        setLoaderState({active: false,mensaje: ''});
        setRegistrosState(result.data.users);
        setTablaState(true);
      }else{
        setLoaderState({active: false,mensaje: ''});
        setDataUploaded({ ...dataUploaded, active: true });
        setTablaState(false);
      }
    }

    mostrarAllUsersDB();

  }, [tablaState])

  const recargar = (status)=>{
    setTablaState(status);
  }

  return (
    <div>
      <Loader active={loaderState.active} message={loaderState.mensaje} />
      <TituloComponente titulo={titleState.titulo} button={titleState.button} active={titleState.active} />
      {
        dataUploaded.active && <SubirArchivo dataUpload={uploadData} />
      }
      {
        tablaState && <TablaComponente  data={registrosState} recargar={recargar}/>
      }
    </div>
  );
}

export default App;
