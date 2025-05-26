import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Main /> */}
      <Footer />




      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
        closeButton={true}
      />
    </div>
  );
}


export default App;