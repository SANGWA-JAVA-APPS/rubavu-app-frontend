import React, { useContext, useEffect, useRef, useState } from 'react'
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
import ColItem, { GCard } from './ColItem';
import { Link, useNavigate } from 'react-router-dom';
import { AppDataContextProvider, ColItemContext } from '../../Global/GlobalDataContentx';
import CustomModalPopup from '../../Global/CustomModalPopup';
import { BrandContext } from '../../Global/BrandContext';
import Currency from '../currency/Currency';
import { newspaper as report } from 'react-icons-kit/icomoon/newspaper'
import Utils from '../../Global/Utils';
import { TableOpen } from '../../Global/ListTable';
import TableHead, { TableHeadTwo } from '../../Global/TableHead';
import CurrentDate from '../../Global/CurrentDate';
import RevenueSummary from './RevenueSummary';
import { StockOrBisnessContext } from '../../Global/StockOrBisness';
import { DashboardReportsFilters } from './DashboardReportsFilters';
import Reporting from '../../services/StockServices/Reporting';
import { SmallerSplitter, SmallSplitter, Splitter } from '../../globalcomponents/Splitter';
import { TitleSmallDesc, TitleSmallDescNoSlide, TitleSmallDescTwo } from '../../globalcomponents/TitleSmallDesc';
import { Test } from '../Test/Test';
import ComponentTwo from '../Test/ComponentTwo';


