import styled from "styled-components";
import { darken, lighten } from "polished";
import { color } from "../../style/variable";
import { Container } from "..";


const Layout = styled.div`
  content: "";
  position: fixed;
  width: 100vw;
  height: 11vh;
  background: linear-gradient(90deg, ${color.footerBg}, ${color.footerBg2});
  left: 0 !important;
  bottom: 0;
  padding: 0;
  z-index: 9999;
`;

function Footer({ children }) {
  return (
    <Layout>
      <Container footer>{children}</Container>
    </Layout>
  );
}

export default Footer;
