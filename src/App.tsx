import { StrictMode } from "react";
import Router from "./components/core/Router";
import { Provider } from "react-redux";
import { store } from "./store/store";

export function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </StrictMode>
  );
}
