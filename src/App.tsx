import "./App.css";
import { Provider } from "react-redux";
import store from "./utils/redux/store/index.js";
import Routes from "./routes/index.jsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
