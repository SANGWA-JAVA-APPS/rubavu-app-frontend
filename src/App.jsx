import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from 'react-bootstrap'
import SecondMenu from './components/Navbar/SecondMenu';
import { motion } from 'framer-motion';
import Home from './components/pages/Home/Home';
import Beer from './components/pages/Beer/Beer';
import { Route, Routes } from 'react-router-dom';
import Liquor from './components/pages/Liquor/Liquor';

import { BrandProvider } from './components/Global/BrandContext';
import Expenses from './components/pages/expenses/Expenses';
import MultipleItems from './components/pages/Purchase/MultipleItems';
import { AppDataContextProvider, ColItemContext } from './components/Global/GlobalDataContentx';
import SalePurchaseForm from './components/pages/sale/SalePurchaseForm';
import AnySettingsName from './components/pages/settings/AnySettingsName';
import Debts from './components/pages/Debts/Debts';
import { StockOrBisnessProvider } from './components/Global/StockOrBisness';
import OffCancasMenu from './components/pages/Offcanvas/OffCancasMenu';
import RootMenu from './components/pages/RootMenu/RootMenu';
import StockNavBar from './components/Navbar/StockNavBar';
import Testuser from './components/pages/TestUser/Testuser';
import Items from './components/pages/item/items';
import ItemCategory from './components/pages/ItemCategory/item_category';
import { RequireAuth } from 'react-auth-kit';
import Sales from './components/pages/sale/Sales';
import Damage from './components/pages/damage/Damage';
import Return from './components/pages/Returns/Return';
import StockLevel from './components/pages/StockLevel/StockLevel';
import Purchase from './components/pages/Purchase/Purchases';
import './GlobalComponents.scss'
import "react-datepicker/dist/react-datepicker.css";
import LevelOne from './components/MenuLevels/LevelOne';
import { Vessels } from './components/pages/NewNav/Vessels';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { Ops } from './components/pages/NewNav/Ops';
import AccountPage from './components/pages/Users/AccountPage';
import CompanyName from './components/pages/settings/CompanyName';
import Currency from './components/pages/currency/Currency';
import { Generic } from './components/pages/NewNav/Processes/Generic';
import Vessel from './components/pages/Vessel/Vessel';
import Booking from './components/pages/Booking/Booking';
import Entry from './components/pages/Entry/Entry';
import { TruckVessel } from './components/pages/NewNav/Processes/TruckVessel';
import { TruckTruck } from './components/pages/NewNav/Processes/TruckTruck';
import { WVessel } from './components/pages/NewNav/Processes/WVessel';
import { WTrcuk } from './components/pages/NewNav/Processes/WTruck';
import { Bollards } from './components/pages/NewNav/Processes/Bollards';
import { Gate } from './components/pages/NewNav/Gate';
import Unberthing from './components/pages/NewNav/Processes/Unberthing';
import Invoice from './components/pages/Invoice/Invoice';
import TruckForm from './components/pages/Truck/TruckForm';
import Arrival_note from './components/pages/Arrivalnote/Arrival_note';
import Truck_parking_invoice from './components/pages/Truckinvoice/Truck_parking_invoice';
import Truck_exit from './components/pages/Truck_exit';
import { ArrivalDetailsToPrint } from './components/pages/Arrivalnote/ArrivalDetailsToPrint';
import Tally from './components/pages/NewNav/NewProcesses/Tally';
import BerthPayment from './components/pages/BerthPayment/BerthPayment';
import { BerthPrint } from './components/pages/BerthPayment/BerthPrint';
import InvoicePrint from './components/pages/Invoice/InvoicePrint';
import { BerthPaymentPrint } from './components/pages/BerthPayment/BerthPaymentPrint';
import { UnberthPrint } from './components/pages/Unberth/UnberthPrint';
import { ButtonProvider, DateRangeProvider } from './components/globalcomponents/ButtonContext';
import { ToastDialogProvider } from './components/globalcomponents/ToastContext';
import { PrintOpsInvoice } from './components/pages/GenInvoice/PrintOpsInvoice';
import { RevenueReports } from './components/pages/reporting/revenueReports';
import { GenReceiptPrint } from './components/pages/GenReceipt/GenReceiptPrint';
import { GenExitPrint } from './components/pages/GenExit/GenExitPrint';
import CommonReporting from './components/pages/reporting/CommonReporting';
import TruckReceipt from './components/pages/TruckReceipt/TruckReceipt';
import { CollectTypeProvider } from './components/Global/CollectTypeContext';
import { TruckEntryPrint } from './components/pages/Entry/TruckEntryPrint';
import { TruckReceiptPrint } from './components/pages/Entry/TruckReceiptPrint';
import { TruckParkingInvoicePrint } from './components/pages/Entry/TruckParkingInvoicePrint';
import { TruckExitPrint } from './components/pages/Entry/TruckExitPrint';
import { Client } from './components/Client/Client';
import RraRecords from './components/pages/reporting/RraRecords';
import Berthinginvoice from './components/pages/auditing/Berthinginvoice';
import AuditingTabs from './components/pages/auditing/AuditingTabs';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  const [count, setCount] = useState(0)

  useEffect(() => {
    // body.classList.add('allPagesBg')
  }, [])
  return (
    <Provider store={store}>
      <BrandProvider>
        <StockOrBisnessProvider>
          <AppDataContextProvider>
            <ButtonProvider>
              <ToastDialogProvider>

                <LevelOne />
                <Routes>
                  <Route path="/" element={
                    <Login />} />
                  <Route path="/home" element={
                    <Login />} />
                  <Route path="/login" element={
                    <Login />} />
                  <Route path="/dashboard" element={<RequireAuth loginPath="/login">
                    <DateRangeProvider>
                      <Dashboard />
                    </DateRangeProvider>
                  </RequireAuth>} />
                  <Route path="/vessel" element={<RequireAuth loginPath="/login">
                    <Vessels /></RequireAuth>} />
                  <Route path="/gate" element={<RequireAuth loginPath="/login">
                    <Gate /></RequireAuth>} />

                  {/* -------------------- Forms ------------- */}

                  <Route path="/vesselform" element={<RequireAuth loginPath="/login">
                    <Vessel /></RequireAuth>} />
                  <Route path="/bollardsform" element={<RequireAuth loginPath="/login">
                    <Bollards /></RequireAuth>} />
                  <Route path="/unberthform" element={<RequireAuth loginPath="/login">
                    <Unberthing /></RequireAuth>} />
                  <Route path="/invoiceform" element={<RequireAuth loginPath="/login">
                    <Invoice /></RequireAuth>} />
                  <Route path="/bookingform" element={<RequireAuth loginPath="/login">
                    <Booking /></RequireAuth>} />
                  <Route path="/entryform" element={<RequireAuth loginPath="/login">
                    <Entry /></RequireAuth>} />
                  <Route path="/truckwarehouseform" element={<RequireAuth loginPath="/login">
                    <TruckVessel /></RequireAuth>} />
                  <Route path="/trucktruckform" element={<RequireAuth loginPath="/login">
                    <TruckTruck /></RequireAuth>} />
                  <Route path="/wvesselform" element={<RequireAuth loginPath="/login">
                    <WVessel /></RequireAuth>} />
                  <Route path="/wtruckform" element={<RequireAuth loginPath="/login">
                    <WTrcuk /></RequireAuth>} />
                  <Route path="/truckinvoiceform" element={<RequireAuth loginPath="/login">
                    <Truck_parking_invoice /></RequireAuth>} />
                  <Route path="/truckpaymentform" element={<RequireAuth loginPath="/login">
                    <TruckReceipt /></RequireAuth>} />

                  <Route path="/berthPaymentform" element={<RequireAuth loginPath="/login">
                    <BerthPayment /></RequireAuth>} />
                  <Route path="/commonreport" element={<RequireAuth loginPath="/login">
                    <CommonReporting /></RequireAuth>} />
                  {/* -------------------- End of Forms  ----------  */}

                  <Route path="/ops" element={<RequireAuth loginPath="/login">
                    <Ops /></RequireAuth>} />
                  <Route path="/test" element={<RequireAuth loginPath="/login">
                    <Testuser /></RequireAuth>} />
                  <Route path="/user" element={<RequireAuth loginPath="/login">
                    <AccountPage /> </RequireAuth>} />
                  <Route path="/companyName" element={<RequireAuth loginPath="/login">
                    <CompanyName />
                  </RequireAuth>} />
                  <Route path="/currency" element={<RequireAuth loginPath="/login">
                    <Currency />
                  </RequireAuth>} />
                  <Route path="/startproc" element={<RequireAuth loginPath="/login">
                    <CollectTypeProvider>
                      <Generic />
                    </CollectTypeProvider>
                  </RequireAuth>} />

                  <Route path="/anysetting" element={<RequireAuth loginPath="/login">
                    <AnySettingsName />
                  </RequireAuth>} />
                  <Route path="/items" element={<RequireAuth loginPath="/login">
                    <Items />
                  </RequireAuth>} />
                  <Route path="/itemcategory" element={<RequireAuth loginPath="/login">
                    <ItemCategory />
                  </RequireAuth>} />
                  <Route path="/sales" element={<RequireAuth loginPath="/login">
                    <Sales />
                  </RequireAuth>} />
                  <Route path="/damage" element={<RequireAuth loginPath="/login">
                    <Damage />
                  </RequireAuth>} />
                  <Route path="/returns" element={<RequireAuth loginPath="/login">
                    <Return />
                  </RequireAuth>} />
                  <Route path="/stocklevel" element={<RequireAuth loginPath="/login">
                    <StockLevel />
                  </RequireAuth>} />
                  <Route path="/purchase" element={<RequireAuth loginPath="/login">
                    <Purchase />
                  </RequireAuth>} />
                  <Route path="/expenses" element={<RequireAuth loginPath="/login">
                    <Expenses />
                  </RequireAuth>} />
                  <Route path="/truckform" element={<RequireAuth loginPath="/login">
                    <TruckForm />
                  </RequireAuth>} />
                  <Route path="/truckexitform" element={<RequireAuth loginPath="/login">
                    <Truck_exit />
                  </RequireAuth>} />
                  <Route path="/truckexitprint" element={<RequireAuth loginPath="/login">
                    <TruckExitPrint />
                  </RequireAuth>} />


                  <Route path="/arrivalnote" element={<RequireAuth loginPath="/login">
                    <CollectTypeProvider>
                      <Arrival_note />
                    </CollectTypeProvider>
                  </RequireAuth>} />
                  <Route path="/arrivalPrint" element={<RequireAuth loginPath="/login">
                    <ArrivalDetailsToPrint />
                  </RequireAuth>} />
                  <Route path="/pringberth" element={<RequireAuth loginPath="/login">
                    <BerthPrint />
                  </RequireAuth>} />
                  <Route path="/tally" element={<RequireAuth loginPath="/login">
                    <Tally />
                  </RequireAuth>} />
                  <Route path="/pringinvoice" element={<RequireAuth loginPath="/login">
                    <InvoicePrint />
                  </RequireAuth>} />
                  <Route path="/prinreceipt" element={<RequireAuth loginPath="/login">
                    <BerthPaymentPrint />
                  </RequireAuth>} />
                  <Route path="/printInvoice" element={<RequireAuth loginPath="/login">
                    <PrintOpsInvoice />
                  </RequireAuth>} />
                  <Route path="/revenuereport" element={<RequireAuth loginPath="/login">
                    <RevenueReports />
                  </RequireAuth>} />
                  <Route path="/receiptprint" element={<RequireAuth loginPath="/login">
                    <GenReceiptPrint />
                  </RequireAuth>} />
                  <Route path="/genexittprint" element={<RequireAuth loginPath="/login">
                    <GenExitPrint />
                  </RequireAuth>} />
                  <Route path="/unberthPrint" element={<RequireAuth loginPath="/login">
                    <UnberthPrint />
                  </RequireAuth>} />
                  <Route path="/truckEntryPrint" element={<RequireAuth loginPath="/login">
                    <TruckEntryPrint />
                  </RequireAuth>} />
                  <Route path="/truckParkingInvoicePrint" element={<RequireAuth loginPath="/login">
                    <TruckParkingInvoicePrint />
                  </RequireAuth>} />
                  <Route path="/truckreceiptPrint" element={<RequireAuth loginPath="/login">
                    <TruckReceiptPrint />
                  </RequireAuth>} />
                  <Route path="/clients" element={<RequireAuth loginPath="/login">
                    <Client />
                  </RequireAuth>} />
                  <Route path="/rrarec" element={<RequireAuth loginPath="/login">
                    <RraRecords />
                  </RequireAuth>} />
                  <Route path="/appauditing" element={<RequireAuth loginPath="/login">
                    <AuditingTabs />
                  </RequireAuth>} />

                </Routes>
              </ToastDialogProvider>
            </ButtonProvider>
          </AppDataContextProvider>
        </StockOrBisnessProvider>
      </BrandProvider>
    </Provider>
  )
}
export default App
