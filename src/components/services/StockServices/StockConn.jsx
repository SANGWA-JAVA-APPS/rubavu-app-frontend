export default class StockConn {
    static server = {
        // name: '//ebeulah.codeguru-pro.com:'
        // name: '//hahandiinn.codeguru-pro.com:'
        // name: '//jamboinn.codeguru-pro.com:'
        // name: '//stock.thediamondsmile.rw:'
        // name:'//nyakarambi.codeguru-pro.com:'
        // name: 'http://test_stockdjuma.megisha.com:'
        // name: 'http://192.168.92.6:'
        // name: 'http://localhost:',
        'name':'https:codeguru-pro.com:'
    };
    static port = {
        /*the below hosted to Djuma Nyabugogo and djuma town, the both have the same port bcz they are on different servers*/
        val:   '8101/'  // this is online
        
    }
    static basicPath = {
        val: 'codeguru/api',
        stockVal: 'stock/api'   
    }
    static wholePath = {
        name: StockConn.server.name + StockConn.port.val + StockConn.basicPath.val  /*  http://localhost:8089/guru/api  */
    }

    static sbp = { /* Stock basic path (sbp) This is used on the settings, but it can/shall be used even for other endpoints, it maded in order to expand endpoinds*/
        name: StockConn.server.name + StockConn.port.val + StockConn.basicPath.stockVal
    }

    static ReqContentType = 'application/json'
    static LoginToken = {
        'Content-Type': StockConn.ReqContentType,
        'Authorization': 'Bearer '
    }
    static GetToken = {
        'Content-Type': StockConn.ReqContentType,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}
