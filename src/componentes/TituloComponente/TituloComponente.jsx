import React, { useState } from "react";
import styles from "./TituloComponente.module.scss";

const TituloComponente = (props) => {

    return (
        <div className={styles.titulo}>
            <div>{props.titulo}</div>
            <div className={styles.buttonUpload}>
                <button style={{display: `${props.active ? 'block' : 'none'}`}} className="btn btn-primary">{props.button}</button>
            </div>
        </div>
    )
}

export default TituloComponente;