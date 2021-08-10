import styled, { css } from "styled-components";
import { color } from "../style/variable.js";

export const Logo = styled.div`
  width: 100%;
  height: 60px;
  background: linear-gradient(90deg, #21007e 0%, rgb(229, 30, 182) 100%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 30px 0 2vh;
  background: url(/static/images/logo-dark.png) no-repeat #430588;
  background-size: contain;
  border-radius :8px;
  background-position: 5%;
  ${(props) =>
    (props.small &&
      css`
        width: 200px;
      `) ||
    (props.medium &&
      css`
        width: 300px;
      `)}
`;

export const Container = styled.div`
  margin: 10px auto 0;
  width: 95%;
  height: calc(100vh - 80px);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  padding: 0 20px 50%;
  background-color: #fff;
  border-radius: 20px 20px 0 0 ;

  ${(props) =>
    props.nobg &&
    css`
      background: transparent !important;
      margin-top: 0px;
      border: none;
    `}

  ${(props) =>
    props.homepage &&
    css`
      height: 105vh;
      margin-top: -1vh;
    `}

    

  ${(props) =>
    props.footer &&
    css`
      background: transparent !important;
      margin-top: 0px;
      border: none;
      box-shadow: none;
      padding: 0 20px 0;
    `}
`;

export const InstitutionContent = styled.div``;

