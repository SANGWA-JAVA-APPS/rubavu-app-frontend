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


    getHeaders(authHeader) {
        return StockConn.GetToken(authHeader);
    }
    saveAccount(user, authHeader) {
        return axios.post(StockConn.wholePath.name + "/account/", user, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    changePassword(user, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/account/changePassword/" + id, user, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveItemCategory(itemsCategory, authHeader) {
        return axios.post(StockConn.wholePath.name + "/itemsCategory/", itemsCategory, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveItem(mdl_items, itemsCategoryId, authHeader) {
        return axios.post(StockConn.wholePath.name + "/items/" + itemsCategoryId, mdl_items, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    savewhMovement(mdl_Hw_movement, authHeader) {
        return axios.post(StockConn.wholePath.name + "/hwmovement/", mdl_Hw_movement, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    savePurchases(mdl_purchases, accountId, itemsId, carrier, reference, arrival_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/purchases/" + accountId + "/" + itemsId + "/" + carrier + "/" + reference + "/" + arrival_id,
            mdl_purchases,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => {
            console.error('Axios Error:', {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data,
                headers: err.response?.headers,
            });
        });
    }

    saveReturn(mdl_sales, accountId, itemsId, carrier, reference, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/return/" + accountId + "/" + itemsId + "/" + carrier + "/" + reference,
            mdl_sales,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveDamage(mdl_sales, accountId, itemsId, reference, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/damage/" + accountId + "/" + itemsId + "/" + reference,
            mdl_sales,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveSales(mdl_sales_lines, accountId, itemsId, reference, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/sales/" + accountId + "/" + itemsId + "/" + reference,
            mdl_sales_lines,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveMultipleSales(myArray, authHeader) {
        return axios.post(StockConn.wholePath.name + '/sales/mItems', myArray, { headers: this.getHeaders(authHeader) });
    }

    savePurcSalesJournal(mdl_Sale_purchase_journal, authHeader) {
        return axios.post(StockConn.wholePath.name + "/Sale_purchase_journal/", mdl_Sale_purchase_journal, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveSettings(mdl_settings, authHeader) {
        return axios.post(StockConn.sbp.name + "/settings/", mdl_settings, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveExpenses(mdl_expenses, accountId, authHeader) {
        return axios.post(StockConn.wholePath.name + "/expenses/" + accountId, mdl_expenses, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateSettings(mdl_settings, authHeader) {
        return axios.put(StockConn.sbp.name + "/settings/", mdl_settings, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updatePurchase(id, itemsId, mdl_purchases, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/purchases/" + id + "/" + itemsId,
            mdl_purchases,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateSale(id, itemsId, mdl_settings, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/sales/" + id + "/" + itemsId,
            mdl_settings,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateItem(item, id, itemsCategoryId, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/items/items/" + id + "/" + itemsCategoryId,
            item,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateItemCategory(itemCategory, itemsCategoryId, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/itemsCategory/itemsCategory/" + itemsCategoryId,
            itemCategory,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateAccount(usersDTO, id, profileId, catId, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/account/" + id + "/" + profileId + "/" + catId,
            usersDTO,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateItemOnlyUnitCost(itemsId, unit_cost, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/items/updateOnlyUnitcost/" + itemsId + "/" + unit_cost,
            null,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    /* #region  ------------------------------- PORT FUNCTIONS ----------------------------------- */

    saveVessel(vessel, authHeader) {
        return axios.post(StockConn.wholePath.name + "/vessel/", vessel, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateVessel(vessel, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/vessel/" + id, vessel, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveBooking(booking, vesselId, authHeader) {
        return axios.post(StockConn.wholePath.name + "/booking/" + vesselId, booking, { headers: this.getHeaders(authHeader) });
    }

    updateBooking(booking, id, vessel_id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/booking/" + id + '/' + vessel_id,
            booking,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveEntry(entry, authHeader) {
        return axios.post(StockConn.wholePath.name + "/entry/", entry, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateEntry(entry, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/entry/" + id, entry, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveArrival_note(arrival_note, chosenProcessId, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/arrival_note/" + chosenProcessId,
            arrival_note,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }
    updateArrival_note(arrival_note, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/arrival_note/" + id, arrival_note,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }
    saveExistingarrival(arrival_note, arrival_id, chosenProcessId, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/arrival_note/existingarrival/" + arrival_id + '/' + chosenProcessId,
            arrival_note,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }



    saveTallyin(tallyin, authHeader) {
        return axios.post(StockConn.wholePath.name + "/tallyin/", tallyin, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateTallyin(tallyin, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/tallyin/" + id, tallyin, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveTallyout(tallyout, authHeader) {
        return axios.post(StockConn.wholePath.name + "/tallyout/", tallyout, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateTallyout(tallyout, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/tallyout/" + id, tallyout, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveItem(item, authHeader) {
        return axios.post(StockConn.wholePath.name + "/item/", item, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateItem(item, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/item/" + id, item, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveItem_cat(item_cat, authHeader) {
        return axios.post(StockConn.wholePath.name + "/item_cat/", item_cat, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateItem_cat(item_cat, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/item_cat/" + id, item_cat, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveStockout_lines(stockout_lines, authHeader) {
        return axios.post(StockConn.wholePath.name + "/stockout_lines/", stockout_lines, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateStockout_lines(stockout_lines, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/stockout_lines/" + id,
            stockout_lines,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveCargo_dest(cargo_dest, authHeader) {
        return axios.post(StockConn.wholePath.name + "/cargo_dest/", cargo_dest, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateCargo_dest(cargo_dest, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/cargo_dest/" + id, cargo_dest, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveStock_out(stock_out, authHeader) {
        return axios.post(StockConn.wholePath.name + "/stock_out/", stock_out, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateStock_out(stock_out, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/stock_out/" + id, stock_out, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveInvoice_pay_items(invoice_pay_items, authHeader) {
        return axios.post(StockConn.wholePath.name + "/invoice_pay_items/", invoice_pay_items, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateInvoice_pay_items(invoice_pay_items, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/invoice_pay_items/" + id,
            invoice_pay_items,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveInvpayitem_invoice(invpayitem_invoice, authHeader) {
        return axios.post(StockConn.wholePath.name + "/invpayitem_invoice/", invpayitem_invoice, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateInvpayitem_invoice(invpayitem_invoice, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/invpayitem_invoice/" + id,
            invpayitem_invoice,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveInvoice(mdl_invoice, vessel_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/invoice/" + vessel_id,
            mdl_invoice,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateInvoice(mdl_invoice, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/invoice/" + id, mdl_invoice, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    savePayment(payment, authHeader) {
        return axios.post(StockConn.wholePath.name + "/payment/", payment, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updatePayment(payment, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/payment/" + id, payment, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveInvpayitem_payt(invpayitem_payt, authHeader) {
        return axios.post(StockConn.wholePath.name + "/invpayitem_payt/", invpayitem_payt, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateInvpayitem_payt(invpayitem_payt, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/invpayitem_payt/" + id,
            invpayitem_payt,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveProc_one(proc_one, authHeader) {
        return axios.post(StockConn.wholePath.name + "/proc_one/", proc_one, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateProc_one(proc_one, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/proc_one/" + id, proc_one, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveProc_two_three(proc_two_three, authHeader) {
        return axios.post(StockConn.wholePath.name + "/proc_two_three/", proc_two_three, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateProc_two_three(proc_two_three, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/proc_two_three/" + id,
            proc_two_three,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveExits(exits, authHeader) {
        return axios.post(StockConn.wholePath.name + "/exits/", exits, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateExits(exits, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/exits/" + id, exits, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveProc_four(proc_four, authHeader) {
        return axios.post(StockConn.wholePath.name + "/proc_four/", proc_four, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    updateProc_four(proc_four, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/proc_four/" + id, proc_four, { headers: this.getHeaders(authHeader) }).catch((err) =>
            StockCommons.RedirectToLogin()
        );
    }

    saveBerthing(berthing, vessel_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/berthing/" + vessel_id,
            berthing,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateBerthing(berthing, id, vesselId, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/berthing/" + id + '/' + vesselId,
            berthing,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveUnberthing(unberthing, vessel_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/unberthing/" + vessel_id,
            unberthing,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    updateUnberthing(unberthing, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/unberthing/" + id,
            unberthing,
            { headers: this.getHeaders(authHeader) }
        ).catch((err) => StockCommons.RedirectToLogin());
    }

    saveTruck(truck, authHeader) {
        return axios.post(StockConn.wholePath.name + "/truck/", truck, { headers: this.getHeaders(authHeader) });
    }

    saveTruck_entry(truck_entry, authHeader) {
        return axios.post(StockConn.wholePath.name + "/truck_entry/", truck_entry, { headers: this.getHeaders(authHeader) });
    }

    updateTruck_entry(truck_entry, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/truck_entry/" + id, truck_entry, { headers: this.getHeaders(authHeader) }
        );
    }

    updateTruck(truck, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/truck/" + id, truck, { headers: this.getHeaders(authHeader) });
    }

    saveTruck_parking_invoice(truck_parking_invoice, truck_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/truck_parking_invoice/" + truck_id,
            truck_parking_invoice,
            { headers: this.getHeaders(authHeader) }
        );
    }

    saveTruck_payment(mdl_truck_payment, invoice_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/truck_payment/" + invoice_id, mdl_truck_payment,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateTruck_parking_invoice(truck_parking_invoice, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/truck_parking_invoice/" + id,
            truck_parking_invoice,
            { headers: this.getHeaders(authHeader) }
        );
    }

    saveTruck_exit(truck_exit, truck_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/truck_exit/" + truck_id,
            truck_exit,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateTruck_exit(truck_exit, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/truck_exit/" + id,
            truck_exit,
            { headers: this.getHeaders(authHeader) }
        );
    }

    saveClient(client, authHeader) {
        return axios.post(StockConn.wholePath.name + "/client/", client, { headers: this.getHeaders(authHeader) });
    }

    updateClient(client, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/client/" + id, client, { headers: this.getHeaders(authHeader) });
    }

    saveTally(client, arrival_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/tally/" + arrival_id,
            client,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateTally(client, id, authHeader) {
        return axios.put(StockConn.wholePath.name + "/tally/" + id, client, { headers: this.getHeaders(authHeader) });
    }

    saveGen_invoice(gen_invoice, arrival_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/gen_invoice/" + arrival_id,
            gen_invoice,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateGen_invoice(gen_invoice, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/gen_invoice/" + id,
            gen_invoice,
            { headers: this.getHeaders(authHeader) }
        );
    }

    saveGen_receipt(gen_receipt, invoice, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/gen_receipt/" + invoice,
            gen_receipt,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateGen_receipt(gen_receipt, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/gen_receipt/" + id,
            gen_receipt,
            { headers: this.getHeaders(authHeader) }
        );
    }

    saveGen_exit(gen_exit, gen_receiptId, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/gen_exit/" + gen_receiptId,
            gen_exit,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateGen_exit(gen_exit, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/gen_exit/" + id,
            gen_exit,
            { headers: this.getHeaders(authHeader) }
        );
    }

    saveBerthpayment(berthpayment, invoice_id, authHeader) {
        return axios.post(
            StockConn.wholePath.name + "/berthpayment/" + invoice_id,
            berthpayment,
            { headers: this.getHeaders(authHeader) }
        );
    }

    updateBerthpayment(berthpayment, id, authHeader) {
        return axios.put(
            StockConn.wholePath.name + "/berthpayment/" + id,
            berthpayment,
            { headers: this.getHeaders(authHeader) }
        );
    }
    updateWarehouse(itemId, arrivalId, quantity, newQuantity, userid,totalAmount,totalWeights ,authHeader) {
        return axios.post(StockConn.wholePath.name + "/arrival_note/removefromwh/" + itemId + '/' + arrivalId + '/' + quantity + '/' + newQuantity + '/' + userid+'/'+totalAmount+'/'+totalWeights,
            { headers: this.getHeaders(authHeader) }
        );
    }

    /* #endregion */


}

export default new StockCommons()
