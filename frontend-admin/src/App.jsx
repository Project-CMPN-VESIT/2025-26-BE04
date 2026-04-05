import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Slide, ToastContainer } from "react-toastify";
import Donation from "./pages/Donation/Donation";
// import ChildrenAddPage from "./pages/Children/ChildrenAddPage";
// import ChildrenFilterPage from "./pages/Children/ChildrenFilterPage";
// import CentresPage from "./pages/Centre/CentresPage";
// import CentreForm from "./pages/Centre/CentreForm";
import ChildrenForm from "./pages/AddChildren/ChildrenForm";
import InventoryPage from "./pages/Inventory/InventoryPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/:tab" element={<Dashboard />} />
        <Route path="/donations/:fundraiserId" element={<Donation />} />
        <Route
          path="/dashboard/childrenfilter/children"
          element={<ChildrenForm />}
        />
        <Route path="/dashboard/inventory/:centreId" element={<InventoryPage />} />
        
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
}

export default App;
