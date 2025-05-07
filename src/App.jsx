import Tasks from "./screens/Tasks/index.jsx";
import "./App.css";
import { Provider } from "react-redux";
import store from "./utils/redux/store/index.js";
import Layout from "./screens/Layout/index.jsx";
import { useEffect, useState } from "react";

function App() {
  // const [theme, setTheme] = useState("dark");

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);
  return (
    <Provider store={store}>
      <Layout>
        <Tasks />
      </Layout>
    </Provider>
  );
}

export default App;
