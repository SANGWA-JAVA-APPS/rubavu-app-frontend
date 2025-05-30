import { Col, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class Utils {


  static Options() {
    return {
      title: 'Title',
      message: 'Message',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => { },
      afterClose: () => { },
      onClickOutside: () => { },
      onKeypress: () => { },
      onKeypressEscape: () => { },
      overlayClassName: "overlay-custom-class-name"
    };
  }
  static VerifyLogin() {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === '') {
      window.location.replace('/login')
    }
  }
  static Submit = (ClickedYes, ClickedNo) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (typeof ClickedYes === 'function') {
              ClickedYes();
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
            if (typeof ClickedNo === 'function') {
              ClickedNo();
            }
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true
    });
  };

  static iconSize = 50
  static iconSmallSize = 30

  static PageLoadeDefaults() {
    window.scrollTo(0, 0)
    document.body.className = '';
  }
  static redColor = () => {
    return { "color": "red" }
  }
  static border = '#00b7ff'
  static iconStyle = {
    color: "#ffae00",
    marginRight: Utils.SocialmediaiconSize

  }

  static navLinks = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bolder",
    // textShadow:'-1px -1px #000, 1px -1px 0 #000,-1px -1px #000, 1px -1px 0 #000,-1px -1px #000, 1px -1px 0 #000',
    fontSize: "13px",
    // marginLeft: "12px"
    //  marginTop: '7px'
  }
  static navLinksmtop = {
    color: "#ccbbbb",
    textDecoration: "none",
    fontWeight: "bolder",

    fontSize: "14px",
    marginLeft: "25px"
    , marginTop: '10px',
    padding: '9px'

  };



  //---------------------------------------- common items used on mission page and the home pages
  static services = {
    color: Utils.border,
    // color: "#0087ef", 
    marginRight: "20px",
    fontSize: "35px", size: "45"
  }

  static bulletSize = 22;
  //---------------------------------------- End of common items used on mission page and the home pages






  static errorLogic = (err) => {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const status = err.response.status;
    if (status === 302) {
      return err.response.data.message
    }
    switch (status) {
      case 300:
        return '300: Multiple Choices - The request has more than one possible response.'
        break;
      case 301:
        return '301: Moved Permanently - The URL of the requested resource has been changed permanently.'
        break;
      case 302:
        return '302: Found - The record is already there, The requested resource resides temporarily under a different URI.'
        break;
      case 303:
        return '303: See Other - The server is redirecting to a different URI using a GET method.'
        break;
      case 304:
        return '304: Not Modified - The resource has not been modified since the last request.'
        break;
      case 305:
        return '305: Use Proxy - The requested resource is available only through a proxy.'
        break;
      case 307:
        return '307: Temporary Redirect - The server is redirecting to a different URI but the original request method should be used.'
        break;
      case 308:
        return '308: Permanent Redirect - The server is redirecting to a different URI and the original request method should be used.'
        break;
      case 400:
        return '400: Bad Request - The server could not understand the request due to invalid syntax.'
        break;
      case 401:
        return '401: Unauthorized - The client must authenticate itself to get the requested response.'
        break;
      case 403:
        return '403: Forbidden - The client does not have access rights to the content.'
        break;
      case 404:
        return '404: Not Found - The server can not find the requested resource.'
        break;
      case 500:
        return '500: Internal Server Error - The server has encountered a situation it doesn\'t know how to handle.'
        break;
      case 502:
        return '502: Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.'
        break;
      case 503:
        return '503: Service Unavailable - The server is not ready to handle the request.'
        break;
      case 504:
        return '504: Gateway Timeout - The server was acting as a gateway or proxy and did not get a response in time from the upstream server.'
        break;
      default:
        return `Error response status: ${status}`
    }

  }


  // This is used on the cards that come on the dataList of the forms
  static cardTitle = () => {
    return {
      margin: '0px', color: '#000', fontSize: '18px',
      // textShadow: '1px 1px '
    }
  }
  static cardSize = () => {
    return 110
  }
  static cardSmallSize = () => {
    return 40
  }
  static skinBg1 = () => {
    // return '#caece1'
    return '#deece7'
  }
  static skinBg2 = () => {
    return '#6e3000'
  }

  static SocialmediaiconSize = '15px'

  static PurchaseSalesTitle(Title) {
    return (
      <h3 className='fw-bold mt-5'>{Title}</h3>
    )
  }

}
export default Utils

export const PrintRow = ({ txt, txtValue }) => {
  return (
    <>
      <Col md={6} className="mt-2 ps-5 col-6 border-bottom ">{txt}</Col>
      <Col md={6} className="mt-2 ps-5 col-6 border-bottom ">{txtValue}</Col>
    </>
  )
}
export const PrintSignature = ()=>{
  return (<Col md={11} style={{ marginBottom: '40px' }}>
    <Row style={{ position: 'absolute', width: '90%', bottom: '40px' }}>
      <table>
        <thead style={{ backgroundColor: '#f5f5f5' }}>
          <td className="border border-dark">Tally</td> <td className="border border-dark">Warehouse Supervisor</td> <td className="border border-dark">Customs</td> <td className="border border-dark">Client</td>
        </thead>
        <tbody>
          <tr style={{ height: '100px' }}>
            <td className="border border-dark"> </td> <td className="border border-dark"> </td> <td className="border border-dark"> </td> <td className="border border-dark"> </td>
          </tr>
        </tbody>
      </table>
    </Row>
  </Col>)
}
