import React, { useContext, useEffect, useState } from 'react'
import StockRepository from '../../services/StockServices/StockRepository';
import { Col, Container, Row } from 'react-bootstrap';
import Categories from '../Home/Categories';
import Products from '../Home/Products';
import MostSoldBeer from '../Beer/MostSoldBeer';
import { RandomItemsDescriptionProvider } from '../Beer/RandomItemsDescriptionProvider';
import { money } from 'react-icons-kit/fa/money'

import { Icon } from 'react-icons-kit'
import { color } from 'framer-motion';
import { boxRemove as purchase } from 'react-icons-kit/icomoon/boxRemove'
import { minus as expenses } from 'react-icons-kit/icomoon/minus'
import { ic_attach_money_twotone as cash } from 'react-icons-kit/md/ic_attach_money_twotone'
import ColItem from './ColItem';
import { Link, useNavigate } from 'react-router-dom';
import { AppDataContextProvider, ColItemContext } from '../../Global/GlobalDataContentx';
import CustomModalPopup from '../../Global/CustomModalPopup';
import { BrandContext } from '../../Global/BrandContext';
import Currency from '../currency/Currency';
import { newspaper as report } from 'react-icons-kit/icomoon/newspaper'
import Utils from '../../Global/Utils';
import { TableOpen } from '../../Global/ListTable';
import TableHead from '../../Global/TableHead';
import CurrentDate from '../../Global/CurrentDate';
import RevenueSummary from './RevenueSummary';
import { StockOrBisnessContext } from '../../Global/StockOrBisness';

