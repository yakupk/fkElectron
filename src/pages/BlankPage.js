import React from "react";
import { Container, Logo, Content, Title, Article,  Button } from "../components/components";
import Footer from "../components/components/footer";
import {useHistory } from 'react-router-dom'

const later = (delay, value) => {
    return new Promise(resolve => setTimeout(resolve, delay, value));
};

function BlankPage(props) {
    console.log({props});
    let history = useHistory();
    const [ifRedirect, setIfRedirect] = React.useState(false);
    later(5000,).then(() => {
        console.log("değişecek",ifRedirect)
        setIfRedirect(true)
    });
    React.useEffect(()=>{
        console.log("Yönlendi",ifRedirect)
       if(ifRedirect) history.push('/greeting')
    },[ifRedirect]);

    return (
        <Container bg="wrrw">
            <Logo />
            <Content>
                <Title big>{ props?.location?.title ??  props.title ??  "Sistem Hatasi"}</Title>
                <Article>
                    {props?.location?.message ??  props.message ??  <b>Şuan için anlık bir sorun oluştu. Lütfen tekrar deneyiniz.</b>}
                </Article>
            </Content>

            <Footer>
                <Button position="left" onClick={() => history.goBack()}>Geri</Button>
            </Footer>
        </Container>
    );
}

export default BlankPage;
