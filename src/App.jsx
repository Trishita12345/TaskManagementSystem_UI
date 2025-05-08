import Tasks from "./screens/Tasks/index.jsx";
import "./App.css";
import { Provider } from "react-redux";
import store from "./utils/redux/store/index.js";
import Layout from "./screens/Layout/index.jsx";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Tasks />
      </Layout>
    </Provider>
  );
}

export default App;
