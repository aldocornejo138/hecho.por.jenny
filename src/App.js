import "./App.css";
import Home from "./components/home/Home.js";
import { Route, Routes } from "react-router-dom";
import Party from "./components/partyArrangements/PartyArrangements.js";
import CustomBouquets from "./components/customBouquets/customBouquets.js";
import Proposal from "./components/proposal/Proposal.js";
import Contact from "./components/contact/Contact.js";
import SuccessPage from "./components/success/SuccessPage.js";
import CancelPage from "./components/customBouquets/cancel/CancelPage.js";
import OrderInfo from "./components/customBouquets/orderInfo.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CustomBouquets" element={<CustomBouquets />} />
        <Route path="/PartyArrangements" element={<Party />} />
        <Route path="/ProposalSets" element={<Proposal />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Success" element={<SuccessPage />} />
        <Route path="/Cancel" element={<CancelPage />} />
        <Route path="/OrderDetails" element={<OrderInfo />} />
      </Routes>
    </div>
  );
}

export default App;
