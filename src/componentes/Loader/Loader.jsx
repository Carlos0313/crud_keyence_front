import React from "react";
import style from "./Loader.module.scss"

const Loader = (props) => {
    if(props.active){
        return (
            <div>
                <div className={style.overlay}></div>
                <div className={style.div_loader}>
                    <div className={style.lds_roller}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>Consultando...</div>
                </div>
            </div>
        )
    }
}

export default Loader;