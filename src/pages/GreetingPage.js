import React from "react";
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import { categoriesSelector } from "../slices/categories";
import {
  InstitutionList,
  Institution,
  InstitutionLogo,
  InstitutionName,
  Container,
  Logo,
  Button,
} from "../components/components/";
import Footer from "../components/components/footer";
import { Link } from "react-router-dom";
import {BasketSelector} from "../slices/basket";

let GreetingPage;
GreetingPage = ({...props}) => {
  console.log("GREETİNG PAGE....")
  const {categories} = useSelector(categoriesSelector);
  const {selectedBkmId} = useSelector(BasketSelector);
  let dispatch = useDispatch();
  dispatch({ type: 'RESET_ALL_STATE' });

  console.log("SEÇILİ BANKA ID :",selectedBkmId);
  let instLength = 0;
  categories.result.institution_categories.map(i => {
    instLength += i.institutions.length
  });

  console.log('props: ', {card: props.card});

  return (
      <section>
        <Container bg="wrrw">
          <Logo/>
          <InstitutionList className={cn(instLength > 10 ? 'big' : 'small')}>
            {categories.result.shortcuts.map((
                item //3
            ) => (
                <Institution key={item.id}>
                  <Link to={`/institution/${item.id}`}>
                    <InstitutionLogo src={item.logo}/>
                    <InstitutionName>{item.name}</InstitutionName>
                  </Link>{" "}
                </Institution>
            ))}

            {categories.result.institution_categories
                .map((i) => i.institutions)
                .flat()
                .slice(0, 12)
                .map((item) => (
                    <Institution key={item.id}>
                      {" "}
                      <Link to={`/institution/${item.id}`}>
                        <InstitutionLogo src={item.logo}/>
                        <InstitutionName>{item.name}</InstitutionName>
                      </Link>
                    </Institution>
                ))}
          </InstitutionList>

          <Footer>
            <Link to={"/categories"}>
              <Button section="allInstitution">Tüm Kurumlar</Button>
            </Link>
          </Footer>
        </Container>
      </section>
  );
};

export default GreetingPage;
