import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  publicRoutes } from "@routes/Routes";
import DefaultLayout from "@layouts/DefaultLayouts/DefaultLayout";
import  type {PublicRouteType} from "@models/PublicRouteType/PublicRouteType";


function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Routes>
          {publicRoutes.map((route:PublicRouteType, index) => {
            let Layout:React.FC<{ children: React.ReactNode }> = DefaultLayout;

            if (route.layout) {
              Layout = route.layout as React.FC<{ children: React.ReactNode }>;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
      

    </Router>
  );
}

export default App;
