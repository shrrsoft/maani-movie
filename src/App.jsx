import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
