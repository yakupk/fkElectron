import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "./components/Loader";

// Loadable for dom loaded loading component
const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  });

const routes = [
  {
    path: "/dashboard",
    component: loadable(() => import("./pages/DashboardPage")),
  },
  {
    path: "/greeting",
    component: loadable(() => import("./pages/GreetingPage")),
  },
  {
    path: "/categories",
    component: loadable(() => import("./pages/CategoryPage")),
  },
  {
    path: "/category/:id",
    component: loadable(() => import("./pages/InstitutionListPage")),
  },
  {
    path: "/institution/:id",
    component: loadable(() => import("./pages/InstitutionDetailPage")),
  },
  {
    path: "/blankpage",
    component: loadable(() => import("./pages/BlankPage")),
  },
  {
    path: "/queryresult",
    component: loadable(() => import("./pages/QueryResultPage")),
  },
  {
    path: "/queryresultpartialpayment",
    component: loadable(() => import("./pages/QueryResultPartialPaymentPage")),
  },
  {
    path: "/paymenttypeselection",
    component: loadable(() => import("./pages/PaymentTypeSelectionPage")),
  },
  {
    path: "/chooseinstallment",
    component: loadable(() => import("./pages/ChooseInstallmentPage")),
  },
  {
    path: "/paymentsummary",
    component: loadable(() => import("./pages/PaymentSummary")),
  },{
    path: "/unavailable",
    component: loadable(() => import("./pages/UnavailablePage")),
  },
];

function Router({ history }) {
  const [data, setData] = useState("");
  const [networkStatus, setNetworkStatus] = useState(true);
  useLayoutEffect(() => {
    setNetworkStatus(navigator.onLine)
    window.ipcRenderer.on("card_channel", (event, message) => {
      setData(message);
    });
  }, []);
  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <Switch history={history}>
      <Route exact path="/" render={() => <Redirect to="/greeting" />} />
      {routes.map(({ component: ComponentDetails, ...route }, i) => {
        return (
          <Route
            path={route.path}
            component={route.component}
            key={route.path}
            render={(props) => <ComponentDetails {...props} card={data}  networkStatus/>}
            exact={true}
          />
        );
      })}
    </Switch>
  );
}

export default Router;
