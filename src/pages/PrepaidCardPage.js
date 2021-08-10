import {Article, Button, InstitutionLogos} from "../components/components";
import CardEffect from "../components/components/CardEffect";
import style from "../components/pages.module.scss";
import {Col, Row} from "antd";
import InstitutionFormBuild from "../components/components/institutionForm";
import NumPad from "../components/components/numpad";
import React from "react";

function PrepaidCardPage({ makeQuery, card, data ,setFormData,setActiveInput, formData}) {
    console.log('data: ', { card, data });
    const prepaidCardInputs =[
        {
            label: "Yüklemek İstediğiniz Tutar",
            max: 4,
            min: 1,
            name: "field1"
        }
    ]
  return (
    <div className={style.prepaidCardPage}>
     {/* <CardEffect
        text1={card === "on" ? "Kart algılandı" : "Lütfen kartınızı takınız"}
        text2={card === "on" ? "Sorgula butonuna basınız" : ""}
      />*/}
        <Row>
            <Col span={17}>
                <Article institution>{data.description}</Article>

                <InstitutionFormBuild
                    num={formData}
                    inputs={prepaidCardInputs}
                    activeInputIndex={"1"}
                    setActiveInput={setActiveInput}
                />
                <Button
                    section="query"
                    form="QueryForm"
                    onClick={(e) => makeQuery(e)}
                    className={style.cardRead}
                >
                    Bakiye Sorgula
                </Button>
            </Col>
            <Col span={7} className="numpad">
                <InstitutionLogos src={data.logo} />
                <NumPad setFunc={setFormData} />
            </Col>
        </Row>

    </div>
  );
}
export default PrepaidCardPage;
