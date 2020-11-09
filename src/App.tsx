import React from "react";
import {
  Provider,
  defaultTheme,
  Button,
  Header,
  Content,
  Grid,
  View,
} from "@adobe/react-spectrum";
import { Router } from "@reach/router";
import FirebaseProvider from "./FirebaseProvider";
import List from "./pages/List";
import "./App.css";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <Provider theme={defaultTheme}>
      <FirebaseProvider>
        <Grid rows={["size-1000", "auto"]} columns="1fr" height="100vh">
          <View paddingTop="size-600">
            <Router>
              <List path="/" />
              <Create path="/create" />
              <Edit path="/edit/:employee" />
            </Router>
          </View>
        </Grid>
      </FirebaseProvider>
    </Provider>
  );
}

export default App;
