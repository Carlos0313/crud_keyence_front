import React from "react";
import styles from "./TituloComponente.module.scss";

const TituloComponente = (props) => {

    return (
        <div className={styles.titulo}>
            <div>{props.titulo}</div>
        </div>
    )
}

export default TituloComponente;