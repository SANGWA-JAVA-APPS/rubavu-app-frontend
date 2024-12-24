import React, { Component } from 'react'
import axios from "axios"

import StockConn from './StockConn'
class StockCommons {
    static server = StockConn.server.name + StockConn.port.val
    static apiPath = StockConn.basicPath.val

    RedirectToLogin() {
        localStorage.removeItem('token')
        localStorage.removeItem('catname')
        localStorage.removeItem('userid')
        localStorage.clear()
        if (localStorage.getItem('token') == '' && localStorage.getItem('catname') == '' && localStorage.getItem('userid') == '') {
            window.location.replace('/login')
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('catname')
            localStorage.removeItem('userid')
            localStorage.clear()
            window.location.replace('/login')
        }
    }


    saveAccount(user) {
        return axios.post(StockConn.wholePath.name + "/account/", user, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }

    changePassword(user, id) {
        return axios.put(StockConn.wholePath.name + "/account/changePassword/" + id, user, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }


    saveItemCategory(itemsCategory) {
        return axios.post(StockConn.wholePath.name + "/itemsCategory/", itemsCategory, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveItem(mdl_items, itemsCategoryId) {
        return axios.post(StockConn.wholePath.name + "/items/" + itemsCategoryId, mdl_items, { headers: StockConn.GetToken }).catch((err) => StockCommons.RedirectToLogin())
    }
    savewhMovement(mdl_Hw_movement) {
        return axios.post(StockConn.wholePath.name + "/hwmovement/", mdl_Hw_movement, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    savePurchases(mdl_purchases, accountId, itemsId, carrier, reference) {
        return axios.post(StockConn.wholePath.name + "/purchases/" + accountId + "/" + itemsId + "/" + carrier + "/" + reference, mdl_purchases, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveReturn(mdl_sales, accountId, itemsId, carrier, reference) {
        return axios.post(StockConn.wholePath.name + "/return/" + accountId + "/" + itemsId + "/" + carrier + "/" + reference, mdl_sales, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveDamage(mdl_sales, accountId, itemsId, reference) {
        return axios.post(StockConn.wholePath.name + "/damage/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveSales(mdl_sales, accountId, itemsId, reference) {
        return axios.post(StockConn.wholePath.name + "/sales/" + accountId + "/" + itemsId + "/" + reference, mdl_sales, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveMultipleSales(myArray) {
        return axios.post(StockConn.wholePath.name + '/sales/mItems', myArray), { headers: StockConn.GetToken };
    }
    savePurcSalesJournal(mdl_Sale_purchase_journal) {
        return axios.post(StockConn.wholePath.name + "/Sale_purchase_journal/", mdl_Sale_purchase_journal, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveSettings(mdl_settings) {/*save a new one*/
        return axios.post(StockConn.sbp.name + "/settings/", mdl_settings, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveExpenses(mdl_expenses, accountId) {
        return axios.post(StockConn.wholePath.name + "/expenses/" + accountId, mdl_expenses, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )

    }

    updateSettings(mdl_settings) {/*update a setting */
        return axios.put(StockConn.sbp.name + "/settings/", mdl_settings, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updatePurchase(id, itemsId, mdl_purchases) {/*update a setting */
        return axios.put(StockConn.wholePath.name + "/purchases/" + id + "/" + itemsId, mdl_purchases, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateSale(id, itemsId, mdl_settings) {/*update a setting */
        return axios.put(StockConn.wholePath.name + "/sales/" + id + "/" + itemsId, mdl_settings, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateItem(item, id, itemsCategoryId) {
        return axios.put(StockConn.wholePath.name + "/items/items/" + id + "/" + itemsCategoryId, item, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateItemCategory(itemCategory, itemsCategoryId) {
        return axios.put(StockConn.wholePath.name + "/itemsCategory/itemsCategory/" + itemsCategoryId, itemCategory, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateAccount(usersDTO, id, profileId, catId) {
        return axios.put(StockConn.wholePath.name + "/account/" + id + "/" + profileId + "/" + catId, usersDTO, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateItemOnlyUnitCost(itemsId, unit_cost) {
        return axios.put(StockConn.wholePath.name + "/items/updateOnlyUnitcost/" + itemsId + "/" + unit_cost, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }









    /* #region  ------------------------------- PORT FUNCTIONS ----------------------------------- */


    saveVessel(vessel) {
        return axios.post(StockConn.wholePath.name + "/vessel/", vessel, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateVessel(vessel, id) {
        return axios.put(StockConn.wholePath.name + "/vessel/" + id, vessel, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveBooking(booking, vesselId) {
        return axios.post(StockConn.wholePath.name + "/booking/" + vesselId, booking, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateBooking(booking, id) {
        return axios.put(StockConn.wholePath.name + "/booking/" + id, booking, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveEntry(entry) {
        return axios.post(StockConn.wholePath.name + "/entry/", entry, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateEntry(entry, id) {
        return axios.put(StockConn.wholePath.name + "/entry/" + id, entry, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveArrival_note(arrival_note) {
        return axios.post(StockConn.wholePath.name + "/arrival_note/", arrival_note, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateArrival_note(arrival_note, id) {
        return axios.put(StockConn.wholePath.name + "/arrival_note/" + id, arrival_note, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveTallyin(tallyin) {
        return axios.post(StockConn.wholePath.name + "/tallyin/", tallyin, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateTallyin(tallyin, id) {
        return axios.put(StockConn.wholePath.name + "/tallyin/" + id, tallyin, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveTallyout(tallyout) {
        return axios.post(StockConn.wholePath.name + "/tallyout/", tallyout, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateTallyout(tallyout, id) {
        return axios.put(StockConn.wholePath.name + "/tallyout/" + id, tallyout, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveItem(item) {
        return axios.post(StockConn.wholePath.name + "/item/", item, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateItem(item, id) {
        return axios.put(StockConn.wholePath.name + "/item/" + id, item, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveItem_cat(item_cat) {
        return axios.post(StockConn.wholePath.name + "/item_cat/", item_cat, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateItem_cat(item_cat, id) {
        return axios.put(StockConn.wholePath.name + "/item_cat/" + id, item_cat, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveStockout_lines(stockout_lines) {
        return axios.post(StockConn.wholePath.name + "/stockout_lines/", stockout_lines, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateStockout_lines(stockout_lines, id) {
        return axios.put(StockConn.wholePath.name + "/stockout_lines/" + id, stockout_lines, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveCargo_dest(cargo_dest) {
        return axios.post(StockConn.wholePath.name + "/cargo_dest/", cargo_dest, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateCargo_dest(cargo_dest, id) {
        return axios.put(StockConn.wholePath.name + "/cargo_dest/" + id, cargo_dest, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveStock_out(stock_out) {
        return axios.post(StockConn.wholePath.name + "/stock_out/", stock_out, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateStock_out(stock_out, id) {
        return axios.put(StockConn.wholePath.name + "/stock_out/" + id, stock_out, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveInvoice_pay_items(invoice_pay_items) {
        return axios.post(StockConn.wholePath.name + "/invoice_pay_items/", invoice_pay_items, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateInvoice_pay_items(invoice_pay_items, id) {
        return axios.put(StockConn.wholePath.name + "/invoice_pay_items/" + id, invoice_pay_items, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveInvpayitem_invoice(invpayitem_invoice) {
        return axios.post(StockConn.wholePath.name + "/invpayitem_invoice/", invpayitem_invoice, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateInvpayitem_invoice(invpayitem_invoice, id) {
        return axios.put(StockConn.wholePath.name + "/invpayitem_invoice/" + id, invpayitem_invoice, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveInvoice(invoice) {
        return axios.post(StockConn.wholePath.name + "/invoice/", invoice, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateInvoice(invoice, id) {
        return axios.put(StockConn.wholePath.name + "/invoice/" + id, invoice, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    savePayment(payment) {
        return axios.post(StockConn.wholePath.name + "/payment/", payment, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updatePayment(payment, id) {
        return axios.put(StockConn.wholePath.name + "/payment/" + id, payment, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveInvpayitem_payt(invpayitem_payt) {
        return axios.post(StockConn.wholePath.name + "/invpayitem_payt/", invpayitem_payt, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateInvpayitem_payt(invpayitem_payt, id) {
        return axios.put(StockConn.wholePath.name + "/invpayitem_payt/" + id, invpayitem_payt, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveProc_one(proc_one) {
        return axios.post(StockConn.wholePath.name + "/proc_one/", proc_one, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateProc_one(proc_one, id) {
        return axios.put(StockConn.wholePath.name + "/proc_one/" + id, proc_one, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveProc_two_three(proc_two_three) {
        return axios.post(StockConn.wholePath.name + "/proc_two_three/", proc_two_three, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateProc_two_three(proc_two_three, id) {
        return axios.put(StockConn.wholePath.name + "/proc_two_three/" + id, proc_two_three, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveExits(exits) {
        return axios.post(StockConn.wholePath.name + "/exits/", exits, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateExits(exits, id) {
        return axios.put(StockConn.wholePath.name + "/exits/" + id, exits, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveProc_four(proc_four) {
        return axios.post(StockConn.wholePath.name + "/proc_four/", proc_four, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateProc_four(proc_four, id) {
        return axios.put(StockConn.wholePath.name + "/proc_four/" + id, proc_four, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }



    saveBerthing(berthing) {
        return axios.post(StockConn.wholePath.name + "/berthing/", berthing, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateBerthing(berthing, id) {
        return axios.put(StockConn.wholePath.name + "/berthing/" + id, berthing, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveInvoice(invoice) {
        return axios.post(StockConn.wholePath.name + "/invoice/", invoice, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateInvoice(invoice, id) {
        return axios.put(StockConn.wholePath.name + "/invoice/" + id, invoice, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    saveUnberthing(unberthing) {
        return axios.post(StockConn.wholePath.name + "/unberthing/", unberthing, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    updateUnberthing(unberthing, id) {
        return axios.put(StockConn.wholePath.name + "/unberthing/" + id, unberthing, { headers: StockConn.GetToken }).catch((err) =>
            StockCommons.RedirectToLogin()
        )
    }
    /* #endregion */


}

export default new StockCommons()
