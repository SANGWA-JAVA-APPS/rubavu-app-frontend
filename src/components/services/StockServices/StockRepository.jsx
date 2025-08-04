import axios from 'axios'
import React, { Component } from 'react'
import StockConn from './StockConn';
import StockCommons from './StockCommons';
import { useAuthHeader } from 'react-auth-kit';

class StockRepository {
    static page = (StockRepository.page < 1 || StockRepository.page == undefined) ? 1 : StockRepository.page;
    static size = (StockRepository.size < 1) ? 50 : StockRepository.size;
    static server = StockConn.wholePath.name;
    // static url = "http://" + Repository.server + ":8089/guru/api"

    static headers = StockConn.LoginToken
    static getHeaders = StockConn.GetToken


    getHeaders(authHeader) {
        return StockConn.GetToken(authHeader);
    }

    findAccountById(id, authHeader) {
        return axios.get(StockRepository.server + "/account/" + id, { headers: this.getHeaders(authHeader) }).catch(() => { StockCommons.RedirectToLogin() })
    }

    findCategories() {
        return axios.get(StockRepository.server + "/")
    }

    Login(authRequest) {
        return axios.post( "/authenticate", authRequest, { headers: StockRepository.headers }
        )
    }
    findCategoriesCount() {
        return axios.get(StockRepository.server + "/count/",
            {
                withCredentials: true
            }
        )
    }

    findAccount = (authHeader) => axios.get(StockRepository.server + "/account/", { headers: this.getHeaders(authHeader) }).catch(() => { StockCommons.RedirectToLogin() })
    findAccountExcludeClient = (authHeader) => axios.get(StockRepository.server + "/account/usersWithExclusion", { headers: this.getHeaders(authHeader) }).catch(() => { StockCommons.RedirectToLogin() })
    findAccountOfTypeClient = (authHeader) => axios.get(StockRepository.server + "/account/userofTypeClient", { headers: this.getHeaders(authHeader) }).catch(() => { StockCommons.RedirectToLogin() })

