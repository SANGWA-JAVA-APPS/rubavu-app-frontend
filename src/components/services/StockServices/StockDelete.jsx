import axios from "axios"
import StockRepository from "./StockRepository"
import StockConn from "./StockConn"
import StockCommons from "./StockCommons"



class StockDelete {

    deleteAccountByid(id) {
        return axios.delete(StockConn.wholePath.name + "/account/account/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }

    deleteItem_categoryById(id) {
        return axios.delete(StockConn.wholePath.name + "/itemsCategory/itemsCategory/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteItemsById(id) {
        return axios.delete(StockConn.wholePath.name + "/items/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }

    deleteTruckPaymentById(id) {
        return axios.delete(StockConn.wholePath.name + "/truck_payment/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }

    deletePaymentAdviceById(id) {
        return axios.delete(StockConn.wholePath.name + "/payment_advice/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteVesselById(id) {
        return axios.delete(StockConn.wholePath.name + "/vessel/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteInvoiceById(id) {
        return axios.delete(StockConn.wholePath.name + "/invoice/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteUnberthingById(id) {
        return axios.delete(StockConn.wholePath.name + "/unberthing/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteGenInvoiceById(id) {
        return axios.delete(StockConn.wholePath.name + "/gen_invoice/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteBerthingById(id) {
        return axios.delete(StockConn.wholePath.name + "/berthing/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteBerthpaymentById(id) {
        return axios.delete(StockConn.wholePath.name + "/berthpayment/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteTruck_entryById(id) {
        return axios.delete(StockConn.wholePath.name + "/truck_entry/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteTruck_parking_invoiceById(id) {
        return axios.delete(StockConn.wholePath.name + "/truck_parking_invoice/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
    deleteTruck_exitById(id) {
        return axios.delete(StockConn.wholePath.name + "/truck_exit/" + id, { headers: StockRepository.getHeaders }).catch(() => { StockCommons.RedirectToLogin() })
    }
}
export default new StockDelete()