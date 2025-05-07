import axios from "axios";

import StockRepository from "./StockRepository";
import StockCommons from "./StockCommons";
import StockConn from "./StockConn";

class Reporting {
  static page = (Reporting.page < 1 || Reporting.page == undefined) ? 1 : Reporting.page;
  static size = (Reporting.size < 1) ? 50 : Reporting.size;
  static server = StockConn.wholePath.name;
  // static url = "http://" + Repository.server + ":8089/guru/api"
  getHeaders(authHeader) {
    return StockConn.GetToken(authHeader);
  }
  static headers = StockConn.LoginToken
  static getHeaders = StockConn.GetToken

  revenueReport(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).catch(() => { StockCommons.RedirectToLogin() })
  }

  vesselTruckWeightReport(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/vesselTrucksWeight", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).catch(() => { StockCommons.RedirectToLogin() })
  }


  allCargoReport(startDate, endDate, authHeader) {
    return axios.get(Reporting.server + "/revenuereport/cargoReport", {
      headers: this.getHeaders(authHeader),
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).catch(() => { StockCommons.RedirectToLogin() })
  }

}
export default new Reporting()