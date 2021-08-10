import React, { useEffect, useState } from "react";
import {
  Container,
  Logo,
  Content,
  Title,
  Button,
  PaymentOptionsList,
  PaymentOption,
} from "../components/components";
import cn from "classnames";
import Footer from "../components/components/footer";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { BasketSelector, redirectStep, setInstallationNumber } from "../slices/basket";
import { fetchPosRates, posRatesSelector } from "../slices/posRates";

function ChooseInstallmentPage() {

  const { selectedItemsStore, redirect, selectedBkmId, selectedInstallationNumber } = useSelector(BasketSelector);
  const { posRates } = useSelector(posRatesSelector);
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState(null);
  let dispatch = useDispatch();
  let history = useHistory();
  console.log({ selectedItemsStore, posRates, selectedBkmId, redirect, selectedInstallationNumber});
  let invoiceAmount = 0;
  useEffect(() => {
    dispatch(redirectStep());
    if (selectedItemsStore.length > 0) {
      selectedItemsStore.map(selectedItem => { invoiceAmount += selectedItem.total_amount })
    }
    if (posRates.hasOwnProperty('result')) {
      const selectedBkmPostRates = posRates.result.banks.filter(function (bank) { return bank.id === selectedBkmId })
      if (selectedBkmPostRates.length > 0 && invoiceAmount > 0) {
        let tempTableData = [];
        selectedBkmPostRates[0].rates.map(rate => {
          let temp = {};
          temp['key'] = rate.installment;
          temp['value'] = ((parseFloat((rate.sales_ratio * invoiceAmount) / 100) + parseFloat(invoiceAmount)) / parseFloat(rate.installment)).toFixed(3);
          temp['total'] = (parseFloat(rate.sales_ratio * invoiceAmount) / 100 + parseFloat(invoiceAmount)).toFixed(3);
          tempTableData.push(temp);
        });
        setTableData(tempTableData);
      }
    }
    return () => {
      dispatch(redirectStep());
    };
  }, []);
  function setSelectedInstallment(key) {
    setSelected(key);
    dispatch(setInstallationNumber({ installationNumber: key }))
  }

  useEffect(() => {
    if (redirect && selectedItemsStore.length > 0 && selectedBkmId > 0 && selectedInstallationNumber > 1) {
      history.push('/paymentsummary')
    }
  }, [redirect]);
  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "",
      dataIndex: "val",
      key: "val",
    },
  ];
  return (
    <Container nobg>
      <Logo />

      <Content>
        <Title queryresult>
          {/*  <InstitutionLogos queryresult src={data.logo} />*/}
          {/* {data.name} */}
        </Title>
        <PaymentOptionsList>
          {
            tableData.map(data => {
              if (data.key > 1) {
                return <PaymentOption
                  className={cn(selected === data.key && "selected")}
                  onClick={() => setSelectedInstallment(data.key)}
                  data-title={`${data.key} TAKSİT`}
                >
                  {data.value} x {data.key} <br /> {data.total} &#8378;
                </PaymentOption>
              }
            }
            )

          }
        </PaymentOptionsList>
      </Content>

      <Footer>
        <Button position="left" onClick={() => history.goBack()}>Geri</Button>
        {/* <Button position="right">Devam</Button> */}
      </Footer>
    </Container>
  );
}

export default ChooseInstallmentPage;
