import Tasks from "./screens/Tasks/index.jsx";
import "./App.css";
import { Provider } from "react-redux";
import store from "./utils/redux/store/index.js";

function App() {
  return (
    <Provider store={store}>
      <Tasks />
    </Provider>
  );
}

export default App;