function Dashboard() {

  const [hwmovements, setHwmovement] = useState([]) //Data List that comes initially
  const [item_categorys, setItem_categorys] = useState([]) //Data List
  const [companyName, setCompanyName] = useState('')// this is used on search on the beginning of the form registration


  const [thousands, setThousands] = useState('')
  const [totPurchases, setTotPurchases] = useState(0)
  const [totSales, setTotSales] = useState(0)
  const [totEpenses, setTotEpenses] = useState(0)
  const [totBenefit, setTotBenefit] = useState(0)

  const [yest_totPurchases, setYest_totPurchases] = useState(0)
  const [yest_totSales, setYest_totSales] = useState(0)
  const [yest_totEpenses, setYest_totEpenses] = useState(0)
  const [yest_totBenefit, setYest_totBenefit] = useState(0)

  const [last7_totPurchases, setLast7_totPurchases] = useState(0)
  const [last7_totSales, setLast7_totSales] = useState(0)
  const [last7_totEpenses, setLast7_totEpenses] = useState(0)
  const [last7_totBenefit, setLast7_totBenefit] = useState(0)

  const [last30_totPurchases, setLast30_totPurchases] = useState(0)
  const [last30_totSales, setLast30_totSales] = useState(0)
  const [last30_totEpenses, setLast30_totEpenses] = useState(0)
  const [last30_totBenefit, setLast30_totBenefit] = useState(0)

  const [last180_totPurchases, setLast180_totPurchases] = useState(0)
  const [last180_totSales, setLast180_totSales] = useState(0)
  const [last180_totEpenses, setLast180_totEpenses] = useState(0)
  const [last180_totBenefit, setLast180_totBenefit] = useState(0)
  const [modelContent, setmodelContent] = useState(0)
  const iconSize = 30
  const subColor = "#46210b", subSalesColor = ""
  const [sharedData, setSharedData] = useState("Hello from Context!");
  const [purchasess, setPurchasess] = useState([]) //Data List
  const [debtsList, setDebtsList] = useState([])


  {/*Initial company settings values*/ }
  const [CompanySet, setCompanySet] = useState(false);

  const { bizType, setBizType } = useContext(StockOrBisnessContext)
  const bisOrStock = bizType === 'business' ? "Purchases" : 'Received cargo' //purchase
  const bisOrStockSale = bizType === 'business' ? "Sales" : 'Tally Out' //sale
  const bisOrStockBenefit = bizType === 'business' ? "Benefit" : 'Revenue' //sale
  const ShowExpenses = bizType === 'business'  //sale
  const { brandName, setBrandName } = useContext(BrandContext)
  const { currency, setCurrency } = useContext(BrandContext)
  const { setPurchaseMenu } = useContext(ColItemContext)
  const { setSaleMenu } = useContext(ColItemContext)
  const { setRecPurchase } = useContext(ColItemContext)
  const { defaultMeasureUnit, setDefaultMeasureUnit } = useContext(ColItemContext)
  const { setitemOrCargo } = useContext(ColItemContext)




  const navigate = useNavigate();
  const goToSettings = () => {
    setCompanySet(false)
    if (!brandName) {
      navigate('/companyName'); // Navigates to company name page
    } else if (!currency) {
      navigate('/currency'); // Navigates to company name page

    }
  }
  const getAllHw_movements = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
      setHwmovement(res.data);
      // setDataLoad(true)
    });
  }
  const getAllItem_categorys = (page, size) => {
    StockRepository.findItem_category(page, size).then((res) => {
      setItem_categorys(res.data.data);
      // setDataLoad(true)
    });
  }
  const fv = (value) => { //format the value as thousand(k) and millions(M)
    return (value > 1000000 || value < -1000000) ? (value / 1000000).toFixed(1) + 'M'
      : (value > 1000 || value < -1000) ? (value / 1000).toFixed(1) + 'K' : value.toFixed(1)
    // return  value
  };

  const getSummary = (date1, date2) => {
    const purchaseDatesDTO = {
      date1: date1,
      date2: date2
    }
    StockRepository.getSummary(purchaseDatesDTO).then((res) => {
      // if (res) {
      var p = res.data.totPurchases
      var s = res.data.totSales
      var e = res.data.totEpenses
      var b = res.data.totBenefit
      setTotPurchases(fv(p))
      setTotSales(fv(s))
      setTotEpenses(fv(e))
      setTotBenefit(fv(b))
      //yesterday

      p = res.data.yest_totPurchases
      s = res.data.yest_totSales
      e = res.data.yest_totEpenses
      b = res.data.yest_totBenefit
      setYest_totPurchases(fv(p))
      setYest_totSales(fv(s))
      setYest_totEpenses(fv(e))
      setYest_totBenefit(fv(b))

      // last 7 days
      p = res.data.L7days_totPurchases
      s = res.data.L7days_totSales
      e = res.data.L7days_totEpenses
      b = res.data.L7days_totBenefit

      setLast7_totPurchases(fv(p))
      setLast7_totSales(fv(s))
      setLast7_totEpenses(fv(e))
      setLast7_totBenefit(fv(b))

      // last 30 days
      p = res.data.L30days_totPurchases
      s = res.data.L30days_totSales
      e = res.data.L30days_totEpenses
      b = res.data.L30days_totBenefit

      setLast30_totPurchases(fv(p))
      setLast30_totSales(fv(s))
      setLast30_totEpenses(fv(e))
      setLast30_totBenefit(fv(b))


      // last 180 days = 3 months

      p = res.data.L180days_totPurchases
      s = res.data.L180days_totSales
      e = res.data.L180days_totEpenses
      b = res.data.L180days_totBenefit

      setLast180_totPurchases(fv(p))
      setLast180_totSales(fv(s))
      setLast180_totEpenses(fv(e))
      setLast180_totBenefit(fv(b))
      setDebtsList(res.data.listDebts)
      // }
    })





  }

  const todaydate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;


    return formattedDate
  }


  const getSettingByName = () => {
    StockRepository.getSettingByName('company_name').then((res) => {
      var settingName = res.data.value
      setCompanyName(res.data.value)
      if (settingName === 'notset') {
        setCompanySet(true)//show the modal
        setmodelContent('You have to set he company information')
      } else {
        setBrandName(res.data.value)
        StockRepository.getSettingByName('currency').then((res) => {
          settingName = res.data.value
          if (settingName === 'notset') {
            setmodelContent('Currency is not set')
            setCompanySet(true)//show the modal
          } else {
            setCurrency(settingName)
          }
          StockRepository.getSettingByName('stockorbusiness').then((res) => {
            settingName = res.data.value
            if (settingName === 'stock') {
              setBizType('stock')
              // set the menus context
              setRecPurchase('Received Cargo')
              setPurchaseMenu('TallyIn')
              setSaleMenu('TallyOut')
              setDefaultMeasureUnit('kg')
              setitemOrCargo('Cargo')
              
            } else {
              setBizType('business')


            }
          })
          StockRepository.getSettingByName('defaultmeasureunit').then((res) => {

          })

        })
      }

    })

  }
  const getAllPurchasess = (date1, date2) => {
    const purchaseDatesDTO = {
      date1: date1,
      date2: date2
    }
    StockRepository.findPurchases(purchaseDatesDTO).then((res) => {
      setPurchasess(res.data);
    })
  }

  useEffect(() => {
    getAllPurchasess(CurrentDate.todaydate(), CurrentDate.todaydate())
    getSettingByName()
    getAllHw_movements
    getAllItem_categorys(0, 2)

    getSummary(todaydate(), todaydate())


  }, [])


  return (
    <>
      <Container fluid style={{ backgroundColor: '#fff' }}>
        {/* summarized */}


        <Row className="  m-5 mt-0  p-3  g-2" >
          <RevenueSummary debtsList={debtsList} />
          <span className="mt-5 mb-5" />


          <AppDataContextProvider value={{ sharedData, setSharedData }}>
            <Col md={12}><h3 className='fw-uppercase text-uppercase '>Today Transaction Summary</h3></Col>
            <Col md={12}><h4 className='fw-uppercase '><b>Today</b> </h4></Col>
            <ColItem color={`#03ccef`} path="/purchase" purchase={purchase} cls="beerskin1" totPurchases={totPurchases} label={bisOrStock} />
            <ColItem color="green" path="/sales" purchase={money} cls="beerskin2" totPurchases={totSales} label={bisOrStockSale} />
            {ShowExpenses && <ColItem color="#a3110c" purchase={expenses} cls="beerskin3" totPurchases={totEpenses} label="Expenses" />}
            <ColItem color="#03efc0" purchase={report} cls="beerskin4" totPurchases={totBenefit} label={bisOrStockBenefit} />


            <hr className='mt-5 ' style={{ border: '1px solid black' }} />
            <Col md={12}><h4 className='fw-uppercase mt-5'><b>Yesterday</b> </h4></Col>
            <ColItem color={`#03ccef`} purchase={purchase} cls="beerskin1" totPurchases={yest_totPurchases} label={bisOrStock} />
            <ColItem color="green" purchase={money} cls="beerskin2" totPurchases={yest_totSales} label={bisOrStockSale} />
            {ShowExpenses && <ColItem color="#a3110c" purchase={expenses} cls="beerskin3" totPurchases={totEpenses} label="Expenses" />}
            <ColItem color="#03efc0" lc="red" purchase={report} cls="beerskin4" totPurchases={yest_totBenefit} label={bisOrStockBenefit} />



            <hr className='mt-5 ' style={{ border: '1px solid black' }} />
            <Col md={12}><h4 className='fw-uppercase mt-5'><b>Last 7 days</b></h4></Col>
            <ColItem color={`#03ccef`} purchase={purchase} cls="beerskin1" totPurchases={last7_totPurchases} label={bisOrStock} />
            <ColItem color="green" purchase={money} cls="beerskin2" totPurchases={last7_totSales} label={bisOrStockSale} />
            {ShowExpenses && <ColItem color="#a3110c" purchase={expenses} cls="beerskin3" totPurchases={totEpenses} label="Expenses" />}
            <ColItem color="#03efc0" lc="red" purchase={report} cls="beerskin4" totPurchases={last7_totBenefit} label={bisOrStockBenefit} />


            <hr className='mt-5 ' style={{ border: '1px solid black' }} />
            <Col md={12}><h4 className='fw-uppercase mt-5'><b>Last month </b></h4></Col>
            <ColItem color={`#03ccef`} purchase={purchase} cls="beerskin1" totPurchases={last30_totPurchases} label={bisOrStock} />
            <ColItem color="green" purchase={money} cls="beerskin2" totPurchases={last30_totSales} label={bisOrStockSale} />
            {ShowExpenses && <ColItem color="#a3110c" purchase={expenses} cls="beerskin3" totPurchases={totEpenses} label="Expenses" />}
            <ColItem color="#03efc0" purchase={report} cls="beerskin4" totPurchases={last30_totBenefit} label={bisOrStockBenefit} />

            <hr className='mt-5 ' style={{ border: '1px solid black' }} />
            <Col md={12}><h4 className='fw-uppercase mt-5'><b>Last 3 months </b></h4></Col>
            <ColItem color={`#03ccef`} purchase={purchase} cls="beerskin1" totPurchases={last180_totPurchases} label={bisOrStock} />
            <ColItem color="green" purchase={money} cls="beerskin2" totPurchases={last180_totSales} label={bisOrStockSale} />
            {ShowExpenses && <ColItem color="#a3110c" purchase={expenses} cls="beerskin3" totPurchases={totEpenses} label="Expenses" />}
            <ColItem color="#03efc0" purchase={report} cls="beerskin4" totPurchases={last180_totBenefit} label={bisOrStockBenefit} />

          </AppDataContextProvider>
        </Row>


        <CustomModalPopup
          title='Company Information'
          content={modelContent}
          show={CompanySet} onHide={() => goToSettings()} />


      </Container>
    </>
  )
}

export default Dashboard