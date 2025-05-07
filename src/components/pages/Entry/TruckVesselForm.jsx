import React, { useState, useRef, useEffect, useContext } from 'react';
import { useReactToPrint } from "react-to-print";
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';;
import PrintCompanyInfo from '../../Global/PrintCompanyInfo';
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead';
import SearchBox from '../../Global/SearchBox';
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from '../../Global/ContainerRow';
import InputRow, { DropDownInput, InputRowNumber } from '../../Global/Forms/InputRow';
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar';
import ListOptioncol, { TableOpen } from '../../Global/ListTable';
import FormTools from '../../Global/Forms/PubFnx';
import { ColItemContext } from '../../Global/GlobalDataContentx';
import StockRepository from '../../services/StockServices/StockRepository';

function TruckVessel(props) {
  const [userType, setUserType] = useState('');
  const [id, setId] = useState(0);
  const [cargo, setCargo] = useState('');
  const [unit, setUnit] = useState(0);
  const [weight, setWeight] = useState(0);
  const [arrivalId, setArrivalId] = useState(0);
  const [profilesArrival, setProfilesArrival] = useState([]);
  const [allTrucks,setAllTrucks] = useState([])
  const [allVessels,setAllVessels] = useState([])
  const [existingArrivals, setExistingArrivals] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [createArrival, setCreateArrival] = useState(true);
  const [invoiceDisplay,setInvoiceDisplay] = useState(0);
  const [amount,setAmount] = useState()

  const [vesselValues, setVesselValues] = useState({
    capacity: "",
    contact_number: "",
    dimension: "",
    loa: "",
    name: "",
    owner_operator: "",
    plate_number: "",
  });
  const { destination_id } = useContext(ColItemContext);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'arrival-records',
  });

  // Fetch client profiles
  const fetchProfiles = async () => {
    try {
      const response = await StockRepository.getClientProfiles("client");
      setProfilesArrival(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Fetch arrivals
  const fetchArrivals = async () => {
    try {
      const response = await StockRepository.getArrivalsWithItem();
      setExistingArrivals(response.data);
    } catch (error) {
      console.error("Error fetching arrivals:", error);
    }
  };

  // Save new arrival
  const saveArrival = async (e) => {
    e.preventDefault();
    try {
      const response = await StockRepository.saveArrival({ id: arrivalId });
      setArrivalId(response.data.id);
      setCreateArrival(false);
    } catch (error) {
      console.error("Error saving arrival:", error);
    }
  };

  // Handle vessel data changes
  const handleVesselDataChange = (e) => {
    const { name, value } = e.target;
    setVesselValues((prev) => ({ ...prev, [name]: value }));
  };

  const getProfiles = () => {
    StockRepository.getClientProfiles("client").then(res=>{
      setProfilesArrival(res.data)
      console.log("-------------------&&&&------------------")
      console.log(res.data)
    })
  }

  const getAllTrucks = () => {
    StockRepository.getAllTruck().then(res=>{
      setAllTrucks(res.data)
      console.log(res.data)
    })

  }
  const getallVessels = () => {
    StockRepository.findArrival_note().then(res=>{
      setAllVessels(res.data)
      console.log(res.data)
    })

  }

  useEffect(() => {
    fetchProfiles();
    fetchArrivals();
    getProfiles()
    getAllTrucks()
    getallVessels()
    setUserType(localStorage.getItem('catname') || 'guest');
  }, [refresh]);

  // Render arrival form
  const renderArrivalForm = () => (
    <AnimateHeight id="arrivalForm" duration={300} animateOpacity={true} height="auto">
      <ContainerRowBtwn clearBtn={false} form="Arrival Notice" showLoader={false}>
        <FormInnerRightPane onSubmitHandler={saveArrival}>
          <DropDownInput
            handle={(e) => setArrivalId(e.target.value)}
            name="client"
            label="Bollard"
          >
            {profilesArrival.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.name} {profile.surname}
              </option>
            ))}
          </DropDownInput>
          <SaveUpdateBtns saveOrUpdate="Save" />
        </FormInnerRightPane>
      </ContainerRowBtwn>
    </AnimateHeight>
  );

  const renderInvoice = () => {
    return <AnimateHeight id="arrivalForm" duration={300} animateOpacity={true} height="auto">
      <ContainerRowBtwn clearBtn={false} form="Invoice" showLoader={false}>
        <FormInnerRightPane onSubmitHandler={saveArrival}>
            <InputRowNumber name="amount" val={amount} handle={(e) => setAmount(e.target.value)} label="Weight" />
          <p title='save invoice and continue to receipt' className="btn" style={{backgroundColor:"rgb(212, 111, 43)",border:"none"}}   onClick={()=> setInvoiceDisplay(2)}>Receipt</p>

          {/* <SaveUpdateBtns saveOrUpdate="Save" /> */}
        </FormInnerRightPane>
      </ContainerRowBtwn>
    </AnimateHeight>
  }

  const renderReceipt = () => {
    // const [amount,setAmount] = useState()
    return <AnimateHeight id="receiptform" duration={300} animateOpacity={true} height="auto">
      <ContainerRowBtwn clearBtn={false} form="Receipt" showLoader={false}>
        <FormInnerRightPane onSubmitHandler={saveArrival}>
            <InputRowNumber name="amount" val={amount} handle={(e) => setAmount(e.target.value)} label="Weight" />
            <p className="btn" style={{backgroundColor:"rgb(212, 111, 43)",border:"none"}}   onClick={()=> setInvoiceDisplay(3)}>Receipt</p>

          {/* <SaveUpdateBtns saveOrUpdate="Save" /> */}
        </FormInnerRightPane>
      </ContainerRowBtwn>
    </AnimateHeight>
  }

  
  const renderExit = () => {
    // const [amount,setAmount] = useState()
    return <AnimateHeight id="receiptform" duration={300} animateOpacity={true} height="auto">
      <ContainerRowBtwn clearBtn={false} form="exit" showLoader={false}>
        <FormInnerRightPane onSubmitHandler={saveArrival}>
            <InputRowNumber name="amount" val={amount} handle={(e) => setAmount(e.target.value)} label="Weight" />
            {/* <p className="btn" style={{backgroundColor:"rgb(212, 111, 43)",border:"none"}}   onClick={()=> setInvoiceDisplay(2)}>exit</p> */}

          <SaveUpdateBtns saveOrUpdate="Save" />
        </FormInnerRightPane>
      </ContainerRowBtwn>
    </AnimateHeight>
  }
  

  // Render main form
  const renderMainForm = () => (
    <AnimateHeight id="mainForm" duration={300} animateOpacity={true} height="auto">
      <ContainerRowBtwn clearBtn={false} form="Arrival Details" showLoader={false}>
        <FormInnerRightPane onSubmitHandler={(e) => e.preventDefault()}>
          <h2 className="fw-bold">Arrival ID: {arrivalId.toString().padStart(3, "0")}</h2>
          <InputRowNumber name="Number of Items" val={unit} handle={(e) => setUnit(e.target.value)} label="Unit" />
          <InputRowNumber name="Weight" val={weight} handle={(e) => setWeight(e.target.value)} label="Weight" />
          <InputRow name="Cargo Name" val={cargo} handle={(e) => setCargo(e.target.value)} label="Cargo" />
          
          <DropDownInput
            handle={(e) => setArrivalId(e.target.value)}
            name="truck"
            label="Bollard"
          >
            {allTrucks && allTrucks.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.name} {profile.surname}
              </option>
            ))}
          </DropDownInput>
          <DropDownInput
            handle={(e) => setArrivalId(e.target.value)}
            name="vessel"
            label="Bollard"
          >
            {allVessels && allVessels.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.name} {profile.surname}
              </option>
            ))}
          </DropDownInput>
          <p className="btn btn-primary" style={
            {backgroundColor:"rgb(212, 111, 43)",border:"none"}
          } onClick={()=> setInvoiceDisplay(1)}>invoice</p>
          {/* <SaveUpdateBtns saveOrUpdate="Save" /> */}
        </FormInnerRightPane>
      </ContainerRowBtwn>
    </AnimateHeight>
  );

  // Render table
  const renderArrivalTable = () => (
    <div ref={componentRef} className="dataTableBox">
      <PrintCompanyInfo />
      <TableOpen>
        <TableHead>
          <td>ID</td>
          <td>Date Time</td>
          <td>Book ID</td>
          <td>Destination ID</td>
          {userType === 'admin' && <td className="delButton">Option</td>}
        </TableHead>
      </TableOpen>
    </div>
  );

  return (
    <>

      <h3>{props.title}</h3>
      {createArrival ? renderArrivalForm() : invoiceDisplay == 0?renderMainForm():
      invoiceDisplay == 1?renderInvoice():invoiceDisplay == 3?renderReceipt():renderExit()
      }
      <ContainerRow mt="3">
        <ListToolBar
          listTitle="Arrival Records History"
          height="auto"
          entity="new record"
          changeFormHeightClick={() => setRefresh(!refresh)}
          handlePrint={handlePrint}
        />
        <SearchformAnimation searchHeight="auto">
          <SearchBox />
        </SearchformAnimation>
        {renderArrivalTable()}
      </ContainerRow>
      {!refresh && <DataListLoading />}
    </>
  );
}

export default TruckVessel;