    disableUser(status, id, authHeader) {
        return axios.get(StockRepository.server + "/account/disableOrEnable/users/byStatus/" + status + '/' + id, { headers: this.getHeaders(authHeader) })
    }
    findAccountByStatus(status, authHeader) {
        return axios.get(StockRepository.server + "/account/users/byStatus/" + status, { headers: this.getHeaders(authHeader) }).catch(() => { StockCommons.RedirectToLogin() })
    }
    findAccount_category(authHeader) {
        return axios.get(StockRepository.server + "/category/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin())
    }
    getIAndName(authHeader){
          return axios.get(StockRepository.server + "/category/getIAndName", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin())
    }
    findHw_movement(SearchByDateOnly, authHeader) {
        return axios.post(StockRepository.server + "/hwmovement/searchbydate/sameday/noType/all", SearchByDateOnly, { headers: this.getHeaders(authHeader) }).catch((e) => () => StockCommons.RedirectToLogin())
    }
    groupByInOut(SearchByDateOnly, authHeader) {
        return axios.post(StockRepository.server + "/hwmovement/searchbydate/sameday/noType/groupByInOut", SearchByDateOnly, { headers: this.getHeaders(authHeader) }).catch((e) => () => StockCommons.RedirectToLogin())
    }
    findWhmByType(type, authHeader) {
        return axios.get(StockRepository.server + "/hwmovement/whmByType/" + type, { headers: this.getHeaders(authHeader) })
        // .catch(() => StockCommons.RedirectToLogin())
    }

    finditemsCategory(authHeader) {
        return axios.get(StockRepository.server + "/itemsCategory", { headers: this.getHeaders(authHeader) }).catch(() => StockCommons.RedirectToLogin())
    }
    findItem_categoryById(id, authHeader) {
        return axios.get(StockRepository.server + "/itemsCategory/itemsCategory/" + id, { headers: this.getHeaders(authHeader) }).catch(() => StockCommons.RedirectToLogin())
    }
    findProfile(authHeader) {
        return axios.get(StockRepository.server + "/profile", { headers: this.getHeaders(authHeader) }).catch(() => StockCommons.RedirectToLogin())
    }
    findSale_purchase_journal(authHeader) {
        return axios.get(StockRepository.server + "/Sale_purchase_journal", { headers: this.getHeaders(authHeader) }).catch(() => StockCommons.RedirectToLogin())
    }
    findSales(salesDateDTO, authHeader) {
        return axios.post(StockRepository.server + "/sales", salesDateDTO, { headers: this.getHeaders(authHeader) }).catch(() => StockCommons.RedirectToLogin())
    }
    findPurchases(purchaseDatesDTO, authHeader) {
        return axios.post(StockRepository.server + "/purchases", purchaseDatesDTO, { headers: this.getHeaders(authHeader) })
        // .catch(() => {  StockCommons.RedirectToLogin()   }    )
    }
    findItem_category(page, size, authHeader) {
        let config = {
            headers: this.getHeaders(authHeader),
            params: {
                page: page, size: size
            },
        }
        return axios.get(StockRepository.server + "/itemsCategory", config).catch(() => StockCommons.RedirectToLogin())
    }
    findItems(page, size, authHeader) {
        let config = {
            headers: this.getHeaders(authHeader),
            params: {
                page: page, size: size
            },
        }
        return axios.get(StockRepository.server + "/items", config)
            .catch((err) =>
                StockCommons.RedirectToLogin()
            )
    }


    findItemsCount(authHeader) {
        return axios.get(StockRepository.server + "/items/itemsCount/", { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin()// Commons.RedirectToLogin()
        )
    }
    findItemsById(id, authHeader) {
        return axios.get(StockRepository.server + "/items/items/" + id, { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin())// 

    }

    findPurhcaseLinesById(id, authHeader) {
        return axios.get(StockRepository.server + "/purchases/" + id, { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin())// 

    }
    findSalesById(id, authHeader) {
        return axios.get(StockRepository.server + "/sales/" + id, { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin())// 

    }
    findItemLike_ByDateLike(mdl_WhMovtItemLike, authHeader) {
        return axios.post(StockRepository.server + "/hwmovement/searchby/date/item/like/type", mdl_WhMovtItemLike, { headers: this.getHeaders(authHeader) })

    }
    findItemLike_ByanItemid(mdl_ItemSearchById, authHeader) {
        return axios.post(StockRepository.server + "/hwmovement/searchby/date/item/like/type/id", mdl_ItemSearchById, { headers: this.getHeaders(authHeader) })
    }


    findItemByDate(Mdl_SearchItemDate_itemName, authHeader) {
        return axios.post(StockRepository.server + "/Sale_purchase_journal/searchItem", Mdl_SearchItemDate_itemName, { headers: this.getHeaders(authHeader) })

    }
    countWmvntByType(Mdl_SearchItemDate_itemName, authHeader) {
        return axios.post(StockRepository.server + "/Sale_purchase_journal/countWmvntByType", Mdl_SearchItemDate_itemName, { headers: this.getHeaders(authHeader) })

    }
    findMostMoved(Mdl_SearchItemDate_itemName, authHeader) {
        return axios.post(StockRepository.server + "/items/mostMoved", Mdl_SearchItemDate_itemName, { headers: this.getHeaders(authHeader) })

    }


    findHw_movementByReference(reference, authHeader) {
        return axios.get(StockRepository.server + "/hwmovement/" + reference, { headers: this.getHeaders(authHeader) })
        // .catch(() => StockCommons.RedirectToLogin())
    }
    allNopagination(authHeader) {
        return axios.get(StockRepository.server + "/items/search/items/allnopagination", { headers: this.getHeaders(authHeader) })
        // .catch(() => StockCommons.RedirectToLogin())
    }
    findItemssbyname(itemname, authHeader) {
        return axios.get(StockRepository.server + "/items/itembynamelike/" + itemname, { headers: this.getHeaders(authHeader) })
    }
    findHw_movementById(id, authHeader) {
        return axios.get(StockRepository.server + "/hwmovement/" + id, { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    findDailyreport(SearchByDateOnly, authHeader) {
        return axios.post(StockRepository.server + "/dailyreport/getTodayReport", SearchByDateOnly, { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    
    findMonthlyReport(searchByDateRange, authHeader) {
        return axios.post(StockRepository.server + "/dailyreport/getMonthlyReport", searchByDateRange, { headers: this.getHeaders(authHeader) }).catch((err) => StockCommons.RedirectToLogin())// 
    }
    findExpenses(authHeader) {
        return axios.get(StockRepository.server + "/expenses/", { headers: this.getHeaders(authHeader) })
            .catch((err) => StockCommons.RedirectToLogin());
    }

    findExpenseByDate(searchByDateOnly, authHeader) {
        return axios.get(StockRepository.server + "/expenses/", searchByDateOnly, { headers: this.getHeaders(authHeader) })
            .catch((err) => StockCommons.RedirectToLogin());
    }

    conf(authHeader) {
        return axios.get(StockRepository.server + "/items/conf", { headers: this.getHeaders(authHeader) })
            .catch((err) => StockCommons.RedirectToLogin());
    }

    getAllSettings(authHeader) {
        return axios.get(StockRepository.server + "/currency/", { headers: this.getHeaders(authHeader) })
            .catch((err) => StockCommons.RedirectToLogin());
    }

    getSettingByName(currencyName, authHeader) {
        return axios.get(StockRepository.server + "/currency/" + currencyName, { headers: this.getHeaders(authHeader) })
            .catch((err) => StockCommons.RedirectToLogin())
    }

    getSummary(purchaseDatesDTO, authHeader) {
        return axios.post(StockRepository.server + "/purchase/summaryReport", purchaseDatesDTO, { headers: this.getHeaders(authHeader) })
            .catch((err) => StockCommons.RedirectToLogin());
    }

    findClient (limit, page, authHeader)  {
            return axios.get(`${StockRepository.server}/client/?limit=${limit}&page=${page}`, { headers: authHeader }  )
        }
    findClientNoPaging (  authHeader)  {
            return axios.get(`${StockRepository.server}/client/clientsNoPaging/`, { headers: authHeader }  )
        }
        // clientsNoPaging
    findClientCargonById(id, authHeader) {
        return axios.get(StockRepository.server + "/client/findclientCargoById/" + id, { headers: this.getHeaders(authHeader) });

    }
    allCargInWh(authHeader) {
        return axios.get(StockRepository.server + "/client/allCargInWh/", { headers: this.getHeaders(authHeader) });
    }

    findVessel(authHeader) {
        let config = {
            headers: this.getHeaders(authHeader),
            params: {
                page: StockRepository.page, // Assuming page and size are defined elsewhere
                size: StockRepository.size
            },
        };
        return axios.get(StockRepository.server + "/vessel/", config);
    }

    findVesselByOperator(name, authHeader) {
        return axios.get(StockRepository.server + "/vessel/vesselByOperator/" + name, { headers: this.getHeaders(authHeader) });
    }

    findVesselBookedByOperator(name, authHeader) {
        return axios.get(StockRepository.server + "/vessel/bookedVesselByOperator/" + name, { headers: this.getHeaders(authHeader) });
    }

    findVesselPaidByOperator(name, authHeader) {
        return axios.get(StockRepository.server + "/vessel/findVesselPaidByOpStat/" + name, { headers: this.getHeaders(authHeader) });
    }

    findVesselBy2StatusesOperator(name, authHeader) {
        return axios.get(StockRepository.server + "/vessel/vesselByStatusesOperator/" + name, { headers: this.getHeaders(authHeader) });
    }
    findVesselByTwoStatusesOperator(operatorName, authHeader) {
        return axios.get(StockRepository.server + "/vessel/findVesselTwoStatByOpStat/" + operatorName, { headers: this.getHeaders(authHeader) });
    }
    findVesselBookedByOpStat(name, authHeader) {
        return axios.get(StockRepository.server + "/vessel/findVesselBookedByOpStat/" + name, { headers: this.getHeaders(authHeader) });
    }

    findVesselBerthedByOpStat(name, authHeader) {
        return axios.get(StockRepository.server + "/vessel/findVesselBerthedByOpStat/" + name, { headers: this.getHeaders(authHeader) });
    }

    findVesselByPlatenumber(plateNumber, authHeader) {
        return axios.get(StockRepository.server + "/truck/gettrucplatelike/" + plateNumber, { headers: this.getHeaders(authHeader) });
    }

    findTruckWithEntryByPlatenumber(plateNumber, authHeader) {
        return axios.get(StockRepository.server + "/truck/gettruckwithentrylike/" + plateNumber, { headers: this.getHeaders(authHeader) });
    }

    findBerthing(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/berthing/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    findBerthingById(id, authHeader) {
        return axios.get(StockRepository.server + "/berthing/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findUnberthing(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/unberthing/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate, endDate: endDate
            }
        });
    }

    findUnberthingById(id, authHeader) {
        return axios.get(StockRepository.server + "/unberthing/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findAmountDue(platenumber, authHeader) {
        return axios.get(StockRepository.server + "/truck/gettruckAmountDue/" + platenumber, { headers: this.getHeaders(authHeader) });
    }

    /* #region --------------- RUBAVU PORT FUNCTIONS */

    findVessel(authHeader) { // Note: This overrides the earlier findVessel; consider renaming if distinct
        return axios.get(StockRepository.server + "/vessel/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findVesselById(id, authHeader) {
        return axios.get(StockRepository.server + "/vessel/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findBooking(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/booking/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        }).catch(() => StockCommons.RedirectToLogin());
    }

    findBookingById(id, authHeader) {
        return axios.get(StockRepository.server + "/booking/" + id, { headers: this.getHeaders(authHeader) });
    }

    findEntry(authHeader) {
        return axios.get(StockRepository.server + "/entry/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findEntryById(id, authHeader) {
        return axios.get(StockRepository.server + "/entry/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findArrival_note(startDate, endDate, userid, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/" + userid, {
            headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteNotInvoiced(startDate, endDate, userid, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/notInvoiced/" + userid, {
            headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteFilterByclient(startDate, endDate, userid, clientId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterbyclient/" + userid + '/' + clientId, {
            headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteFilterbyid(arrivalId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterbyid/" + arrivalId, {
            headers: this.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteFilterByUser(startDate, endDate, userid, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterByUser/" + userid, {
            headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteFilterByUserAndCliebt(startDate, endDate, userid, clientId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterByUserAndClient/" + userid + '/' + clientId, {
            headers: this.getHeaders(authHeader), params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }

    findArrival_noteByProcessAndUser(startDate, endDate, userid, chosenProcessId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterByBoth/" + userid + '/' + chosenProcessId, {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteByProcessAndUserAndClient(startDate, endDate, userid, chosenProcessId, clientId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterByuserProcClient/" + userid + '/' + chosenProcessId + '/' + clientId, {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteByProcess(startDate, endDate, userid, chosenProcessId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/" + userid + '/' + chosenProcessId, {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findArrival_noteByProcessAndClient(startDate, endDate, userid, chosenProcessId, clientId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/filterByProcClient/" + userid + '/' + chosenProcessId + '/' + clientId, {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        }).catch(() => StockCommons.RedirectToLogin());
    }

    findNextarrival(authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/nextarrival", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findClientnames(arrivalId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/clientnames/" + arrivalId, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findSourceDestinationByArr(arrivalId, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/getsourcedestinationbyarrival/" + arrivalId, { headers: this.getHeaders(authHeader) });
    }

    findArrival_noteById(id, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/getArrivalById/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTallyin(authHeader) {
        return axios.get(StockRepository.server + "/tallyin/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTallyinById(id, authHeader) {
        return axios.get(StockRepository.server + "/tallyin/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTallyout(authHeader) {
        return axios.get(StockRepository.server + "/tallyout/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTallyoutById(id, authHeader) {
        return axios.get(StockRepository.server + "/tallyout/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findItem(authHeader) {
        return axios.get(StockRepository.server + "/item/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findItemById(id, authHeader) {
        return axios.get(StockRepository.server + "/item/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findItem_cat(authHeader) {
        return axios.get(StockRepository.server + "/item_cat/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findItem_catById(id, authHeader) {
        return axios.get(StockRepository.server + "/item_cat/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findStockout_lines(authHeader) {
        return axios.get(StockRepository.server + "/stockout_lines/", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findStockout_linesById(id, authHeader) {
        return axios.get(StockRepository.server + "/stockout_lines/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findCargo_dest(authHeader) {
        return axios.get(StockRepository.server + "/cargo_dest/", { headers: this.getHeaders(authHeader) });
    }

    findCargo_destById(id, authHeader) {
        return axios.get(StockRepository.server + "/cargo_dest/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findStock_out(authHeader) {
        return axios.get(StockRepository.server + "/stock_out/", { headers: this.getHeaders(authHeader) });
    }

    findStock_outById(id, authHeader) {
        return axios.get(StockRepository.server + "/stock_out/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findInvoice_pay_items(authHeader) {
        return axios.get(StockRepository.server + "/invoice_pay_items/", { headers: this.getHeaders(authHeader) });
    }

    findInvoice_pay_itemsById(id, authHeader) {
        return axios.get(StockRepository.server + "/invoice_pay_items/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findInvpayitem_invoice(authHeader) {
        return axios.get(StockRepository.server + "/invpayitem_invoice/", { headers: this.getHeaders(authHeader) });
    }

    findInvpayitem_invoiceById(id, authHeader) {
        return axios.get(StockRepository.server + "/invpayitem_invoice/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findInvoice(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/invoice/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate, endDate: endDate
            }
        })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findtariffservices(authHeader) {
        return axios.get(StockRepository.server + "/tariff_service/", { headers: this.getHeaders(authHeader) });
    }

    findInvoiceById(invoiceId, authHeader) {
        return axios.get(StockRepository.server + "/invoice/" + invoiceId, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findBerthInvoiceById(invoiceId, authHeader) {
        return axios.get(StockRepository.server + "/berthpayment/" + invoiceId, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findPayment(authHeader) {
        return axios.get(StockRepository.server + "/payment/", { headers: this.getHeaders(authHeader) });
    }

    findPaymentById(id, authHeader) {
        return axios.get(StockRepository.server + "/payment/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findInvpayitem_payt(authHeader) {
        return axios.get(StockRepository.server + "/invpayitem_payt/", { headers: this.getHeaders(authHeader) });
    }

    findInvpayitem_paytById(id, authHeader) {
        return axios.get(StockRepository.server + "/invpayitem_payt/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getAllTruck(truck, authHeader) {
        return axios.get(StockRepository.server + "/truck/", truck, { headers: this.getHeaders(authHeader) });
    }
    findOnlyTrucks(authHeader) {
        return axios.get(StockRepository.server + "/truck/onlyTrucks", { headers: this.getHeaders(authHeader) });
    }
    getUniqueTrucksWithEntries(authHeader) {
        return axios.get(StockRepository.server + "/truck/getUniqueTrucksWithEntries", { headers: this.getHeaders(authHeader) });
    }

    findTruck_entry(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/truck_entry/", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }
    findTruck_entryByPlate_number(plateNumber, authHeader) {
        return axios.get(StockRepository.server + "/truck_entry/getTruckEntryByPlateNumber/" + plateNumber, { headers: this.getHeaders(authHeader) });
    }
    findTruck_entryById(truckId, authHeader) {
        return axios.get(StockRepository.server + "/truck_entry/" + truckId, { headers: this.getHeaders(authHeader) }).catch(() => StockCommons.RedirectToLogin());
    }

    findTruck(authHeader) {
        return axios.get(StockRepository.server + "/truck/", { headers: this.getHeaders(authHeader) });
    }

    findTruckById(id, authHeader) {
        return axios.get(StockRepository.server + "/truck/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin()); // Note: 'Commons' might be a typo; should be 'StockCommons'
    }

    findProc_one(authHeader) {
        return axios.get(StockRepository.server + "/proc_one/", { headers: this.getHeaders(authHeader) });
    }

    findProc_oneById(id, authHeader) {
        return axios.get(StockRepository.server + "/proc_one/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findProc_two_three(authHeader) {
        return axios.get(StockRepository.server + "/proc_two_three/", { headers: this.getHeaders(authHeader) });
    }

    findProc_two_threeById(id, authHeader) {
        return axios.get(StockRepository.server + "/proc_two_three/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findExits(authHeader) {
        return axios.get(StockRepository.server + "/exits/", { headers: this.getHeaders(authHeader) });
    }

    findExitsById(id, authHeader) {
        return axios.get(StockRepository.server + "/exits/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findProc_four(authHeader) {
        return axios.get(StockRepository.server + "/proc_four/", { headers: this.getHeaders(authHeader) });
    }

    findProc_fourById(id, authHeader) {
        return axios.get(StockRepository.server + "/proc_four/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    /* #endregion */

    getprofileByCategory(authHeader) {
        return axios.get(StockRepository.server + "/account/profile", { headers: this.getHeaders(authHeader) });
    }

    findVesselByVesselId(id, authHeader) {
        return axios.get(StockRepository.server + "/vessel/total/" + id, { headers: this.getHeaders(authHeader) });
    }

    findTruck_parking_invoice(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/truck_parking_invoice/", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }
    findTruck_parking_invById(invId, authHeader) {
        return axios.get(StockRepository.server + "/truck_parking_invoice/getInvById/" + invId, {
            headers: this.getHeaders(authHeader)
        });
    }
    findTrucksInvoicesNoGrp(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/truck_parking_invoice/allInvoicesNoGrp", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }
    finNongroupedinvoicesbydate(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/truck_parking_invoice/allInvoicesNoGrp", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }
    finNongroupedinvoicesbydateNotReceipted(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/truck_parking_invoice/allInvoicesNoGrpNotReceipted", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }
    findTruck_parking_invoiceById(id, authHeader) {
        return axios.get(StockRepository.server + "/truck_parking_invoice/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getInvoiceAmount(platenumber, authHeader) {
        return axios.get(StockRepository.server + "/inoviceamount/" + platenumber, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTruckPayment(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/truck_payment/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    findTruckPaymentById(invoiceId, authHeader) {
        return axios.get(StockRepository.server + "/truck_payment/" + invoiceId, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTruck_exit(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/truck_exit/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    findTruck_exitById(id, authHeader) {
        return axios.get(StockRepository.server + "/truck_exit/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getTruckProcesses(authHeader) {
        return axios.get(StockRepository.server + "/destination/truckdestinations", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getVesselProcesses(authHeader) {
        return axios.get(StockRepository.server + "/destination/vesseldestinations", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getWarehouseProcesses(authHeader) {
        return axios.get(StockRepository.server + "/destination/warehousedestinations", { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findTally(authHeader) {
        return axios.get(StockRepository.server + "/tally/", { headers: this.getHeaders(authHeader) });
    }

    findTallyById(id, authHeader) {
        return axios.get(StockRepository.server + "/tally/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findGen_receipt(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/gen_receipt/", {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    findGen_receiptById(id, authHeader) {
        return axios.get(StockRepository.server + "/gen_receipt/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findGen_invoice(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/gen_invoice/", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }
    findGen_invoiceByArrivalId(authHeader, arrival_id) {
        return axios.get(StockRepository.server + "/gen_invoice/InvoiceByArrivalNoteid/"+arrival_id, {            headers: this.getHeaders(authHeader) 
        });
    }

    findGen_NonReceiptedinvoice(authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/gen_invoice/nonReceipted", {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }

    findGen_invoiceById(id, authHeader) {
        return axios.get(StockRepository.server + "/gen_invoice/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }
    findGen_DetailedinvoiceById(id, authHeader) {
        return axios.get(StockRepository.server + "/gen_invoice/getInvoicesById/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findGen_exit(startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/gen_exit/", {
            headers: this.getHeaders(authHeader),
            params: { startDate, endDate: endDate }
        });
    }

    findGen_exitById(id, authHeader) {
        return axios.get(StockRepository.server + "/gen_exit/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    truckarrival(destinationId, source_id, dest_id, chosenProcessCategory, arrival_id, authHeader) {
        return axios.get(StockRepository.server + "/destination/truckarrival/" + destinationId + '/' + source_id + '/' + dest_id + '/' + chosenProcessCategory + '/' + arrival_id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    truckarrivalGrpByDestination(destinationId, source_id, dest_id, chosenProcessCategory, arrival_id, startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/destination/truckarrivalGrpByDestination/" + destinationId + '/' + source_id + '/' + dest_id + '/' + chosenProcessCategory + '/' + arrival_id, {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    truckarrivalInvoice(destinationId, source_id, dest_id, chosenProcessCategory, arrival_id, authHeader, startDate, endDate) {
        return axios.get(StockRepository.server + "/destination/truckarrivalInvoice/" + destinationId + '/' + source_id + '/' + dest_id + '/' + chosenProcessCategory + '/' + arrival_id, {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getStorageCost(weights, storagePeriod, authHeader) {
        return axios.get(StockRepository.server + "/destination/getStorageCost/" + weights + "/" + storagePeriod, {
            headers: this.getHeaders(authHeader),
        })
            .catch(() => StockCommons.RedirectToLogin());
    }

    getarrivalByIdByDestId(destName, arrivalId, startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/getarrivalByIdByDestId/" + destName + '/' + arrivalId, {
            headers: this.getHeaders(authHeader),
            params: { startDate: startDate, endDate: endDate }
        });
    }

    getArrivalDetailsGrpByWeighttype(destCat, arrivalId, groupId, startDate, endDate, authHeader) {
        return axios.get(StockRepository.server + "/arrival_note/getArrivalDetailsGrpByWeighttype/" + destCat + '/' + arrivalId + '/' + groupId, {
            headers: this.getHeaders(authHeader),
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    getTariffByArrival(arrival_id, authHeader) {
        return axios.get(StockRepository.server + "/gen_invoice/gettariff/" + arrival_id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findBerthpayment( startDate, endDate,authHeader) {
        return axios.get(StockRepository.server + "/berthpayment/", { headers: this.getHeaders(authHeader), params: {
                startDate: startDate,
                endDate: endDate
            } });
    }

    findBerthpaymentById(id, authHeader) {
        return axios.get(StockRepository.server + "/berthpayment/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findVesselDetailsUnberth(vesselId, authHeader) {
        return axios.get(StockRepository.server + "/vessel/findVesselDetailsUnberth/" + vesselId, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    auditing(id, authHeader) {
        return axios.get(StockRepository.server + "/auditing/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }


    findTruckExitDetaisById(id, authHeader) {
        return axios.get(StockRepository.server + "/truck_exit/" + id, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }
    findClientByName(clientName, authHeader) {
        return axios.get(StockRepository.server + "/client/clientByNameLike/" + clientName, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }

    findClientByNameLike(clientName, authHeader) {
        return axios.get(StockRepository.server + "/client/clientByNameLike/" + clientName, { headers: this.getHeaders(authHeader) })
            .catch(() => StockCommons.RedirectToLogin());
    }
    findAuditingBerthingInvoice(username, authHeader) {
        return axios.get(StockRepository.server + "/auditing/berthInvoices", { headers: this.getHeaders(authHeader), params: { username: username } })
        // .catch(() => StockCommons.RedirectToLogin());
    }

    inventoryReport(authHeader) {
        return axios.get(StockRepository.server + "/client/allCargInWh/", { headers: this.getHeaders(authHeader) });
    }
    finduserRoles(authHeader) {
        return axios.get(StockRepository.server + "/usersroles", { headers: this.getHeaders(authHeader) });
    }
    finduserRolesWithCategories(authHeader) {
        return axios.get(StockRepository.server + "/usersroles/with-categories", {            headers: this.getHeaders(authHeader),
        }).catch(() => StockCommons.RedirectToLogin());
    }
    getAllOtherRevCategories(authHeader){
           return axios.get(StockRepository.server + "/otherrevcats/", {            headers: this.getHeaders(authHeader),
        }).catch(() => StockCommons.RedirectToLogin());
    }
     getAllOtherRevenues(authHeader) {
        return axios.get(StockRepository.server + "/otherrevenue/", {            headers: StockRepository.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }
    findOtherRevenueById(id, authHeader) {
        return axios.get(StockRepository.server + "/otherrevenue/" + id, {            headers: StockRepository.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }

    // Email Service Methods
    sendTestEmail(authHeader) {
        return axios.get(StockRepository.server + "/email/test", {
            headers: this.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }

    sendPortOperationNotification(operationType, details, authHeader) {
        const params = new URLSearchParams();
        params.append('operationType', operationType);
        if (details) {
            params.append('details', details);
        }
        
        return axios.post(StockRepository.server + "/email/port-operation", params, {
            headers: this.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }

    sendTruckEntryNotification(plateNumber, truckType, entryTime, authHeader) {
        const params = new URLSearchParams();
        params.append('plateNumber', plateNumber);
        if (truckType) {
            params.append('truckType', truckType);
        }
        if (entryTime) {
            params.append('entryTime', entryTime);
        }
        
        return axios.post(StockRepository.server + "/email/truck-entry", params, {
            headers: this.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }

    sendInvoiceGeneratedNotification(invoiceNumber, plateNumber, amount, authHeader) {
        const params = new URLSearchParams();
        params.append('invoiceNumber', invoiceNumber);
        if (plateNumber) {
            params.append('plateNumber', plateNumber);
        }
        if (amount) {
            params.append('amount', amount);
        }
        
        return axios.post(StockRepository.server + "/email/invoice-generated", params, {
            headers: this.getHeaders(authHeader)
        }).catch(() => StockCommons.RedirectToLogin());
    }

   
     

}

export default new StockRepository()