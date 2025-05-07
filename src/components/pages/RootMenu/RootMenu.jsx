import React from 'react'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Items from '../item/items'
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import ItemCategory from '../ItemCategory/item_category'
import Beer from '../Beer/Beer'
import Liquor from '../Liquor/Liquor'
import Sales from '../sale/Sales'
import Damage from '../damage/Damage'
import StockLevel from '../StockLevel/StockLevel'
import Dashboard from '../Dashboard/Dashboard'
import AccountPage from '../Users/AccountPage'
import Purchase from '../Purchase/Purchases'
import Changepassword from '../sale/Changepassword'
import Account_category from '../AccCategory/Account_category'
import UnitCosts from '../Unitcosts/UnitCosts'
import BerthingRevenue from '../Dashboard/DetailedReport'
import Currency from '../currency/Currency'
import Closing from '../closing/Closing'
import Funding from '../funding/Funding'
import Expenses from '../expenses/Expenses'
import MultipleItems from '../Purchase/MultipleItems'
import SalePurchaseForm from '../sale/SalePurchaseForm'
import AnySettingsName from '../settings/AnySettingsName'
import Debts from '../Debts/Debts'
import Return from '../Returns/Return'
import CompanyName from '../settings/CompanyName'
import Testuser from '../TestUser/Testuser'
import StockNavBar from '../../Navbar/StockNavBar'
import SecondMenu from '../../Navbar/SecondMenu'
import Entry from '../Entry/Entry'
import Vessel from '../Vessel/Vessel'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import Booking from '../Booking/Booking'
import Arrival_note from '../Arrivalnote/Arrival_note'
import Invoice from '../Invoice/Invoice'
import Payment from '../Payment/Payment'
import Exits from '../Exit/Exits'
import TVTallyIn from '../TruckWh/TVTallyIn'
import TvVessel from '../TruckVessel/TvVessel'
import TVBooking from '../TruckVessel/TVBooking'
import TruckVesselNavBar from '../../Navbar/TruckVesselNavBar'
import TvArrivalNote from '../TruckVessel/TvArrivalNote'
import TVTallyout from '../TruckVessel/TVTallyout'
import TVInvoice from '../TruckVessel/TVInvoice'
import TVpayment from '../TruckVessel/TVpayment'
import TVExit from '../TruckVessel/TVExit'
import WVTallyout from '../WHVessel/WVTallyout'
import Wvinvoice from '../WHVessel/Wvinvoice'
import WVPayment from '../WHVessel/WVPayment'

function RootMenu() {
    return (
        <>
            <SecondMenu />

            <Routes>
                <Route path="/" element={
                    <Login />} />
                <Route path="/home" element={
                    <Home />} />

                <Route path="/entry" element={
                    <Entry />} />
                <Route path="/vessel" element={
                    <Vessel />} />
                <Route path="/booking" element={
                    <Booking />} />
                <Route path="/arrivalnote" element={
                    <Arrival_note />} />
                <Route path="/invoice" element={
                    <Invoice />} />
                <Route path="/payment" element={
                    <Payment />} />
                <Route path="/exit" element={
                    <Exits />} />
                <Route path="/twtallyin" element={
                    <TVTallyIn />} />
                <Route path="/tvvessel" element={
                    <TvVessel />} />
                <Route path="/tvbooking" element={
                    <TVBooking />} />
                <Route path="/tvbooking" element={
                    <Arrival_note />} />
                <Route path="/tvarrivalnote" element={
                    <TvArrivalNote />} />
                <Route path="/tvtallyout" element={
                    <TVTallyout />} />
                <Route path="/tvinvoice" element={
                    <TVInvoice />} />
                <Route path="/tvpayment" element={
                    <TVpayment />} />
                <Route path="/tvexit" element={
                    <TVExit />} />


                <Route path="/wvtallyout" element={
                    <WVTallyout />} />
                <Route path="/wvinvoice" element={
                    <Wvinvoice />} />
                <Route path="/wvpayment" element={
                    <WVPayment />} />
                <Route path="/wvexit" element={
                    <WVPayment />} />



                <Route path="/beer" element={
                    <RequireAuth loginPath="/login">
                        <Beer />
                    </RequireAuth>} />

                <Route path="/liquor" element={
                    <RequireAuth loginPath="/login">
                        <Liquor />
                    </RequireAuth>
                } />

                <Route path="/login" element=
                    {<Login />}
                />
                <Route path="/dashboard" element={
                    <RequireAuth loginPath="/login">
                        <Dashboard />
                    </RequireAuth>} />

                <Route path="/user" element={
                    <RequireAuth loginPath="/login">
                        <AccountPage />
                    </RequireAuth>} />
                <Route path="/changepassword" element={
                    <RequireAuth loginPath="/login">
                        <Changepassword />
                    </RequireAuth>} />
                <Route path="/user-category" element={
                    <RequireAuth loginPath="/login">
                        <Account_category />
                    </RequireAuth>} />
                <Route path="/unitcosts" element={
                    <RequireAuth loginPath="/login">
                        <UnitCosts />
                    </RequireAuth>} />
                <Route path="/unitcosts" element={
                    <RequireAuth loginPath="/login">
                        <BerthingRevenue />
                    </RequireAuth>} />
                <Route path="/companyName" element={
                    <RequireAuth loginPath="/login">
                        <CompanyName />
                    </RequireAuth>} />
                <Route path="/currency" element={
                    <RequireAuth loginPath="/login">
                        <Currency />
                    </RequireAuth>} />
                <Route path="/closing" element={
                    <RequireAuth loginPath="/login">
                        <Closing />
                    </RequireAuth>} />
                <Route path="/funding" element={
                    <RequireAuth loginPath="/login">
                        <Funding />
                    </RequireAuth>} />

                <Route path="/mforms" element={
                    <RequireAuth loginPath="/login">
                        <MultipleItems />
                    </RequireAuth>} />

                <Route path="/spurchase" element={
                    <RequireAuth loginPath="/login">
                        <SalePurchaseForm />
                    </RequireAuth>} />
                <Route path="/anysetting" element={
                    <RequireAuth loginPath="/login">
                        <AnySettingsName />
                    </RequireAuth>} />
                <Route path="/debts" element={
                    <RequireAuth loginPath="/login">
                        <Debts />
                    </RequireAuth>} />
            </Routes>
        </>
    )
}

export default RootMenu