export const InstitutionForm = styled.form`
  width: 100%;
  font-size: 1.85rem;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  margin-top: 5vh;
  padding-right: 30px;

  fieldset {
    border: 1px solid #db8018;
    color: #db8018;
    margin-bottom: 30px;
    border-radius: 15px;
    padding: 0 40px 10px;
    width: 100%;
    height: 120px;

    &.active {
      border-color: #000;
      border-width: 5px;
      box-shadow: 1px 20px 35px -10px #00000094;
      color: #333;
    }

    legend {
      display: block;
      width: 100%;
      max-width: 100%;
      margin-bottom: 0;
      padding: 0;
      color: inherit;
      font-size: 1.95rem;
      line-height: inherit;
      white-space: nowrap;
    }

    input {
      border: none;
      background: transparent;
      width: 100%;
      text-align: center;
      padding: 0px 50px 5px;
      margin-top: -15px;
      box-sizing: border-box;
      border-radius: 27px;
      font-size: 3.5rem;
      color: #333;
      letter-spacing: 10px;
      box-shadow: none !important;
    }
  }

  ${(props) =>
    props.type === "big" &&
    css`

      fieldset {
        padding: 0 40px 0px;
    
        legend {
          margin-bottom: 0.35em;
        }
    
        input {
          padding: 0px 50px 5px;
          margin-top: -30px;
          font-size: 4.6rem;
        }
    `}
`;

export const CategoriesLists = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  padding: 0;
  list-style: none;
  border-radius: 10px;
  width: 100%;
  margin: -0.5vh auto 0px;
`;

export const CategoryName = styled.span`
  display: block;
  font-size: 1.05rem;
  text-transform: uppercase;
  font-weight: 900;
  padding: 10px 10px;
  margin-top: 0px;
  margin-bottom: 15px;
  background-color: #00000021;
  color: #464646;
  white-space: nowrap;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -10px;
  box-sizing: border-box;
`;

export const CategoryLogo = styled.div`
  width: 70px;
  height: 70px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: -10px;
  left: -10px;
  filter: drop-shadow(7px 6px 8px rgba(0, 0, 0, 0.6));

  ${(props) =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}
`;

export const CategoryItem = styled.li`
  display: block;
  cursor: pointer;
  text-align: center;
  background: linear-gradient(-205deg, #ffffff, #e6e6e6);
  padding: 5px 0 60px;
  border-radius: 7px;
  position: relative;
  min-height: 170px;

  &:nth-child(1) {
    grid-area: 2 / 1 / 3 / 2;
  }
  &:nth-child(2) {
    grid-area: 2 / 2 / 3 / 3;
  }
  &:nth-child(3) {
    grid-area: 2 / 3 / 3 / 4;
  }
  &:nth-child(4) {
    grid-area: 2 / 4 / 3 / 5;
  }
  &:nth-child(5) {
    grid-area: 2 / 5 / 3 / 6;
  }
  &:nth-child(6) {
    grid-area: 1 / 2 / 2 / 3;
  }
  &:nth-child(7) {
    grid-area: 1 / 3 / 2 / 4;
  }
  &:nth-child(8) {
    grid-area: 3 / 3 / 4 / 4;
  }
  &:nth-child(9) {
    grid-area: 3 / 4 / 4 / 5;
  }
`;



export const InstitutionLogo = styled.img`
  display: block;
  margin: -15px auto -55px;
  width: 60%;
  max-width: 70%;
  position: relative;
  top: 20px;
`;

export const InstitutionLogos = styled.div`
  ${(props) =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}

  width: 100%;
  background-color: #d2d2d25e;
  height: 170px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  margin: -35px auto -35px;
  border-radius: 12px;

  ${(props) =>
    props.queryresult &&
    css`
      height: 170px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      margin: 0;
      width: 7vw;
      position: absolute;
      right: 0vw;
      top: -7vh;
      background-color: transparent;
    `}
`;

export const InstitutionName = styled.span`
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 900;
  padding: 10px 10px;
  margin-top: 0px;
  margin-bottom: 15px;
  padding: 10px 20px;
  background-color: #00000021;
  color: #464646;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -10px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
`;

export const Institution = styled.li`
  display: block;
  cursor: pointer;
  text-align: center;
  background: linear-gradient(-205deg, #ffffff, #e6e6e6);
  padding: 5px 0 40px;
  border-radius: 7px;
  position: relative;

  &:active {
    background: linear-gradient(-205deg, #000, #000);

    ${InstitutionName} {
      background-color: #fff;
      color: #000;
    }
  }

  &:nth-child(1) {
    grid-area: 2 / 1 / 4 / 3;

    ${InstitutionLogo} {
      width: 40%;
      top: 60px;
    }
  }
  &:nth-child(2) {
    grid-area: 2 / 3 / 3 / 5;

    ${InstitutionLogo} {
      width: 35%;
      margin: -1px auto 15px;
      top: -5px;
    }
  }
  &:nth-child(3) {
    grid-area: 3 / 3 / 4 / 5;

    ${InstitutionLogo} {
      width: 35%;
      top: 3px;
    }
  }
  &:nth-child(4) {
    grid-area: 2 / 5 / 3 / 6;
  }
  &:nth-child(5) {
    grid-area: 3 / 5 / 4 / 6;
  }
  &:nth-child(6) {
    grid-area: 1 / 1 / 2 / 2;
  }
  &:nth-child(7) {
    grid-area: 1 / 2 / 2 / 3;
  }
  &:nth-child(8) {
    grid-area: 1 / 3 / 2 / 4;
  }
  &:nth-child(9) {
    grid-area: 1 / 4 / 2 / 5;
  }
  &:nth-child(10) {
    grid-area: 1 / 5 / 2 / 6;
  }
  &:nth-child(11) {
    grid-area: 4 / 1 / 5 / 2;
  }
  &:nth-child(12) {
    grid-area: 4 / 2 / 5 / 3;
  }
  &:nth-child(13) {
    grid-area: 4 / 3 / 5 / 4;
  }
  &:nth-child(14) {
    grid-area: 4 / 4 / 5 / 5;
  }
  &:nth-child(15) {
    grid-area: 4 / 5 / 5 / 6;
  }
`;

export const InstitutionList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 2px;
  padding: 0;
  list-style: none;
  width: 100%;
  margin: 0.5vh auto 0.5vh;

  &.big{
    
  }
  &.small{
    grid-column-gap: 10px;
    grid-row-gap: 20px;

    ${Institution}{
      padding: 5px 0 15px;
    }
  }

  &.category{
    margin-top: -150px;
    ${Institution}{
      
       &:nth-child(1) {
        padding: 0px 0 5px;
        ${InstitutionLogo} {
          margin: 15px auto 15px;
          width: 60%;
          top: 0px;
        }
      }
      &:nth-child(2) {
        ${InstitutionLogo} {
          
        }
      }
      &:nth-child(3) {

        ${InstitutionLogo} {
          
        }
      }

    }

  }
`;

export const Content = styled.div`
  text-align: center;
  margin-top: 12%;
`;

export const Title = styled.h1`
  text-transform: uppercase;
  color: ${color.bg1};

  ${(props) =>
    props.big &&
    css`
      margin: -15vh 0 3vh;
      font-size: 3.5rem;
      box-shadow: 0px 15px 25px -20px #00000045;
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
  

  ${(props) =>
    props.institution &&
    css`
      color: #fff;
      font-size: 1.85rem;
      font-weight: 900;
      text-align: right;
      position: absolute;
      right: 40px;
      top: -2vh;
      margin-top : 65px;
      letter-spacing: 3px;
      z-index: 15;
    `}

    ${(props) =>
    props.queryresult &&
    css`
      color: #666;
      font-size: 1.45rem;
      font-weight: 900;
      text-align: left;
      position: absolute;
      right: 40px;
      top: 0.5vh;
      z-index: 15;
      display: flex;
      //width: 30vw;
      line-height: 20px;
      padding-right: 10vw;
      white-space: nowrap;
    `}
`;
export const Article = styled.p`
  text-align: justify;
  font-size: 1.4764rem;
  font-weight: 500;
  line-height: 2.5rem;
  padding: 0 5vw;

  ${(props) =>
    props.institution &&
    css`
      font-size: 1.45rem;
      letter-spacing: -0.5px;
      font-weight: 600;
      position: relative;
      padding: 20px 40px 30px;
      color: #646464;
      border-right: 0;
      z-index: 50;
      left: -35px;
      margin: -2vh 0 -5vh;
    `}
`;

export const Button = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  background-color: ${color.bg1};
  color: #fff;
  border-radius: 7px;
  padding: 15px 100px;
  font-size: 1.535rem;
  text-transform: uppercase;
  font-weight: 900;
  white-space: nowrap;
  top: 15px;
  margin-right: -20px;
  margin-left: -20px;

  &:active {
    background-color: #ccc;
    color: #000;
  }

  ${(props) =>
    props.section === "allInstitution" &&
    css`
      background-color: ${color.bg1};
      right: 0;
      width: 40%;
    `}

  ${(props) =>
    props.section === "query" &&
    css`
      background-color: ${color.bg1};
      padding: 20px 100px;
      position: relative;
      width: 97%;
      margin-top: -15px;
      left: 15px;

      &:active {
        background-color: ${color.footerBg};
      }
    `}

  ${(props) =>
    props.position === "left" &&
    css`
      float: left;
      left: 0;
      margin-right: 20px;
    `}

  ${(props) =>
    props.position === "right" &&
    css`
      float: right;
      margin-left: 40px;
    `}

    ${(props) =>
    props.position === "center" &&
    css`
      float: none;
      margin: 0 auto;
      left: calc(50% - 13vw);
    `}


    ${(props) =>
    props.payment &&
    css`
      background-color: ${color.bg1};
      padding: 15px 100px;
      top: 15px;

      &:active {
        background-color: #ccc;
        color: #000;
      }
    `}

    ${(props) =>
    props.type === "oneshot" &&
    css`
      margin-top: 2.5vh;
      display: inline-block;
      color: #333;
  cursor: pointer;
  margin-right: 25px;
  border-radius: 7px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  border: 2px solid #04040430;
  border-bottom-width: 5px;
  box-shadow: 0px -17px 25px -25px #00000085;

    `}
`;

export const AlphanumericContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: -1.5vh;
  margin-bottom: 3vh;

  ${InstitutionLogos} {
    margin-left: -5px;
    grid-area: 1 / 5 / 2 / 7;
    top: 2vh;
    position: relative;
    z-index: 50;
    border-radius: 10px;
    //box-shadow: inset -15px 15px 45px -30px #0000008f;
    height: 20vh;
    background-color: transparent;
    right: -7.5vw;
  }
  ${Article} {
    grid-area: 1 / 1 / 2 / 5;
  }
  ${InstitutionForm} {
    grid-area: 2 / 1 / 5 / 7;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 5%;
    margin-top: 1.5vh;
    margin-bottom: 11vh;

    input {
      font-size: 1.95rem;
      letter-spacing: 2px;
      margin: 0 0 20px 050px !important;
      padding-left: 5px;
      width: 125%;
      line-height: 0px;
      left: -85px !important;
      top: -5px;
      margin-top: -50px !important;
      position: relative;
      border-radius: 0;
    }
  }
  ${Button} {
    grid-area: 4 / 3 / 5 / 5;
    position: relative;
    top: -55%;
  }
`;

export const QueryResult = styled.ul`
  margin: 5vh 0 0;
  padding: 0;
  list-style: none;
`;
export const Query = styled.li`
  display: flex;
  width: 100%;
  flex-basis: auto;
  flex-wrap: nowrap;
  text-align: center;
  border-bottom: 1px solid #3333338a;
  padding: 18px 0;
  font-size: 1.42rem;

  .selected {
    background: red !important;
  }

  ${(props) =>
    props.className === "selected" &&
    css`
      background: #2f2f2f !important;
      color: #fff;
    `}

  &:nth-child(odd) {
    background-color: #f2f2f2c9;
    box-shadow: 3px 13px 25px -15px #0000003b;
  }

  &:nth-child(even) {
    background-color: #00000008;
    box-shadow: 3px 13px 25px -15px #0000003b;
  }
`;

export const QR = styled.strong`
  position: relative;
  width: 100%;
  font-weight: 600;

  &:first-child {
    width: 20%;
  }

  ${(props) =>
    props.tl &&
    css`
      &:after {
        content: "\u20BA";
        margin-left: 5px;
        font-weight: 200;
      }
    `}
`;

export const QueryHead = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 2px;
  width: 100%;
  flex-basis: auto;
  flex-wrap: nowrap;
  text-align: center;
  padding-left: 5%;
`;
export const QH = styled.li`
  width: 100%;
  display: block;
  background-color: #333333b8;
  color: #fff;
  padding: 10px 9px 10px;
  white-space: nowrap;
  font-size: 1.32rem;
  text-transform: uppercase;
  border-radius: 5px;
`;
export const TotalCount = styled.h3`
  display: block;
  color: #252525;
  text-align: right;
  font-size: 2.6rem;
  position: relative;
  float: right;
  width: 45vw;
  top: 30px;
  padding-right: 4vw;
  border-bottom: 1px solid #333;

  &:before {
    content: "FATURA TUTARI  : ";
    position: absolute;
    left: 0;
    top: 0;
    font-weight: 500;
  }

  &:after {
    content: "\u20BA";
    position: absolute;
    right: 0;
  }
`;

export const BankList = styled.ul`
  margin: 5vh 0 0;
  padding: 5vh 7vw 0;
  list-style: none;
  gap: 10% 3%;
`;
export const Bank = styled.li`
  display: inline-block;
  cursor: pointer;
  float: left;
  width: 24vw;
  margin-right: 25px;
  height: 25vh;
  border-radius: 7px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  border: 2px solid #04040430;
  border-bottom-width: 5px;
  box-shadow: 0px -17px 25px -25px #00000085;

  &:nth-child(3){
    margin-right:0;
  }

  &:active {
    border-color: #212121;
    box-shadow: 0px -1px 25px -5px #000;
    border-top-width: 5px;
    filter: grayscale(1);
  }

  ${(props) =>
    props.name &&
    css`
      background-image: url(/static/images/bank/${props.name}.png);
    `}
`;

export const PaymentOptionsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px 10px;
  width: 100%;
  list-style: none;
  margin: -13vh 0 0;
  padding: 0;
  border-radius: 7px;
`;
export const PaymentOption = styled.li`
background: #fff;
height: 160px;
border: 1px solid #3336;
border-radius: 7px;
font-size: 1.65rem;
position: relative;
padding-top: 60px;

  &:before{
    content: attr(data-title);
    position: absolute;
    border-radius: 7px;
    left: 0;
    top: 0;
    z-index: 5;
    font-size: 2rem;
    width: 100%;
    background-color: ${color.bg1};
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
  }

  &.selected {
    border-color: #5a5a5a;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 1px 5px 25px -15px #000;
  }
`;

