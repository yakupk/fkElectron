import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { categoriesSelector } from "../slices/categories";
import {
  fetchQueryResult,
  QueryResultSelector,
  setQueryResult,
} from "../slices/institutionQuery";
import { Col, Row, Modal } from "antd";
import {
  Container,
  Logo,
  InstitutionContent,
  Title,
  AlphanumericContainer,
  Article,
  Button,
  InstitutionLogos,
} from "../components/components";
import Footer from "../components/components/footer";
import InstitutionFormBuild from "../components/components/institutionForm";
import NumPad from "../components/components/numpad";
import Keyboard from "../components/components/keyboard";
import Loading from "../components/components/loading";
import {profileSelector} from "../slices/me";
import BlankPage from "./BlankPage";
import CardEffect from "../components/components/CardEffect";


export function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

const InstitutionDetailPage = ({ card, match }) => {
  const { categories } = useSelector(categoriesSelector);
  console.log('data: ', { card });
  const { loading, queryResult, hasErrors, redirect, reRequest } = useSelector(
      QueryResultSelector
  );
  const {profile} = useSelector(profileSelector);
  const [additionalField, setAdditionalFields] = useState("");
  const [partialAmount, setPartialAmount] = useState("");

  let cardDeviceId = 0 ;
  if(profile.hasOwnProperty('result') && profile.errors ==""){
    if(profile.result.reseller.card_devices !== null){
      cardDeviceId =profile.result.reseller.card_devices[0].id
    }

  }

  let data = categories.result.institution_categories
      .map((item) => item.institutions)
      .flat()
      .find((inst) => {
        return inst.id == match.params.id;
      });
  data =
      data ??
      categories.result.shortcuts.find((i) => {
        return i.id == match.params.id;
      });
  let history = useHistory();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setQueryResult());
    return () => {
      dispatch(setQueryResult());
    };
  }, []);
  useLayoutEffect(() => {
    if(hasErrors){
         Modal.warning({
          className: "kioksModal",
          icon: null,
          title: "HATA !",
          content: "Lütfen doldurulması gereken alanları kontrol ediniz",
          okText: "TAMAM",
        });
    }
  },[hasErrors])
  useEffect(() => {
    if (queryResult.hasOwnProperty("result")) {
      // fatura sonucuna göre gelen iç hatalar
      if(queryResult.result[0].error !== "" && queryResult.result[0].items === null) {
      setFormData("reset")
        return Modal.warning({
          className: "kioksModal",
          icon: null,
          title: "HATA !",
          content: queryResult.result[0].error ?? "Fatura Bulunumadı !",
          okText: "TAMAM",
        });
      }
      const obj = {};
      obj["field1"] = cardDeviceId.toString();
      obj["institution_id"] = parseInt(match.params.id);
      if (
          queryResult.result[0].additional_field !== "" &&
          queryResult.result[0].is_continue
      ) {
        obj["field2"] = queryResult.result[0].additional_field;
        setAdditionalFields(queryResult.result[0].additional_field);
        dispatch(fetchQueryResult(obj));
      }
      if (
          reRequest &&
          queryResult.result[0].error === "" &&
          queryResult.result[0].is_continue
      ) {
        obj["field2"] = additionalField;
        if (partialAmount !==""){
          obj["field3"] = partialAmount;
          setTimeout(
              function () {
                dispatch(fetchQueryResult(obj));
              }.bind(this),
              1000
          );
        }

      }
    }
  }, [reRequest, queryResult]);

  function makeQuery(e) {
    e.preventDefault();
    const obj = {};
    const elements = document.getElementById("QueryForm").elements;
    for (let i = 0; i < elements.length; i++) {
      const item = elements.item(i);
      if (elements.item(i).type === "text") obj[item.name] = item.value.toString();
    }
    obj["institution_id"] = parseInt(match.params.id);
    if (data.category_type === "prepaid_card") {
      if (obj.hasOwnProperty("field3")){
        setPartialAmount(obj["field3"])
      }
      obj["field1"] = cardDeviceId.toString();
    }
    dispatch(fetchQueryResult(obj));
  }

  if (redirect) {
    if (queryResult.hasOwnProperty("result")) {
      const categoryType = queryResult.result[0].institution.category_type;
      if (categoryType === "invoice") history.push("/queryresult");
      if (categoryType === "prepaid_card")
        history.push("/queryresultpartialpayment");
    }
  }
  const inputs = useMemo(
      () => (Array.isArray(data?.inputs) ? data.inputs : []),
      [data]
  );

  const prepaidCard = useMemo(() => {
    if (data.category_type === "prepaid_card")
      return card === "card_on" ? "on" : "off";
    else return false;
  }, [data, card]);


  const [activeInputIndex, setActiveInput] = useState(1);
  const [formData, setForm] = useState({});
  const alphanumeric = inputs.some((i) => i.alphanumeric);
  const prepaidCardInputs =[
    {
      label: "Yüklemek İstediğiniz Tutar",
      max: 4,
      min: 1,
      name: "field3"
    }
  ];
  const activeInput = inputs[activeInputIndex - 1] ?? prepaidCardInputs[activeInputIndex - 1];
  useEffect(
      () =>
          setForm(
              Array(Array.isArray(inputs) ? inputs.length : 0)
                  .fill()
                  .map((_, i) => i + 1)
                  .reduce((obj, key) => ({ ...obj, [key]: "" }), {})
          ),
      [inputs]
  );

  useEventListener("click", () => {
    const getInputs = document.getElementsByTagName("input");
    if (getInputs.length) getInputs[activeInputIndex - 1]?.focus();
  });

  const setFormData = useCallback(
      (char) => {
        if (formData !== undefined && Object.keys(formData).length === 0){
          formData[1] = ""
        }
        if (char === "reset") {
          return setForm({
            ...formData,
            [activeInputIndex]: "",
          });
        }
        if (char === "del") {
         const nums = formData[activeInputIndex];
          if (nums.length > 0) {
            return setForm({
              ...formData,
              [activeInputIndex]: nums.slice(0, -1),
            });
          }
          return nums
        }
        if (
            formData[activeInputIndex] &&
            formData[activeInputIndex]?.length >= activeInput?.max
        )
          return Modal.warning({
            className: "kioksModal",
            icon: null,
            title: "HATA !",
            content: "Yeterince uzun, daha fazla karakter ekleyemezsiniz ",
            okText: "TAMAM",
          });

        setForm({
          ...formData,
          [activeInputIndex]: formData[activeInputIndex] + char,
        });
      },
      [formData, activeInput, activeInputIndex]
  );
  if (!data) return <BlankPage />;
  if (!Object.values(data).length || loading && data.category_type !== "prepaid_card") {
    return <Loading />;
  };
  if (loading && data.category_type === "prepaid_card" && reRequest) {
    return <CardEffect text1={"Sorgulanıyor..."}/>
  }
  if(!(profile.result.reseller.pos_device_status )){
   return <BlankPage title="Sistem Hatasi" message="Pos cihazi şuan için devre dışı.Lütfen daha sonra tekrar deneyiniz."/>;
  }
  return (
      <Container>
        <Logo />
        <InstitutionContent>
          <Title institution>{data.name}</Title>
          {(<>
                {alphanumeric ? (
                    <Row>
                      <Col span={24}>
                        <AlphanumericContainer>
                          <InstitutionLogos src={data.logo} />
                          <Article institution>{data.description}</Article>
                          <InstitutionFormBuild
                              type="big"
                              num={formData}
                              inputs={inputs}
                              activeInputIndex={activeInputIndex}
                              setActiveInput={setActiveInput}
                          />

                          <Button section="query">Sorgula</Button>
                        </AlphanumericContainer>
                      </Col>

                      <Col span={24} className="alphanumeric">
                        <Keyboard
                            setFunc={setFormData}
                            left={!!inputs[activeInputIndex - 1].alphanumeric}
                        />
                      </Col>
                    </Row>
                ) : (
                    <Row>
                      <Col span={17}>
                        <Article institution>{data.description}</Article>
                        <InstitutionFormBuild
                            num={formData}
                            inputs={inputs !== null && inputs?.length > 0  ? inputs :prepaidCardInputs}
                            activeInputIndex={activeInputIndex}
                            setActiveInput={setActiveInput}
                        />

                        <Button
                            section="query"
                            form="QueryForm"
                            onClick={(e) => makeQuery(e)}
                        >
                          Sorgula
                        </Button>
                      </Col>
                      <Col span={7} className="numpad">
                        <InstitutionLogos src={data.logo} />
                        <NumPad setFunc={setFormData} />
                      </Col>
                    </Row>
                )}
              </>
          )}
        </InstitutionContent>

        <Footer>
          <Button position="left" onClick={() => history.push('/greeting')}>
            Geri
          </Button>
        </Footer>
      </Container>
  );
};

export default InstitutionDetailPage;
