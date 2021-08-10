import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Institution,
  InstitutionList,
  InstitutionLogo,
  InstitutionName,
  Logo,
  Query,
  QueryResult,
  QueryHead,
  QH,
  QR,
  TotalCount,
  Title,
} from "../components/components";
import Footer from "../components/components/footer";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  QueryResultSelector,
  setQueryResult,
} from "../slices/institutionQuery";
import {
  BasketSelector,
  addItem,
  makeEmpty,
  redirectStep,
} from "../slices/basket";
import Loading from "../components/components/loading";
import BlankPage from "./BlankPage";
import style from "../components/pages.module.scss";


function QueryResultPage() {
  let history = useHistory();
  const dispatch = useDispatch();

  const { queryResult } = useSelector(QueryResultSelector);
  const { selectedItemsStore, redirect } = useSelector(BasketSelector);
  const basketItems = useSelector(BasketSelector);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  function calculateTotalPrice() {
    let price = 0;
    let tempSelectedItems = [];
    Array.from(document.getElementsByName("rows")).map((i, k) => {
      if (i.firstChild.getElementsByTagName("input")[0].checked) {
        tempSelectedItems.push(queryResult.result[0].items[k]);
        price += queryResult.result[0].items[k].total_amount;
      }
    });
    setSelectedItems(tempSelectedItems);
    setTotalPrice(price);
  }

  function selectionRow(e) {
    e.preventDefault();
    const checkboxElement = e.target.parentNode.firstChild;
    const checkboxElementInputValue = checkboxElement.getElementsByTagName(
      "input"
    );
    if (checkboxElementInputValue[0] !== undefined) {
      checkboxElementInputValue[0].checked = !checkboxElementInputValue[0]
        .checked;
    }
    calculateTotalPrice();
  }

  function saveSelectedItems() {
    dispatch(addItem({ selectedItems }));
  }

  useEffect(() => {
    dispatch(redirectStep());
    calculateTotalPrice();
    return () => {
      dispatch(redirectStep());
    };
  }, []);

  useEffect(() => {
    if (redirect && selectedItemsStore.length > 0) {
      history.push("/paymenttypeselection");
    }
  }, [redirect]);

  /* Control  Section */
  // if (!queryResult) return <BlankPage />;
  if (!Object.values(queryResult).length) return history.push("/greeting");
  const instId = queryResult.result[0].institution.id
  return (
    <Container>
      <Logo />
      <Title institution>{queryResult.result[0].institution.name}</Title>
      <QueryResult>
        <QueryHead>
          <QH>Müşteri Adı</QH>
          <QH>Tesisat No</QH>
          <QH>Son Ödeme Tarihi</QH>
          <QH>Fatura Tutarı</QH>
          <QH>İşlem Ücreti</QH>
          <QH>Toplam</QH>
        </QueryHead>
        {queryResult.result.map((i) =>
          i.items.map((j, k) => (
            <Query
              onClick={(e) => selectionRow(e)}
              className={cn(selectedItems.includes(j) && style.selectedRow)}
              name="rows"
            >
              <QR>
                <input
                  type="checkbox"
                  name="queryrow1"
                  value="1"
                  defaultChecked
                />
              </QR>
              <QR>{i.customer_name}</QR>
              <QR>{i.installation_number}</QR>
              <QR>{j.date}</QR>
              <QR tl>{j.invoice_amount}</QR>
              <QR tl>{j.transaction_cost}</QR>
              <QR tl>{j.total_amount}</QR>
            </Query>
          ))
        )}
      </QueryResult>

      <TotalCount>{totalPrice}</TotalCount>
      <Footer>
        <Button position="right" payment onClick={() => saveSelectedItems()}>
          ÖDEMEYİ TAMAMLA
        </Button>
        <Button position="left" onClick={() =>history.push('/institution/'+instId)}>
          Geri
        </Button>
      </Footer>
    </Container>
  );
}

export default QueryResultPage;
