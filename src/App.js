import React, {useState} from "react";
import TituloComponente from './componentes/TituloComponente';
import TablaComponente from './componentes/TablaComponente';
import SubirArchivo from "./componentes/SubirArchivo/SubirArchivo";
import Loader from './componentes/Loader';

function App() {
  
  const [cargaDatos, setCargaDatos] = useState(false);
  const [tablaDatos, setTablaDatos] = useState(true);
  const [Data, setData] = useState([]);
  const [estadoLoader, setEstadoLoader] = useState(false);

  const uploadDone = (state, datos) =>{
    setEstadoLoader(state);
    setData(datos);
    setCargaDatos(true);
    setTablaDatos(false);
    setEstadoLoader(false);
  }

  return (
    <div>
      <Loader active={estadoLoader}/>
      <TituloComponente titulo="Prueba Crud"/>
      {
        cargaDatos && <TablaComponente data={Data}/>
      }
      {
        tablaDatos && <SubirArchivo successUpload={uploadDone}/>
      }
    </div>
  );
}

export default App;
