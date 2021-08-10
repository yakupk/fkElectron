import React from 'react'
import style from "../components/pages.module.scss";
import { useEventListener } from './InstitutionDetailPage';

const UnavailablePage = ({ history  ,...props}) => {

    useEventListener("click", () =>{
        console.log({props})
        if (!props.networkStatus) {
            history.push('/unavailable')
        }else{
            history.push('/greeting')
        }

    } );


    return (
        <section id="reklamEkrani" className={style.dashboardPage}>

            <span>İNTERNET YOK</span>

        </section>
    )
}

export default UnavailablePage
