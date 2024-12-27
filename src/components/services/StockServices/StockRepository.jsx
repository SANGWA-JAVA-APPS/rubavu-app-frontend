import axios from 'axios'
import React, { Component } from 'react'
import StockConn from './StockConn';
import StockCommons from './StockCommons';

class StockRepository {
    static page = (StockRepository.page < 1 || StockRepository.page == undefined) ? 1 : StockRepository.page;
    static size = (StockRepository.size < 1) ? 50 : StockRepository.size;
    static server = StockConn.wholePath.name;
    // static url = "http://" + Repository.server + ":8089/guru/api"

    static headers = StockConn.LoginToken
    static getHeaders = StockConn.GetToken

    findAccountById(id) {
        return axios.get(StockRepository.server + "/account/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }

    findCategories() {
        return axios.get(StockRepository.server + "/")
    }
    Login(authRequest) {

        return axios.post(StockConn.server.name + StockConn.port.val + "authenticate", authRequest, { headers: StockRepository.headers }
        )
    }
    findCategoriesCount() {
        return axios.get(StockRepository.server + "/count/",
            {
                withCredentials: true
            }
        )
    }

    findAccount = () => axios.get(StockRepository.server + "/account/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })

    disableUser(status, id) {
        return axios.get(StockRepository.server + "/account/disableOrEnable/users/byStatus/" + status + '/' + id, { headers: StockRepository.getHeaders })
    }
    findAccountByStatus(status) {
        return axios.get(StockRepository.server + "/account/users/byStatus/" + status, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findAccount_category() {
        return axios.get(StockRepository.server + "/category/", { headers: StockRepository.getHeaders })
            .catch(() => StockCommons.RedirectToLogin())
    }
    findHw_movement(SearchByDateOnly) {
        return axios.post(StockRepository.server + "/hwmovement/searchbydate/sameday/noType/all", SearchByDateOnly, { headers: StockRepository.getHeaders }).catch((e) => () => StockCommons.RedirectToLogin())
    }
    groupByInOut(SearchByDateOnly) {
        return axios.post(StockRepository.server + "/hwmovement/searchbydate/sameday/noType/groupByInOut", SearchByDateOnly, { headers: StockRepository.getHeaders }).catch((e) => () => StockCommons.RedirectToLogin())
    }
    findWhmByType(type) {
        return axios.get(StockRepository.server + "/hwmovement/whmByType/" + type, { headers: StockRepository.getHeaders })
        // .catch(() => StockCommons.RedirectToLogin())
    }

    finditemsCategory() {
        return axios.get(StockRepository.server + "/itemsCategory", { headers: StockRepository.getHeaders }).catch(() => StockCommons.RedirectToLogin())
    }
    findItem_categoryById(id) {
        return axios.get(StockRepository.server + "/itemsCategory/itemsCategory/" + id, { headers: StockRepository.getHeaders }).catch(() => StockCommons.RedirectToLogin())
    }
    findProfile() {
        return axios.get(StockRepository.server + "/profile", { headers: StockRepository.getHeaders }).catch(() => StockCommons.RedirectToLogin())
    }
    findSale_purchase_journal() {
        return axios.get(StockRepository.server + "/Sale_purchase_journal", { headers: StockRepository.getHeaders }).catch(() => StockCommons.RedirectToLogin())
    }
    findSales(salesDateDTO) {
        return axios.post(StockRepository.server + "/sales", salesDateDTO, { headers: StockRepository.getHeaders }).catch(() => StockCommons.RedirectToLogin())
    }
    findPurchases(purchaseDatesDTO) {
        return axios.post(StockRepository.server + "/purchases", purchaseDatesDTO, { headers: StockRepository.getHeaders }).catch(() => StockCommons.RedirectToLogin())
    }
    findItem_category(page, size) {
        let config = {
            headers: StockRepository.getHeaders,
            params: {
                page: page, size: size
            },
        }
        return axios.get(StockRepository.server + "/itemsCategory", config).catch(() => StockCommons.RedirectToLogin())
    }
    findItems(page, size) {
        let config = {
            headers: StockRepository.getHeaders,
            params: {
                page: page, size: size
            },
        }
        return axios.get(StockRepository.server + "/items", config)
            .catch((err) =>
                StockCommons.RedirectToLogin()
            )
    }


    findItemsCount() {
        return axios.get(StockRepository.server + "/items/itemsCount/", { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin()// Commons.RedirectToLogin()
        )
    }
    findItemsById(id) {
        return axios.get(StockRepository.server + "/items/items/" + id, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 

    }

    findPurhcaseLinesById(id) {
        return axios.get(StockRepository.server + "/purchases/" + id, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 

    }
    findSalesById(id) {
        return axios.get(StockRepository.server + "/sales/" + id, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 

    }
    findItemLike_ByDateLike(mdl_WhMovtItemLike) {
        return axios.post(StockRepository.server + "/hwmovement/searchby/date/item/like/type", mdl_WhMovtItemLike, { headers: StockRepository.getHeaders })

    }
    findItemLike_ByanItemid(mdl_ItemSearchById) {
        return axios.post(StockRepository.server + "/hwmovement/searchby/date/item/like/type/id", mdl_ItemSearchById, { headers: StockRepository.getHeaders })
    }


    findItemByDate(Mdl_SearchItemDate_itemName) {
        return axios.post(StockRepository.server + "/Sale_purchase_journal/searchItem", Mdl_SearchItemDate_itemName, { headers: StockRepository.getHeaders })

    }
    countWmvntByType(Mdl_SearchItemDate_itemName) {
        return axios.post(StockRepository.server + "/Sale_purchase_journal/countWmvntByType", Mdl_SearchItemDate_itemName, { headers: StockRepository.getHeaders })

    }
    findMostMoved(Mdl_SearchItemDate_itemName) {
        return axios.post(StockRepository.server + "/items/mostMoved", Mdl_SearchItemDate_itemName, { headers: StockRepository.getHeaders })

    }


    findHw_movementByReference(reference) {
        return axios.get(StockRepository.server + "/hwmovement/" + reference, { headers: StockRepository.getHeaders })
        // .catch(() => StockCommons.RedirectToLogin())
    }
    allNopagination() {
        return axios.get(StockRepository.server + "/items/search/items/allnopagination", { headers: StockRepository.getHeaders })
        // .catch(() => StockCommons.RedirectToLogin())
    }
    findItemssbyname(itemname) {
        return axios.get(StockRepository.server + "/items/itembynamelike/" + itemname, { headers: StockRepository.getHeaders })
    }
    findHw_movementById(id) {
        return axios.get(StockRepository.server + "/hwmovement/" + id, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    findDailyreport(SearchByDateOnly) {
        return axios.post(StockRepository.server + "/dailyreport/getTodayReport", SearchByDateOnly, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    findExpenses() {
        return axios.get(StockRepository.server + "/expenses/", { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    findExpenseByDate(searchByDateOnly) {
        return axios.get(StockRepository.server + "/expenses/", searchByDateOnly, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    conf() {
        return axios.get(StockRepository.server + "/items/conf", { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    getAllSettings() {
        return axios.get(StockRepository.server + "/currency/", { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    getSettingByName(currencyName) {
        return axios.get(StockRepository.server + "/currency/" + currencyName, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 
    }


    getSummary(purchaseDatesDTO) {
        return axios.post(StockRepository.server + "/purchase/summaryReport", purchaseDatesDTO, { headers: StockRepository.getHeaders }).catch((err) => StockCommons.RedirectToLogin())// 

    }
    findClient() {
        return axios.get(StockRepository.server + "/client/")
    }
    findVessel() {
        let config = {
            headers: StockRepository.getHeaders,
            params: {
                page: page, size: size
            },
        }
        return axios.get(StockRepository.server + "/vessel/")
    }
    findVesselByOperator(name) {
       
        return axios.get(StockRepository.server + "/vessel/vesselByOperator/"+name)
    }
    findVesselByVesselId(id) {
       
        return axios.get(StockRepository.server + "/vessel/total/"+id)
    }
    findBerthing() {
        return axios.get(StockRepository.server + "/berthing/")
    }
    findBerthingById(id) {
        return axios.get(StockRepository.server + "/berthing/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findUnberthing() {
        return axios.get(StockRepository.server + "/unberthing/")
    }
    findUnberthingById(id) {
        return axios.get(StockRepository.server + "/unberthing/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }








    /* #region --------------- RUBAVU PORT FUNCTIONS */



    findVessel() {
        return axios.get(StockRepository.server + "/vessel/", { headers: StockRepository.getHeaders }).catch(() => { 
            StockCommons.RedirectToLogin()
            
         })
    }
    findVesselById(id) {
        return axios.get(StockRepository.server + "/vessel/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findBooking() {
        return axios.get(StockRepository.server + "/booking/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findBookingById(id) {
        return axios.get(StockRepository.server + "/booking/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findEntry() {
        return axios.get(StockRepository.server + "/entry/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findEntryById(id) {
        return axios.get(StockRepository.server + "/entry/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }  

    findArrival_note() {
        return axios.get(StockRepository.server + "/arrival_note/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findArrival_noteById(id) {
        return axios.get(StockRepository.server + "/arrival_note/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findTallyin() {
        return axios.get(StockRepository.server + "/tallyin/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findTallyinById(id) {
        return axios.get(StockRepository.server + "/tallyin/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    
    findTallyout() {
        return axios.get(StockRepository.server + "/tallyout/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findTallyoutById(id) {
        return axios.get(StockRepository.server + "/tallyout/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    
    findItem() {
        return axios.get(StockRepository.server + "/item/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findItemById(id) {
        return axios.get(StockRepository.server + "/item/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findItem_cat() {
        return axios.get(StockRepository.server + "/item_cat/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findItem_catById(id) {
        return axios.get(StockRepository.server + "/item_cat/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    
    findStockout_lines() {
        return axios.get(StockRepository.server + "/stockout_lines/", { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findStockout_linesById(id) {
        return axios.get(StockRepository.server + "/stockout_lines/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findCargo_dest() {
        return axios.get(StockRepository.server + "/cargo_dest/")
    }
    findCargo_destById(id) {
        return axios.get(StockRepository.server + "/cargo_dest/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findStock_out() {
        return axios.get(StockRepository.server + "/stock_out/")
    }
    findStock_outById(id) {
        return axios.get(StockRepository.server + "/stock_out/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findInvoice_pay_items() {
        return axios.get(StockRepository.server + "/invoice_pay_items/")
    }
    findInvoice_pay_itemsById(id) {
        return axios.get(StockRepository.server + "/invoice_pay_items/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findInvpayitem_invoice() {
        return axios.get(StockRepository.server + "/invpayitem_invoice/")
    }
    findInvpayitem_invoiceById(id) {
        return axios.get(StockRepository.server + "/invpayitem_invoice/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findInvoice() {
        return axios.get(StockRepository.server + "/invoice/")
    }
    findInvoiceById(id) {
        return axios.get(StockRepository.server + "/invoice/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findPayment() {
        return axios.get(StockRepository.server + "/payment/")
    }
    findPaymentById(id) {
        return axios.get(StockRepository.server + "/payment/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findInvpayitem_payt() {
        return axios.get(StockRepository.server + "/invpayitem_payt/")
    }
    findInvpayitem_paytById(id) {
        return axios.get(StockRepository.server + "/invpayitem_payt/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findProc_one() {
        return axios.get(StockRepository.server + "/proc_one/")
    }
    findProc_oneById(id) {
        return axios.get(StockRepository.server + "/proc_one/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findProc_two_three() {
        return axios.get(StockRepository.server + "/proc_two_three/")
    }
    findProc_two_threeById(id) {
        return axios.get(StockRepository.server + "/proc_two_three/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findExits() {
        return axios.get(StockRepository.server + "/exits/")
    }
    findExitsById(id) {
        return axios.get(StockRepository.server + "/exits/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    //---\n

    findProc_four() {
        return axios.get(StockRepository.server + "/proc_four/")
    }
    findProc_fourById(id) {
        return axios.get(StockRepository.server + "/proc_four/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }

    saveTruck(truck) {
        return axios.post(StockRepository.server + "/truck/",truck,{ headers: StockRepository.getHeaders })
    }
    getAllTruck(truck) {
        return axios.get(StockRepository.server + "/truck/",truck,{ headers: StockRepository.getHeaders })
    }
    getTruckById(id) {
        return axios.get(StockRepository.server + "/truck/" + id,{ headers: StockRepository.getHeaders })
    }
    updateTruck(id, truck){
        return axios.put(StockRepository.server + "/truck/" + id, truck,{ headers: StockRepository.getHeaders })
    }
    deleteTruck(id){
        return axios.delete(StockRepository.server + "/truck/" + id,{ headers: StockRepository.getHeaders })
    }
    /* #endregion */
}

export default new StockRepository()