import { Bar, Line } from 'react-chartjs-2';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement,);
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, } from 'chart.js';
import DoughnutChart from '../reporting/DoughnutChart';
import { SingleNumberTop } from './SingleNumberTop';
import { ThreeCharts } from './ThreeCharts';
import PagesWapper from '../../Global/PagesWapper';
import { useAuthHeader } from 'react-auth-kit';
import { ListByTitle } from '../reporting/revenueReports';
import BerthingRevenue, { AllRevenue, CargoRevenue, TrucksRevenue } from './DetailedReport';
import { SettingsEthernet } from '@mui/icons-material';
import { DateRangeContext } from '../../globalcomponents/ButtonContext';
import BookingReport from './BookingReport';
import { BerthingReport } from '../reporting/BerthingReport';
import { IncomingOutgoing } from './IncomingOutgoing';
import { BerthedList } from './BerthedList';
import { DetailedReportLoaderModal } from './DetailedReportLoaderModal';

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
  const bisOrStock = bizType === 'business' ? "Purchases" : 'Total Berthing Revenue' //purchase
  const bisOrStockSale = bizType === 'business' ? "Sales" : 'Truck Parking Revenue' //sale
  const bisOrStockBenefit = bizType === 'business' ? "Benefit" : 'OPS Revenue' //sale
  const ShowExpenses = bizType === 'business'  //sale
  const { brandName, setBrandName } = useContext(BrandContext)
  const { currency, setCurrency } = useContext(BrandContext)
  const { setPurchaseMenu, setSaleMenu, setRecPurchase, showModal, setShowModal, modalTitle, setupBycolor,
    setDataTodisplayInModal, dataTodisplayInModal, setReportType } = useContext(ColItemContext)


  const [berthingReport, setBerthingReport] = useState([])
  const [truckReport, setTruckReport] = useState([])
  const [cargoAmountReport, setCargoAmountReport] = useState([])


  const [totalVesselLabel, setTotalVesselLabel] = useState('Total Berthed Vessels')
  const [totalTrucksLabel, setTotalTruckLabel] = useState('Total Entered Trucks')
  const [totalWeightLabel, setTotalWeightLabel] = useState('Total Weight')
  const [vessels, setVessels] = useState([]) //Data List
  const [dataLoad, setDataLoad] = useState(false)
  const [paneReportDataLoad, setPaneReportDataLoad] = useState(false)

  const navigate = useNavigate();

  const authHeader = useAuthHeader()();

  const [berthingList, setBerthingList] = useState([])
  const goToSettings = () => {
    setCompanySet(false)
    if (!brandName) {
      navigate('/companyName'); // Navigates to company name page
    } else if (!currency) {
      navigate('/currency'); // Navigates to company name page

    }
  }
  const getAllHw_movements = async () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    await StockRepository.findHw_movement(SearchByDateOnly, authHeader).then((res) => {
      setHwmovement(res.data);
      // setDataLoad(true)
    });
  }
  const getAllItem_categorys = (page, size) => {
    StockRepository.findItem_category(page, size, authHeader).then((res) => {
      setItem_categorys(res.data.data);
      // setDataLoad(true)
    });
  }
  const fv = (value) => { //format the value as thousand(k) and millions(M)
    return (value > 1000000 || value < -1000000) ? (value / 1000000).toFixed(1) + 'M'
      : (value > 1000 || value < -1000) ? (value / 1000).toFixed(1) + 'K' : value.toFixed(1)
    // return  value
  };

  const getSummary = async (date1, date2) => {
    const purchaseDatesDTO = {
      date1: date1,
      date2: date2
    }
    await StockRepository.getSummary(purchaseDatesDTO, authHeader).then((res) => {
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

  const getSettingByName = async () => {
    try {


      // First request: company_name
      const companyResponse = await StockRepository.getSettingByName('company_name', authHeader);
      // console.log(' company resp  '+companyResponse)
      console.log('.............')
      console.log(companyResponse)
      console.log('.............')
      const companySettingName = companyResponse.data.value;
      setCompanyName(companySettingName);

      if (companySettingName === 'notset') {
        setCompanySet(true); // Show the modal
        setmodelContent('You have to set the company information');
        return; // Exit early if company_name is not set
      } else {
        setBrandName(companySettingName);
      }

      // Second request: currency
      const currencyResponse = await StockRepository.getSettingByName('currency', authHeader);
      const currencySettingName = currencyResponse.data.value;

      if (currencySettingName === 'notset') {
        setmodelContent('Currency is not set');
        setCompanySet(true); // Show the modal
        return; // Exit early if currency is not set
      } else {
        setCurrency(currencySettingName);
      }

      // Third request: stockorbusiness
      const stockOrBusinessResponse = await StockRepository.getSettingByName('stockorbusiness', authHeader);
      const stockOrBusinessSettingName = stockOrBusinessResponse.data.value;

      if (stockOrBusinessSettingName === 'stock') {
        setBizType('stock');
        setRecPurchase('Received Cargo');
        setPurchaseMenu('TallyIn');
        setSaleMenu('TallyOut');
        // setitemOrCargo('Cargo');
      } else {
        setBizType('business');
      }

      // Fourth request: defaultmeasureunit
      const measureUnitResponse = await StockRepository.getSettingByName('defaultmeasureunit', authHeader);
      // Add logic here if needed for defaultmeasureunit
      // e.g., const measureUnit = measureUnitResponse.data.value;
      // setDefaultMeasureUnit(measureUnit);

    } catch (error) {
      console.error('Error fetching settings:', error);
      // Handle errors as needed (e.g., show an error modal)
    }
  }
  const getAllPurchasess = (date1, date2) => {
    const purchaseDatesDTO = {
      date1: date1,
      date2: date2
    }
    StockRepository.findPurchases(purchaseDatesDTO, authHeader).then((res) => {
      setPurchasess(res.data);
    })
  }

  const [berthReportGrpByhour, setBerthReportGrpByhour] = useState([])
  const [berthReportGrpByMonth, setBerthReportGrpByMonth] = useState([])

  // this are the states to capture all tallyin tallyou and tally
  const [tally, setTally] = useState([])
  const [tallyIn, setTallyIn] = useState([])
  const [tallyOut, setTallyOut] = useState([])
  const { startDate, endDate } = useContext(DateRangeContext)
  const [truckAmount, setTruckAmount] = useState(0)
  const [dataFinishedFetching, setDataFinishedFetching] = useState(false)
  const getAllREvenue = (date1, date2) => {

    Reporting.revenueReport(date1, date2, authHeader).then((res) => {
      // setPurchasess(res.data.res);
      setTruckAmount(res.data.totalAmountParkingInvoice)
      setBerthingReport(res.data.berthReport)
      setTruckReport(res.data.truckReport)
      setCargoAmountReport(res.data.cargoAmount)
      setVessels(res.data.vesselsatport)
      //group by hour
      setBerthReportGrpByhour(res.data.berthReportGrpByhour)
      setBerthReportGrpByMonth(res.data.berthReportGrpByMonth)
      setDataFinishedFetching(true)
      
    })
  }

  useEffect(() => {
    // getAllPurchasess(CurrentDate.todaydate(), CurrentDate.todaydate())
    
    getSettingByName()
   
    getAllREvenue(startDate, endDate)
    setDataLoad(true)
    // setShowModal(true)

  }, [])

  let totalBerthing = 0.0
  let totBerthingNumber = 0.0

  let totalTruck = 0.0
  let totalTruckNumber = 0.0

  let totcargo = 0.0;
  let toCargotAmount = 0.0;
  let toCargotNumber = 0.0;
  useEffect(() => {
    // Create an interval that runs every 10 seconds (10000 milliseconds)
    const intervalId = setInterval(() => {
      getAllREvenue(CurrentDate.todaydate(), CurrentDate.todaydate())

      // Place any code you want to run every 10 seconds here.
    }, (3 * 60 * 1000));

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, []);

  const chartData = {
    labels: berthReportGrpByhour.map((inv, index) => ((inv.etd).split('T')[1]).split(':')[0] + 'h'),
    datasets: [
      {
        label: 'Berthing charges',
        data: berthReportGrpByhour.map((inv) => { inv.quay_amount === 0 ? 10 : inv.quay_amount }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Teal with transparency
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,

      },
      {
        label: 'Wharfage charges',
        data: berthReportGrpByhour.map((inv) => inv.vessel_handling_charges),
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Pink with transparency
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },


    ]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quay and Vessel Handling Charges vs time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time', // X-axis label
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (RWF)', // Y-axis label
          color: '#666',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        beginAtZero: true,
      },
    }
  };
  const styles = {
    row: {
      height: '300px', // Fixed height from your Row
      backgroundColor: '#fff',
      fontSize: '21px',
      color: '#f17618',
    },
    placeholder: {
      height: '100%', // Fills Col height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chartContainer: {
      height: '100%', // Fills Col height
      width: '100%',  // Fills Col width
      position: 'relative', // Ensures chart stays within bounds
    },
  };

  useEffect(() => {
    setupBycolor()
  }, [])
  const [allTruckEntries, setallTruckEntries] = useState(0)
  const [allBerthings, setAllBerthings] = useState(0)
  const [allunberthedVessels, setAllunberthedVessels] = useState(0)
  const [alloutgoingTrucks, setAlloutgoingTrucks] = useState(0)
  const [allTrucksAtTheport, setallTrucksAtTheport] = useState([])

  const [totIncomingWoodedboats, setTotIncomingWoodedboats] = useState(0)
  const [totOutgoingWoodedboats, setTotOutgoingWoodedboats] = useState(0)
  const [totBerthedWoodedboats, setTotBerthedWoodedboats] = useState(0)

  let allAvailableAtPort = 0
  const loadAllData = () => {
    Reporting.revenueReport(startDate, endDate, authHeader).then((res) => {
      setBerthingReport(res.data.berthReport)
      setBerthingList(res.data.berthingList)
      setTruckReport(res.data.truckReport)
      setCargoAmountReport(res.data.cargoAmount)
      setPaneReportDataLoad(false)
      setallTruckEntries(res.data.allEnteredTrucks)//only a number
      setAllBerthings(res.data.totBerthings)
      setAllunberthedVessels(res.data.totUnberthedVessels)//only a number
      setAlloutgoingTrucks(res.data.totOutgoingTrucks)//only a number
      setallTrucksAtTheport(res.data.allTrucksAtTheport)//List of trucks at the port

      setTotIncomingWoodedboats(res.data.totIncomingWoodedboats)//only a number
      setTotOutgoingWoodedboats(res.data.totOutgoingWoodedboats)//only a number
      setTotBerthedWoodedboats(res.data.totBerthedWoodedboats)//only a number
      setTruckAmount(res.data.totalAmountParkingInvoice)
      
    })
    Reporting.vesselTruckWeightReport(startDate, endDate, authHeader).then((res) => {
      setTruckReport(res.data.BerthedVessels)
    })
    Reporting.allCargoReport(startDate, endDate, authHeader).then((res) => {
      setTally(res.data.tally)
      setTallyIn(res.data.tallyIn)
      setTallyOut(res.data.tallyOut)

      setAllTallies({
        tally: res.data.tally,
        tallyIn: res.data.tallyIn,
        tallyOut: res.data.tallyOut,
      });
    })
  }
  useEffect(() => {
    loadAllData()
  }, [startDate])
  useEffect(() => {
    loadAllData()
  }, [endDate])
  const [allTallies, setAllTallies] = useState({})
  let tallycargoCash = 0
  useEffect(() => {// this detects the title to determine the data to display in the modal
    let dataToDisplay = 'Reporting'
    setDataTodisplayInModal('Reporting')
    dataToDisplay = dataTodisplayInModal

    if ('Reporting' === dataToDisplay) {
      setPaneReportDataLoad(true)
      Reporting.revenueReport(startDate, endDate, authHeader).then((res) => {
        setBerthingReport(res.data.berthReport)
        setBerthingList(res.data.berthingList)
        setTruckReport(res.data.truckReport)
        setCargoAmountReport(res.data.cargoAmount)
        setPaneReportDataLoad(false)
        setTruckAmount(res.data.totalAmountParkingInvoice)
        
      })
      Reporting.vesselTruckWeightReport(startDate, endDate, authHeader).then((res) => {
        setTruckReport(res.data.BerthedVessels)
      })
      Reporting.allCargoReport(startDate, endDate, authHeader).then((res) => {
        setTally(res.data.tally)
        setTallyIn(res.data.tallyIn)
        setTallyOut(res.data.tallyOut)
        tallycargoCash += res.data.tally.invoiceAmount
        setAllTallies({
          tally: res.data.tally,
          tallyIn: res.data.tallyIn,
          tallyOut: res.data.tallyOut,
        });
      })
    }
  }, [modalTitle])


  let berthingCount = 0, totalTruckAtPort = 0
  
  return (
    <>
     
      <DetailedReportLoaderModal show={showModal} onHide={ ()=>setShowModal(false)} />
    
      
      {allTrucksAtTheport.map((truck) => { totalTruckAtPort += 1 })}
      {vessels.map((vessel) => { allAvailableAtPort += 1 })}
      {berthingReport.map((inv) => {
        totalBerthing += inv.quayAmount + inv.handlingCharges
        berthingCount += 1
      })}
      {truckReport.map((truck) => {
        totalTruck += Number(truck.amount)
        totalTruckNumber += 1
      })}
      {cargoAmountReport.map((ca) => { //cargoAmount: ca
        totcargo += ca.total_weight
        toCargotAmount += ca.amount;
        toCargotNumber += ca.id
      })}

      {vessels.map((vessel) => {
        totBerthingNumber += 1
      })}
      <PagesWapper>
        

        <Container fluid  >
          {/* summarized */}
          {/* <DashboardReportsFilters /> */}

          {dataLoad ? <>
            <SingleNumberTop topRightTxt1={(totalBerthing).toLocaleString()} topRightTxt2={(truckAmount ?truckAmount:0).toLocaleString()}
              topRightTxt3={toCargotAmount && (toCargotAmount).toLocaleString()} clickHandler={()=>setShowModal(true)}
              topRightTxt4={(totalBerthing + totalTruck + toCargotAmount).toLocaleString()}
              bottomLeftTxt1={`${berthingCount} Vessel(s) charged `} bottomLeftTxt2={`${totalTruckNumber} Trucks (Gate)`} bottomLeftTxt3={`${toCargotNumber} invoices`} />

            <IncomingOutgoing
              allBerthings={allBerthings}
              allEnteredTrucks={allTruckEntries}
              allunberthedVessels={allunberthedVessels}
              alloutgoingTrucks={alloutgoingTrucks}
              allAvailableAtPort={allAvailableAtPort}
              totalTruckAtPort={totalTruckAtPort} totIncomingWoodedboats={totIncomingWoodedboats} totOutgoingWoodedboats={totOutgoingWoodedboats} totBerthedWoodedboats={totBerthedWoodedboats} />
            {/* <ThreeCharts dataOne={berthReportGrpByMonth} /> */}
            <Row className="  m-5 mt-0  p-4   ">

              {/* <span className="mt-2 mb-5" /> */}

              <Col md={12}><h4 className='fw-uppercase '><b>Today</b> </h4></Col>
              {ShowExpenses && <ColItem color="#a3110c" purchase={expenses} cls="beerskin3" totPurchases={totEpenses} label="Expenses" />}

              <Row style={{ height: '400px', fontSize: '21px', borderRadius: '10px', color: '#f17618' }} className="bg-light d-none ">
                <Col className="border p-2" style={{ flex: 1 }} md={3}>
                  <DoughnutChart totalQuayAmount={berthingReport[0]?.quay_amount} totalHandlingCharges={berthingReport[0]?.vessel_handling_charges} />
                </Col>
                <Col className="border" md={9} xs={12}   >
                  <div style={styles.chartContainer}>
                    <Bar data={chartData} options={options} />
                  </div>
                </Col>
              </Row>
              {/* <ColItem color={`#03ccef`} clickHandler={() => setReportType('revenueBerth')} path="/revenuereport" purchase={purchase} cls="beerskin3" totPurchases={` Rwf ${totalBerthing}`} label={bisOrStock} />
              <ColItem color={`#03ccef`} clickHandler={() => setReportType('revenueBerth')} path="/revenuereport" purchase={purchase} cls="beerskin3" totPurchases={` Rwf ${(totalTruck).toLocaleString()}`} label={bisOrStockSale} />
              <ColItem color={`#03ccef`} clickHandler={() => setReportType('revenueBerth')} path="/revenuereport" purchase={purchase} cls="beerskin3" totPurchases={` Rwf ${(toCargotAmount).toLocaleString()}`} label={bisOrStockBenefit} />
              <SmallerSplitter /> */}
              <hr />
              {/* <SmallerSplitter />
              <ColItem color={`#03ccef`} clickHandler={() => setReportType('totBerthed')} path="/revenuereport" purchase={purchase} cls="beerskin3" totPurchases={` ${totBerthingNumber}`} label={totalVesselLabel} />
              <ColItem color={`#03ccef`} clickHandler={() => setReportType('totBerthed')} path="/revenuereport" purchase={purchase} cls="beerskin3" totPurchases={` ${(totalTruckNumber).toLocaleString()}`} label={totalTrucksLabel} />
              <ColItem color={`#03ccef`} clickHandler={() => setReportType('totBerthed')} path="/revenuereport" purchase={purchase} cls="beerskin3" totPurchases={` ${(totcargo).toLocaleString()} Kg`} label={totalWeightLabel} />
              <Splitter />
              <SmallerSplitter /> */}

              <Row>
                <Col md={4} className="offset-md-4 my-4" >
                  <TitleSmallDescNoSlide title="Vessels At the port" />
                </Col>
              </Row>
              <BerthedList vessels={vessels} />
              {/* <RevenueSummary debtsList={debtsList} /> */}
            </Row> </>
            :
            <Row className="d-flex justify-content-center">
              <Col md={3} className="loader"> </Col>
            </Row>
          }

          <CustomModalPopup
            title='Company Information'
            content={modelContent}
            show={CompanySet} onHide={() => goToSettings()} />
        </Container>
      </PagesWapper>
    </>
  )
}

export default Dashboard

export const LocalReportLayouts = ({ modalTitle, berthingReport, truckReport, cargoAmountReport, berthingAmount, trucksamount, cargoAmount, grandTotal }) => {
  if ('Vessels' === modalTitle) {
    return <BerthingRevenue invoiceReport={berthingReport} />
  } else if ('Trucks' === modalTitle) {
    return <TrucksRevenue truckReport={truckReport} />
  } else if ('Cargo' === modalTitle) {
    return <CargoRevenue cargoAmountReport={cargoAmountReport} />
  } else if ('All Revenue' === modalTitle) {
    return <AllRevenue berthingAmount={berthingAmount} trucksamount={trucksamount} cargoAmount={cargoAmount}
      grandTotal={grandTotal} />
  } else if ('allTrucksAtTheport' == modalTitle) {


  }
}