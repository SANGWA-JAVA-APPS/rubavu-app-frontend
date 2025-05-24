import axios from 'axios'
import React, { Component } from 'react'
import Conn from './Conn';
import Commons from './Commons';
import StockConn from './StockServices/StockConn'


class Repository {
    static page = (Repository.page < 1 || Repository.page == undefined) ? 1 : Repository.page;
    static size = (Repository.size < 1) ? 50 : Repository.size;
    static server = Conn.wholePath.name; //http://localhost:8081/appointment/api/account
    static headers = Conn.LoginToken
    static getHeaders = Conn.GetToken

    /* #region  ---------------------------------Authenticate requests--------------------------------- */
    findAccountById(id) {
        return axios.get(Repository.server + "/account/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    findCategories() {
        return axios.get(Repository.server + "/", { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    Login(authRequest) {

        return axios.post(Conn.server.name + Conn.port.val + "authenticate", authRequest, { headers: Repository.headers }
        ).catch(() => { Commons.RedirectToLogin() })
    }
    findCategoriesCount() {
        return axios.get(Repository.server + "/count/",
            {
                withCredentials: true
            }
        ).catch(() => { Commons.RedirectToLogin() })
    }

    findDatacount() {
        return axios.get(Repository.server + '/appointment/datacount'

        ).catch(() => { Commons.RedirectToLogin() })
    }
    findProfile() {
        return axios.get(Repository.server + "/profile/").catch(() => { Commons.RedirectToLogin() })
    }
    findProfileById(id) {
        return axios.get(Repository.server + "/profile/profile/" + id, { headers: Repository.getHeaders }).catch(() => {console.log(err) })
    }

    findCombinedInvoices() {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        };
        return axios.get(StockConn.wholePath.name + "/combinedInvoices/all", { headers: headers }).catch((error) => { 
            console.error('Error fetching combined invoices:', error);
            Commons.RedirectToLogin();
        });
    }
    findCombinedInvoicesByStartAndEnd(start, end) {
            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            };
        return axios.get(StockConn.wholePath.name + "/combinedInvoices/by-date-range", { 
            headers: headers,
            params: {
                startDate: start,
                endDate: end
            }
        })
    }

    findAccount() {
        return axios.get(Repository.server + "/account", { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    ///
    findUserAndProfileByCategory(name) {
        return axios.get(Repository.server + "/account/byDoctor/" + name, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    findAccount_category() {
        return axios.get(Repository.server + "/category/", { headers: Repository.getHeaders })
            .catch(() => Commons.RedirectToLogin())
    }
    finditemsCategory() {
        return axios.get(Repository.server + "/itemsCategory", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }
    findItem_categoryById(id) {
        return axios.get(Repository.server + "/itemsCategory/itemsCategory/" + id, { headers: Repository.getHeaders })
        //.catch(() => Commons.RedirectToLogin())
    }
    findProfile() {
        return axios.get(Repository.server + "/profile", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }

    findItems(page, size) {
        let config = {
            headers: Repository.getHeaders,
            params: {
                page: page, size: size
            },

        }
        return axios.get(Repository.server + "/items", config)
            .catch((err) =>
                Commons.RedirectToLogin()
            )
    }
    allNopagination() {
        return axios.get(Repository.server + "/items/search/items/allnopagination", { headers: Repository.getHeaders })
            .catch(() => Commons.RedirectToLogin())
    }
    findAppointment() {   //localhost:8081/appointment/api/
        return axios.get(Repository.server + "/appointment", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }


    findServ_group() {
        return axios.get(Repository.server + "/serv_group", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }
    findCustomers() {
        return axios.get(Repository.server + "/account", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())

    }
    ///
    findusersByCategory(name1, name2) {
        return axios.get(Repository.server + "/account/byPatient/" + name1 + "/" + name2, { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())

    }

    saveImages(formData) {
        return axios.post(Repository.server + "/images/img", formData, { headers: Repository.getHeaders })
    }
    findImages() {

        var GetToken = {
            'Content-Type': 'multipart/formdata',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        return axios.get(Repository.server + "/images/display", { headers: GetToken })

    }

    findImagesProduct() {
        return axios.get(Repository.server + "/images/getProduct/ImagesTogether", { headers: Repository.getHeaders })
    }

    findOrders() {
        return axios.get(Repository.server + "/orders", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }
    findOrdersByStatus(served) {
        return axios.get(Repository.server + "/orders/ordersByStatus/order/byStatus/ServedOrnot/" + served, { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }
    findOrdersNoStatus() {
        return axios.get(Repository.server + "/orders/ordersByStatus/order/byStatus/ServedOrnot", { headers: Repository.getHeaders }).catch(() => Commons.RedirectToLogin())
    }
    findProduct() {
        return axios.get(Repository.server + "/product/", { headers: Repository.getHeaders })

    }
    /* #endregion */


    /* #region  ---------------------------------Pub requests ----------------------------------------- */
    findPubusersByCategory(name) {
        return axios.get(Conn.PubWholePath.name + "/byPatient/" + name).catch((err) =>
            Commons.RedirectToLogin()

        )

    }

    findPubServ_group() {
        return axios.get(Conn.PubWholePath.name + "/serv_Group").catch((err) =>
            Commons.RedirectToLogin()

        )
    }
    findPubImagesProduct() {
        return axios.get(Conn.PubWholePath.name + "/images/getProduct/ImagesTogether")
    }
    findProductById(id) {
        return axios.get(Conn.PubWholePath.name + "/" + id)
    }
    sendSms(id) {
        return axios.get(Conn.PubWholePath.name + "/" + id)
    }

    savePubAppointment(mdl_appointment, service_grp_id) {
        return axios.post(Conn.PubWholePath.name + '/add/' + service_grp_id, mdl_appointment)
    }

    /* #endregion */





    /* #region  -----------------------Warehouse ------------------------------------------- */

 
    findVessel() {
        return axios.get(Repository.server + "/vessel/")
    }
    findVesselById(id) {
        return axios.get(Repository.server + "/vessel/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findBooking() {
        return axios.get(Repository.server + "/booking/")
    }
    findBookingById(id) {
        return axios.get(Repository.server + "/booking/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findEntry() {
        return axios.get(Repository.server + "/entry/")
    }
    findEntryById(id) {
        return axios.get(Repository.server + "/entry/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findArrival_note() {
        return axios.get(Repository.server + "/arrival_note/")
    }
    findArrival_noteById(id) {
        return axios.get(Repository.server + "/arrival_note/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findTallyin() {
        return axios.get(Repository.server + "/tallyin/")
    }
    findTallyinById(id) {
        return axios.get(Repository.server + "/tallyin/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findTallyout() {
        return axios.get(Repository.server + "/tallyout/")
    }
    findTallyoutById(id) {
        return axios.get(Repository.server + "/tallyout/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findItem() {
        return axios.get(Repository.server + "/item/")
    }
    findItemById(id) {
        return axios.get(Repository.server + "/item/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findItem_cat() {
        return axios.get(Repository.server + "/item_cat/")
    }
    findItem_catById(id) {
        return axios.get(Repository.server + "/item_cat/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findStockout_lines() {
        return axios.get(Repository.server + "/stockout_lines/")
    }
    findStockout_linesById(id) {
        return axios.get(Repository.server + "/stockout_lines/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findCargo_dest() {
        return axios.get(Repository.server + "/cargo_dest/")
    }
    findCargo_destById(id) {
        return axios.get(Repository.server + "/cargo_dest/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findStock_out() {
        return axios.get(Repository.server + "/stock_out/")
    }
    findStock_outById(id) {
        return axios.get(Repository.server + "/stock_out/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findInvoice_pay_items() {
        return axios.get(Repository.server + "/invoice_pay_items/")
    }
    findInvoice_pay_itemsById(id) {
        return axios.get(Repository.server + "/invoice_pay_items/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findInvpayitem_invoice() {
        return axios.get(Repository.server + "/invpayitem_invoice/")
    }
    findInvpayitem_invoiceById(id) {
        return axios.get(Repository.server + "/invpayitem_invoice/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findInvoice() {
        return axios.get(Repository.server + "/invoice/")
    }
    findInvoiceById(id) {
        return axios.get(Repository.server + "/invoice/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findPayment() {
        return axios.get(Repository.server + "/payment/")
    }
    findPaymentById(id) {
        return axios.get(Repository.server + "/payment/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findInvpayitem_payt() {
        return axios.get(Repository.server + "/invpayitem_payt/")
    }
    findInvpayitem_paytById(id) {
        return axios.get(Repository.server + "/invpayitem_payt/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findProc_one() {
        return axios.get(Repository.server + "/proc_one/")
    }
    findProc_oneById(id) {
        return axios.get(Repository.server + "/proc_one/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findProc_two_three() {
        return axios.get(Repository.server + "/proc_two_three/")
    }
    findProc_two_threeById(id) {
        return axios.get(Repository.server + "/proc_two_three/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findExits() {
        return axios.get(Repository.server + "/exits/")
    }
    findExitsById(id) {
        return axios.get(Repository.server + "/exits/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    //---\n

    findProc_four() {
        return axios.get(Repository.server + "/proc_four/")
    }
    findProc_fourById(id) {
        return axios.get(Repository.server + "/proc_four/" + id, { headers: Repository.getHeaders }).catch(() => { Commons.RedirectToLogin() })
    }
    /* #endregion */






}

export default new Repository()
