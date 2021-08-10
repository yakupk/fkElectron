import React from "react";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../slices/categories";
import {
  Button,
  CategoriesLists,
  CategoryItem,
  CategoryLogo,
  CategoryName,
  Container,
  Logo,
} from "../components/components/";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/components/footer";

const CategoryPage = () => {
  const { categories } = useSelector(categoriesSelector);
  let history = useHistory();
  return (
    <section>
      {
        <Container>
          <Logo />
          <CategoriesLists>
            {categories.result.institution_categories.map((
              item //3
            ) => (
                <CategoryItem key={item.id}>
                  <Link to={`/category/${item.id}`}>
                    <CategoryLogo
                      src={`/static/images/category/${item.id}.png`}
                    />
                    <CategoryName>{item.long_name}</CategoryName>
                  </Link>
                </CategoryItem>
              ))}
          </CategoriesLists>
          <Footer>
            <Button position="left" onClick={() => history.goBack()}>
              Geri
            </Button>
            {/* <Button position="right" >Tamamla</Button>*/}
          </Footer>
        </Container>
      }
    </section>
  );
};

export default CategoryPage;
