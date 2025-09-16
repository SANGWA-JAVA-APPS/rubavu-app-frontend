import { useAuthHeader } from 'react-auth-kit';
export default class StockConn {
    static server = {
        // Local development - uncomment for local testing
        name: 'http://localhost'        
        // Production server - for online access
        // name: 'http://192.168.92.6'
        // name: 'https://rubavuport.codeguru-pro.com'
    };
    static port = {
        // Local development port
        val: ':8097'
        // val: ''
    }
    static basicPath = {
        val: '/codeguru/api',  // Fixed: Added leading slash
        stockVal: '/stock/api'  // Fixed: Added leading slash
    }
    static wholePath = {
        name: StockConn.server.name + StockConn.port.val + StockConn.basicPath.val  // Now: https://rubavuport.codeguru-pro.com/codeguru/api
    }
    static sbp = { /* Stock basic path (sbp) This is used on the settings, but it can/shall be used even for other endpoints, it maded in order to expand endpoinds*/
        name: StockConn.server.name + StockConn.port.val + StockConn.basicPath.stockVal
    }
    
    static ReqContentType = 'application/json'
    static LoginToken = {
        'Content-Type': StockConn.ReqContentType,
        'Authorization': 'Bearer '
    }
    static GetToken(authHeader = '') {
        return {
            'Content-Type': StockConn.ReqContentType,
            'Authorization':   authHeader || 'Bearer ' + localStorage.getItem('token') // Fallback to localStorage
        }
    }
}
