import React, { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import {
  Button,
  Container,
  Logo,
  Title,
} from "../components/components";
import Footer from "../components/components/footer";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { QueryResultSelector, fetchPutQueryInfo} from "../slices/institutionQuery";
import { BasketSelector, addItem, redirectStep } from "../slices/basket";
import BlankPage from "./BlankPage";
import style from "../components/pages.module.scss";

function QueryResultPartialPaymentPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { queryResult, hasErrors, partialPaymentResult } = useSelector(QueryResultSelector);
  const { selectedItemsStore, redirect } = useSelector(BasketSelector);

  function saveSelectedItems() {
    let token , totalPrice = 0;
    if (queryResult?.result !== null && queryResult?.result.length > 0 ) {
     token = queryResult.result[0].items.map(item => {
       totalPrice =queryResult?.result[0]?.items[0]?.total_amount;
       return item.token
     });
    }
    if (totalPrice > 0) {
      const obj = {};
      obj['token'] = token;
      obj['amount'] = totalPrice;
      dispatch(fetchPutQueryInfo(obj))
    }
  }

  useEffect(() => {

    dispatch(addItem({ selectedItems: partialPaymentResult }))
  }, [partialPaymentResult]);


  useEffect(() => {
    // TODO
    // selected item sayfaya girildiği zaman boşalt
    dispatch(redirectStep());
    return () => { dispatch(redirectStep()); };
  }, []);

  useEffect(() => {
    console.log('selectedITEM STORE', selectedItemsStore);
    if (redirect && selectedItemsStore.length > 0) {
      history.push('/paymenttypeselection')
    }
  }, [redirect]);

  /* Control  Section */
  // if (!queryResult) return <BlankPage />;
  if (!Object.values(queryResult).length) return history.push('/greeting');
  if (queryResult.result[0].error !== "" || hasErrors) return <BlankPage title={"hata"} message={queryResult.result[0].error} />;
  console.log(queryResult.result[0])
  return (
    <Container className={style.partialPaymentPageQueryResult}>
      <Logo />
      <div className={style.card}>
        <div className={style.top}>
          <h3>{queryResult?.result[0]?.institution?.name} Sonucu </h3>
        </div>
        <div className={style.content}>
          <form className={style.input_container}>
            <div className={style.input_container}>
              <label>Abone Numarası</label>
              <span>{queryResult?.result[0]?.installation_number}</span>
            </div>
            <div className={style.input_container}>
              <label>Abone Adı-Soyadı</label>
              <span >{queryResult?.result[0]?.customer_name ?? "Erişilemedi"}</span>
            </div>
            {queryResult.result[0].hasOwnProperty('items') && queryResult.result[0].items.length > 0 ?
                <>
                <div className={style.input_container}>
                  <label>Mevcut Kredi</label>
                  <span>{queryResult?.result[0]?.items[0]?.balance_credit + " ₺" ?? "Erişilemedi"}</span>
                </div>
                < div className = {style.input_container} >
                    < label > Yedek Kredi</label>
              <span >{queryResult?.result[0]?.items[0]?.extra_balance_credit + " ₺" ?? "Erişilemedi"}</span>
              </div>
              <div className={style.input_container}>
              <label>Yüklenecek Tutar</label>
              <span >{queryResult?.result[0]?.items[0]?.invoice_amount + " ₺" ?? "Erişilemedi"}</span>
              </div>
              <div className={style.input_container}>
              <label>İşlem Ücreti</label>
              <span >{queryResult?.result[0]?.items[0]?.transaction_cost + " ₺" ?? "Erişilemedi"}</span>
              </div>
              <div className={style.input_container}>
              <label>Toplam Tutar</label>
              <span >{queryResult?.result[0]?.items[0]?.total_amount + " ₺" ?? "Erişilemedi"}</span>
              </div>
              <div className={style.input_container}>
              <label>Yüklenecek Kredi</label>
              <span >{queryResult?.result[0]?.items[0]?.calculated_credit + " ₺" ?? "Erişilemedi"}</span>
              </div>
               </>
                : "Sorgulama Sonucu Hata"
            }
          </form>
        </div>
        <div className={style.bottom_content}>
          <p onClick={() => saveSelectedItems()} className={style.ripple}>ÖDEMEYİ TAMAMLA <i className="fa fa-long-arrow-right"/></p>
        </div>
      </div>
      <Footer>
        <Button position="left" onClick={() => history.goBack()}>Geri</Button>

        <Button position="right" payment onClick={() => saveSelectedItems()}>ÖDEMEYİ TAMAMLA</Button>
      </Footer>
    </Container>
  );
}

export default QueryResultPartialPaymentPage;
