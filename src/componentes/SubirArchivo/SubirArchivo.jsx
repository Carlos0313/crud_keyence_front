import React, {useRef, useState} from "react";
import style from "./SubirArchivo.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel} from '@fortawesome/free-solid-svg-icons'
import * as XLSX from "xlsx";

const SubirArchivo = (props) =>{
    const [nombreDocumento, setNombreDocumento] = useState("Click para subir un archivo Xlsx ");
    
    const fileInputRef=useRef();
    
    const cargaDocumento = (e) =>{
        const [file] = e.target.files;
    
        if(file){
            const reader = new FileReader();
            
            //Obtenemos el nombre del documento
            setNombreDocumento(file.name)
            
            reader.onload = (evt) => {
                const str = evt.target.result;
                const wb = XLSX.read(str, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                //Conversion de datos a JSON
                let json = csvAjson(data);
                console.log(json);
                //Mandamos los datos al Back
                props.successUpload(true, json);
            };
            reader.readAsBinaryString(file);
        }
    }

    const csvAjson = (data) =>{
        var array = data.split("\n");
        let result = [];
        let headers_ = array[0].split(",")
        let headers = [];
        for(let i in headers_){
            headers.push(headers_[i].toLowerCase().replace(" ", "_"));
        }

        for (let i = 1; i < array.length - 1; i++) {
            let obj = {}
           
            let str = array[i]
            let s = ''
           
            let flag = 0
            for (let ch of str) {
              if (ch === '"' && flag === 0) {
                flag = 1
              }
              else if (ch === '"' && flag == 1) flag = 0
              if (ch === ',' && flag === 0) ch = '|'
              if (ch !== '"') s += ch
            }
        
            let properties = s.split("|")

            for (let j in headers) {
              if (properties.length > 0 && properties[j].includes(",")) {
                obj[headers[j]] = properties[j].split(",").map(item => item.trim())
              }
              else obj[headers[j]] = properties[j]
            }
            result.push(obj)
        }

        return result;
    }

    return(
        <div className={style.divCampoFile}>
            <div className={style.campoFile} onClick={()=>fileInputRef.current.click()}>
                <FontAwesomeIcon icon={ faFileExcel }/>
                <p>{nombreDocumento}</p>
            </div>
            <input onChange={cargaDocumento} multiple={false} ref={fileInputRef} type='file'hidden id="xlsx" accept=".xlsx"/>
        </div>
    )
}

export default SubirArchivo;