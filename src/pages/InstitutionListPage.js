import React from 'react'
import { useSelector } from 'react-redux'
import { categoriesSelector } from "../slices/categories";
import {
  Button,
  Container,
  Institution,
  InstitutionList,
  InstitutionLogo,
  InstitutionName,
  Logo,
  Title,
} from "../components/components";
import Footer from "../components/components/footer";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const InstitutionListPage = ({ match }) => {
  const { categories, } = useSelector(categoriesSelector);
  const selectedCategory = categories.result.institution_categories.find(item => { return item.id == match.params.id });
  let history = useHistory();
  const list = selectedCategory.institutions.slice(0, 15)

  return (
    <Container>
      <Logo />
      <Title institution>{selectedCategory.long_name}</Title>
      <InstitutionList className={cn("category", list.length > 10 ? 'big' : 'small')}>
        {list.map((item) => (

          <Institution key={item.id}> <Link to={`/institution/${item.id}`} >
            <InstitutionLogo src={item.logo} />
            <InstitutionName>{item.name}</InstitutionName>
          </Link> </Institution>

        ))}
      </InstitutionList>
      <Footer>
        <Button position="left" onClick={() => history.goBack()}>Geri</Button>
      </Footer>
    </Container>
  )
};

export default InstitutionListPage
