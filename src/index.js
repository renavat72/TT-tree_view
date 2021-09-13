import { render } from "@testing-library/react";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

render(
  <Provider store={store}>
    <App />
  </Provider>
);
document.getElementById("root");
