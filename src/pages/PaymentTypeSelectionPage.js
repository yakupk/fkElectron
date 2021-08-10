import React, { useEffect,useState } from 'react';
import {
  Container,
  Logo,
  Content,
  Title,
  BankList,
  Bank,
  Button,
} from "../components/components";
import {useHistory } from 'react-router-dom'
import Footer from "../components/components/footer";
import {setSelectedBkm, BasketSelector, redirectStep, setInstallationNumber} from "../slices/basket";
import {useSelector,useDispatch} from "react-redux";
import {posRatesSelector ,fetchPosRates} from "../slices/posRates";
import Loading from "../components/components/loading";

function PaymentTypeSelectionPage() {
    let history = useHistory();
    let dispatch = useDispatch();

    const { selectedItemsStore ,redirect,selectedBkmId,selectedInstallationNumber} = useSelector(BasketSelector);
    const { posRates ,loading} = useSelector(posRatesSelector);
    const [oneShotAmount ,setOneShotAmount ] = useState(0);
    useEffect(() => {
        dispatch(redirectStep());
        if(!posRates.hasOwnProperty('result')) {
            dispatch(fetchPosRates())
        }
        return () => {
            dispatch(redirectStep());
        };
    },[]);

    useEffect(()=>{
        console.log({redirect})
        if(redirect && selectedItemsStore.length > 0 && selectedBkmId > 0){
            history.push('/chooseinstallment')
        }
    },[redirect]);

    useEffect(() => {
        if(selectedItemsStore.length >0  && posRates.hasOwnProperty('result')) {
            let tempTotalAmount = 0;
            selectedItemsStore.map(item => {
                tempTotalAmount +=item.total_amount;
            });
            const defaultRate  = posRates.result.default_rate;
            const amount = parseFloat(tempTotalAmount) / parseFloat((100 - defaultRate.sales_ratio) / 100)
            setOneShotAmount((Math.round(amount * 100) / 100).toFixed(2))
        }
    },[posRates,selectedItemsStore])
    useEffect(()=>{
       if(selectedInstallationNumber === 1 && selectedBkmId === null){
           history.push('/paymentsummary')
       }
    },[selectedInstallationNumber,selectedBkmId])
    function selectCardBank(bkmId){
        if(bkmId === null){
            dispatch(setInstallationNumber({ installationNumber:1}))
        }
         dispatch(setSelectedBkm({id:bkmId}));
    }
    function goBack(){
        dispatch({type:'RESET_BASKET_STATE'})
        history.goBack()
    }

    if(loading) return <Loading />;

  return (
    <Container bg="wrrw">
      <Logo />

      <Content>
        <Title big>BANKA SEÇİNİZ</Title>
        <BankList>
            { posRates.result.banks.map(i=>
                <Bank name={i.color}  onClick={()=>selectCardBank(i.id)}/>
            )}
          <Button type="oneshot" onClick={() => selectCardBank(null)}>Tek Çekim Tutarı ({oneShotAmount} ₺)</Button>
        </BankList>
      </Content>

      <Footer>
        <Button position="left" onClick={() =>goBack()}>Geri</Button>
      </Footer>
    </Container>
  );
}

export default PaymentTypeSelectionPage;
