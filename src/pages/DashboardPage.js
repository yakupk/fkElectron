import React from 'react'
import style from "../components/pages.module.scss";
import { useEventListener } from './InstitutionDetailPage';
import { Redirect } from "react-router-dom";

const DashboardPage = ({ history  ,...props}) => {

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

      <span>REKLAM EKRANI</span>

    </section>
  )
}

export default DashboardPage
