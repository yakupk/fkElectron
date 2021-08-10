import {Modal, Table} from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import {
  Container,
  Logo,
  Content,
  Title,
  Button,
} from "../components/components";
import Footer from "../components/components/footer";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosTransaction, setPostTransactionLoading,fetchPosTransactionStatus, BasketSelector, fetchPrePaidCardTransactionStatus,setState } from "../slices/basket";
import { posRatesSelector } from "../slices/posRates";
import BlankPage from "./BlankPage";
import {profileSelector} from "../slices/me";
import CardEffect from "../components/components/CardEffect";
import PrepaidCardPage from "./PrepaidCardPage";

function PaymentSummary() {

  const { selectedItemsStore, selectedBkmId, selectedInstallationNumber, posTransactionResponse, posTransactionStatusResponse,posTransactionLoading } = useSelector(BasketSelector);
  const { posRates } = useSelector(posRatesSelector);
  const {profile}  = useSelector(profileSelector);

  let dispatch = useDispatch();
  let history = useHistory();

  const [visiblePaymentButton, setVisiblePaymentButton] = useState(true);
  const [primaryMessage, setPrimaryMessage] = useState("");
  const [secondaryMessage, setSecondaryMessage] = useState("");

  let invoiceAmount = 0;
  let transactionCost = 0;
  let installmentAmount = 0;
  let totalAmount = 0;
  let posDeviceId = 0;
  console.log({selectedBkmId})
  const selectedBkmDetail =posRates.hasOwnProperty('result') ?   posRates.result.banks.filter(function (b) { return b.id === selectedBkmId }) : {}
  console.log({selectedBkmDetail})
  if ((Object.keys(posRates).length === 0 && posRates.constructor === Object) ||
      (Object.keys(profile).length === 0 && profile.constructor === Object)
    ) {
      history.push('/greeting')
  }

  if(profile.hasOwnProperty('result') && profile.errors =="") {
    posDeviceId = profile.result.reseller.pos_devices[0].id;
  }

  if (selectedItemsStore.length > 0) {
    selectedItemsStore.map(selectedItem => {
      invoiceAmount += selectedItem.invoice_amount;
      transactionCost += selectedItem.transaction_cost;
    })
  }
  if (selectedBkmDetail.length > 0) {
    const selectedRates = selectedBkmDetail[0].rates.filter(function (f) { return f.installment === selectedInstallationNumber })
    installmentAmount = ((parseFloat((selectedRates[0].sales_ratio * invoiceAmount) / 100) + parseFloat(invoiceAmount)) / parseFloat(selectedRates[0].installment)).toFixed(3);
    totalAmount = (parseFloat(selectedRates[0].sales_ratio * invoiceAmount) / 100 + parseFloat(invoiceAmount) +parseFloat(transactionCost))
  }else{
      console.log({invoiceAmount})
    installmentAmount = ((parseFloat((posRates.result.default_rate.sales_ratio * invoiceAmount) / 100) + parseFloat(invoiceAmount)) / parseFloat(posRates.result.default_rate.installment)).toFixed(3);
    totalAmount = (parseFloat(posRates.result.default_rate.sales_ratio * invoiceAmount) / 100 + parseFloat(invoiceAmount) +parseFloat(transactionCost))

  }

  const tableData = [
    {
      key: "Fatura Tutarı",
      val: parseFloat(invoiceAmount).toFixed(3) + `\u20BA`,
    },
    {
      key: "İşlem Bedeli",
      val: transactionCost + `\u20BA`,
    },
    {
      key: "Taksit & Tutar ",
      val: selectedInstallationNumber + ` Taksit  X ` + parseFloat(installmentAmount).toFixed(3) + `\u20BA`,
    },
    {
      key: "Kredi Kartı Komisyonu",
      val: (totalAmount - (invoiceAmount + transactionCost)).toFixed(3) + `\u20BA`,
    },
    {
      key: "Toplam Ödenecek Tutar",
      val: parseFloat(totalAmount).toFixed(3) + `\u20BA`,
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "",
      dataIndex: "val",
      key: "val",
    },
  ];
  async function goBack() {
    console.log("goBack is working");
    await dispatch(setState({
      selectedBkmId:0,
      selectedInstallationNumber:1,
      posTransactionLoading : false,
      posTransactionResponse : {},
      posTransactionError : {},
      posTransactionStatusResponse : {}
    }));

    history.push('/queryresult')
    //history.goBack()
  }

  function proceedPayment() {
    setVisiblePaymentButton(false);
    const obj = {};
    obj['bank_id'] = selectedBkmId;
    obj['installment'] = selectedInstallationNumber;
    obj['pos_device_id'] = posDeviceId;
    obj['tokens'] = []
    selectedItemsStore.map(item => { obj['tokens'].push(item.token) })
    dispatch(fetchPosTransaction(obj))
    setPrimaryMessage("Kredi Kartı İşlemi Gerçekleştiriliyor ....")
  }
  useEffect(() => {
    console.log("Resp Geldi Status 'u sor ", posTransactionResponse)
    if (posTransactionResponse.hasOwnProperty("result")) {
      const obj = {};
      obj['id'] = posTransactionResponse.result.id;
      if (posTransactionStatusResponse.hasOwnProperty("result")) {
        console.log("Loop Döngüsü için response istek ");
        if (posTransactionStatusResponse.result.status === 'initial') {
          setSecondaryMessage(posTransactionStatusResponse.result.turkish_status_message)
          console.log("Döngüye devamm...");
          setTimeout(function () {
            dispatch(fetchPosTransactionStatus(obj))
          }.bind(this), 1000)
        } else {
          console.log("istek bitti.....", posTransactionStatusResponse)
          console.log(posTransactionStatusResponse.result.turkish_status_message)

          if (posTransactionStatusResponse.result.status === 'success') {
            if (Object.values(posTransactionStatusResponse.result.query_info[0].institution).includes('prepaid_card')) {
              // PREPAID CARD -- İŞLEM SONUC OLUMLU
              console.log("işelm prepaid card")
              const obj = {}
              obj.id =
                dispatch(fetchPrePaidCardTransactionStatus())
            } else {
              // FATURA-- İŞLEM SONUC OLUMLU
              dispatch(setPostTransactionLoading({status:false}));
              successPaymentResult()
            }


          } else {
            // İŞLEM SONUC OLUMSUZ
            dispatch(setPostTransactionLoading({status:false}));
            Modal.error({
              className: "kioksModal",
              icon: null,
              title: "Ödeme İşlemi Başarısız.!",
              content: posTransactionStatusResponse.result.turkish_status_message,
              okText: "TAMAM",
              onOk() {
                goBack().then();
              }
            });
          }

        }
      } else {
        console.log("ilk pos Transactioon status response istek ");
        dispatch(fetchPosTransactionStatus(obj))
      }
    }
    //ILK DURUMDAN HATALI GELME DURUMU
    if( Object.keys(posTransactionResponse).length > 0 && posTransactionResponse.errors !=="" && !posTransactionResponse.success) {
      console.log("POS TRANSACTION :",posTransactionResponse)
      dispatch(setPostTransactionLoading({status:false}));
      Modal.error({
        className: "kioksModal",
        icon: null,
        title: "HATA !",
        content: "İşleminizi Şuan Gerçekleşleştiremiyoruz Daha Sonra Tekrar Deneyiniz",
        okText: "TAMAM",
      });

    }
  }, [posTransactionResponse, posTransactionStatusResponse]);

function successPaymentResult(){
  let secondsToGo = 5;
  const modal = Modal.success({
    className: "kioksModal",
    icon: null,
    title: "Başarılı İşlem ",
    content: "İşleminiz Başarıyla Tamamlanmıştır.Fatura Özetiniz Yazdırılıyor.Lütfen Bekleyiniz.!",
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
    console.log("Yönlendirme .....")
    history.push({
      pathname: '/blankpage',
      title: 'İşlem Başarılı' ,
      message: "Fatura Özetiniz Yazdırılıyor.Lütfen Bekleyiniz.!",
    });
  }, secondsToGo * 1000);
}
  return (
    <Container nobg>
              { posTransactionLoading ? ( <> <CardEffect  text1={primaryMessage} text2={secondaryMessage} /></> ): ''}
      <Logo />

      <Content>
        <Title queryresult>
          {/*<InstitutionLogos queryresult src={data.logo} />*/}
          {/* {data.name} */}
        </Title>

        <Table
          className={"payment"}
          showHeader={false}
          pagination={false}
          dataSource={tableData}
          columns={columns}
        />
      </Content>

      <Footer>
        <Button position="left" onClick={() => goBack()}>Geri</Button>

        {
          visiblePaymentButton ? <Button position="right" onClick={() => proceedPayment()} id="paymentButton">ödemeyi Tamamla</Button> : ''
        }

      </Footer>
    </Container>
  );
}

export default PaymentSummary;
