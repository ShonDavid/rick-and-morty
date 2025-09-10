import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <HomePage />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
