import { createContext, useEffect, useState } from "react";
import CurrentDate from "../Global/CurrentDate";

export const ButtonContext = createContext();
export const ButtonProvider = ({ children }) => {
  const [inputs, setInputs] = useState([{
    id: null, cargo: "", unit: 0, weight: 0, weighttype: "", entry_date: "",
    dest_id: "", source_id: "", description: "OK", start_date_time: "", end_date_time: ""
  }]);

  const [itemToRemove, setItemToRemove] = useState(0);

  const [step, setStep] = useState(1)
  const [showDialog, setShowDialog] = useState(false);
  const [confimed, setConfimed] = useState(false);
  const [newSourceId, setnewSourceId] = useState();
  const [newDestId, setnewDestId] = useState();


  //invoice items, shared betwee the invoice and the invoice printout

  const [serviceName, setServiceName] = useState()
  const [chargeCriteria, setChargeCriteria] = useState()

  //single saved in the arrival table

  const [arrivalNote, setArrivalNote] = useState({
    id: null,
    date_time: "",
    source_id: "",
    dest_id: "",
    destination_id: "",
    arrival_id: "",
    tin_number: "",
    name: "",
    surname: "",
    telephone: "",
    tarifftype: "",
    collect_type: "",

    ddcom: "",
    exporter: "",
    clearingAgent: "",
    description: "",
     userid:localStorage.getItem('userid'),

  })

  //wait to see that the user has comfirmed to delete a row
  useEffect(() => {
    if (confimed) {
      const newInputs = inputs.filter((_, i) => i !== itemToRemove); // Remove by index
      setInputs(newInputs);
      setConfimed(false)
    }
  }, [showDialog, itemToRemove, confimed])

  /* #region -------------functions to be used ------------------------ */
  const handleYes = () => {//dialog box
    setShowDialog(true);
  };
  const updateArrivalNote = (field, value) => {
    setArrivalNote((prev) => ({ ...prev, [field]: value }));
  };

  const getTotalQty = () => {
    return inputs.reduce((total, item) => total + Number(item.unit), 0);
  };
  const getTotalWgt = () => {
    return inputs.reduce((total, item) => total + Number(item.weight), 0);
  };

  const addInput = () => {
    setInputs([...inputs, { id: null, cargo: "", unit: 0, weight: 0, weighttype: "", entry_date: "", dest_id: "", source_id: "", description: "OK", start_date_time: "", end_date_time: "" }]);
    setInputs((prevInputs) =>
      prevInputs.map((input) => ({ ...input, source_id: newSourceId, dest_id: newDestId }))
    );
  };
  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value; // Update the specific field

    setInputs(newInputs);
  };
  const removeInput = (index) => {
    handleYes()
    setItemToRemove(index)

  };

  const confirm = (index) => {//clicked yes on the dialog box
    setConfimed(true)
    setShowDialog(false)
  };
  const clearAll = () => {
    setInputs([{ id: null, cargo: "", unit: 0, weight: 0, weighttype: "", entry_date: "", dest_id: "", source_id: "", description: "", start_date_time: "", end_date_time: "" }]); // Reset to one empty row
  };
  const alertModal = (index) => {
    setItemToRemove(index)
    setShowDialog(true)

  }
  const cargoTypes = [
    "sacs & bags < 100kg",
    "jerry cans up to 25",
    "package laden cartons cons. material"
  ]

  return (
    <ButtonContext.Provider
      value={{
        addInput, handleChange, removeInput, inputs, setInputs, clearAll, getTotal: getTotalQty, getTotalWgt,
        arrivalNote, setArrivalNote, updateArrivalNote,
        step, setStep,
        showDialog, setShowDialog, handleYes,
        //to show the dialog box  
        alertModal,
        confirm, //to remove a row
        confimed, setConfimed,//to confirm yes first to delete a row,
        newSourceId, setnewSourceId,
        newDestId, setnewDestId,
        cargoTypes // these are for the dropdown.
        , serviceName, setServiceName, chargeCriteria, setChargeCriteria   //this is used on the invoice

      }}>
      {children}
    </ButtonContext.Provider>
  );
};

// Custom Hook to use the Context
export const useButtonContext = () => useContext(ButtonContext);








export const DateRangeContext = createContext();
export const DateRangeProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setendDate] = useState(CurrentDate.todaydate())
  return (
    <DateRangeContext.Provider value={{
      startDate, setStartDate, endDate, setendDate
    }}>
      {children}
    </DateRangeContext.Provider>
  )
}
export const useDateRangeContext = () => useContext(DateRangeContext);