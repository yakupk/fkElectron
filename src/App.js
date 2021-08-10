import React, { useEffect,useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector, fetchCategories } from "./slices/categories";
import { profileSelector, fetchProfile } from "./slices/me";
import { Redirect } from "react-router-dom";
import LockScreen from "react-lock-screen";
import 'antd/dist/antd.css';
import './components/style/style.scss'
import Loading from "./components/components/loading";
function App({ children, ...props }) {
  //Electron Kontrol
  const didMountRef = useRef(false);
  const dispatch = useDispatch();

  const { categories, loading, hasErrors } = useSelector(categoriesSelector);
  const profileResult = useSelector(profileSelector);
  window.ipcRenderer.on("test", (event, message) => {
    console.log("test REsP ",message)
  });
    // initial request
  useEffect(() => {
    console.log("Use Effect started....")
    const respVal =window.ipcRenderer.sendSync('make_me_login','')
    console.log({respVal})
    if (categories.length === 0) {
      console.log("categori alanında")
      window.ipcRenderer.on("is_auth", (event, message) => {
        console.log({message})
        if (message === "success"){
          dispatch(fetchProfile())
          dispatch(fetchCategories())
        }
      });

    }
  }, []);



  // Block page external refresh
  /*useEffect(() => {
    if (didMountRef.current) { window.addEventListener('beforeunload', beforeunload);}
    else { window.addEventListener('beforeunload', beforeunload);}
    return () => { window.removeEventListener('beforeunload', beforeunload);};
  }, []);
  const beforeunload = e => {
    if(process.env.NODE_ENV !=='development'){
      e.preventDefault();
      e.returnValue = true;
    }
  };*/

  //institution control
  console.log("LOADİNG",loading)
  if (loading){
    return <Loading />;
  }
  if (hasErrors){
    console.log("Bir hata oluştu....")
    return <p>Bir Hata Oluştu </p>;
  }
  if(profileResult.hasErrors) {
    console.log("profileResult.hasErrors")
    return <p>Bir Hata Oluştu...</p>
  }

  const goHome = () => <Redirect to="/dashboard" />;
  console.log({children})
  return (
    <LockScreen timeout={90000} ui={goHome}>
      {/* <Navbar /> */}
      {children}
    </LockScreen>
  )


}



export default App;
