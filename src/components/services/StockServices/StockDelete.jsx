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
}
export default new StockDelete()