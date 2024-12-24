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
import './GlobalComponents.css'
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

function App() {


  const [count, setCount] = useState(0)

  useEffect(() => {
    // body.classList.add('allPagesBg')
  }, [])
  return (
    <>
      <BrandProvider>
        <StockOrBisnessProvider>
          <AppDataContextProvider>
            {/* <RootMenu /> */}
            <LevelOne />
            <Routes>

              <Route path="/" element={
                <Login />} />

              <Route path="/home" element={
                <Login />} />
              <Route path="/login" element={
                <Login />} />
              <Route path="/dashboard" element={
                <Dashboard />} />
              <Route path="/vessel" element={
                <Vessels />} />
              <Route path="/gate" element={
                <Gate  />} />

              {/* -------------------- Forms ------------- */}


              <Route path="/vesselform" element={
                <Vessel />} />
              <Route path="/bollardsform" element={
                <Bollards />} />
              <Route path="/unberthform" element={
                <Unberthing />} />
              <Route path="/invoiceform" element={
                <Invoice />} />
              <Route path="/bookingform" element={
                <Booking />} />
              <Route path="/entryform" element={
                <Entry />} />
              <Route path="/truckwarehouseform" element={
                <TruckVessel />} />
              <Route path="/trucktruckform" element={
                <TruckTruck />} />
              <Route path="/wvesselform" element={
                <WVessel />} />
              <Route path="/wtruckform" element={
                <WTrcuk />} />


              {/* -------------------- End of Forms  ----------  */}

              <Route path="/ops" element={
                <Ops />} />
              <Route path="/test" element={
                <Testuser />} />
              <Route path="/user" element={
                <AccountPage />} />
              <Route path="/companyName" element={
                <RequireAuth loginPath="/login">
                  <CompanyName />
                </RequireAuth>} />
              <Route path="/currency" element={
                <RequireAuth loginPath="/login">
                  <Currency />
                </RequireAuth>} />
              <Route path="/startproc" element={
                <RequireAuth loginPath="/login">
                  <Generic />
                </RequireAuth>} />

              <Route path="/anysetting" element={
                <RequireAuth loginPath="/login">
                  <AnySettingsName />
                </RequireAuth>} />


              <Route path="/items" element={
                <RequireAuth loginPath="/login">
                  <Items />
                </RequireAuth>} />
              <Route path="/itemcategory" element={
                <RequireAuth loginPath="/login">
                  <ItemCategory />
                </RequireAuth>} />
              <Route path="/sales" element={
                <RequireAuth loginPath="/login">
                  <Sales />
                </RequireAuth>} />
              <Route path="/damage" element={
                <RequireAuth loginPath="/login">
                  <Damage />
                </RequireAuth>} />
              <Route path="/returns" element={
                <RequireAuth loginPath="/login">
                  <Return />
                </RequireAuth>} />
              <Route path="/stocklevel" element={
                <RequireAuth loginPath="/login">
                  <StockLevel />
                </RequireAuth>} />
              <Route path="/purchase" element={
                <RequireAuth loginPath="/login">
                  <Purchase />
                </RequireAuth>} />
              <Route path="/expenses" element={
                <RequireAuth loginPath="/login">
                  <Expenses />
                </RequireAuth>} />

            </Routes>

          </AppDataContextProvider>
        </StockOrBisnessProvider>
      </BrandProvider>
    </>
  )
}

export default App
