import { useContext, useEffect, useRef, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { ProcessMultipleArrivalNotes } from "../../Client/ProcessMultipleArrivalNotes";
import CurrentDate from "../../Global/CurrentDate";
import { InputOnly, InputOnlyDisabled } from "../../Global/Forms/InputRow";
import { ColItemContext } from "../../Global/GlobalDataContentx";
import SeaarchBytyping, {
  SearchTableResult,
} from "../../globalcomponents/SeaarchBytyping";
import StockRepository from "../../services/StockServices/StockRepository";
import { ClientTableRows } from "../Invoice/Invoice";

export const StorageCalculation = () => {
  const [clients, setClients] = useState([]);
  const [clientsItems, setClientsItems] = useState([]);
  const [cargoINWh, setCargoINWh] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const authHeader = useAuthHeader()();
  const auth = useAuthUser();
  const user = auth();
  useEffect(() => {
    StockRepository.allCargInWh(authHeader).then((res) => {
      const arrivalNotes = res.data.allCargoByClient.map((note) => ({
        id: note.id,
        arrivalNote: note.itemName || "",
        quantity: note.cargoBalance || note.noGrpCargoBalance || 0, // Use cargoBalance or noGrpCargoBalance as quantity
        newQuantity: 0,
        appendedValue: 0,
        tinNumber: note.tin_number,
        name: note.name,
        surname: note.surname,
        category: note.category,
        dateTime: note.date_time,
        lastDate: note.lastDate,
        prevQty: note.prevQty,
        weight: note.weight,
        itemId: note.itemId,
        userId: user,
        period: "",
        InvoicableCost: 0,
        assortedOrNot: note.assortedOrNot,
      }));

      setClients(arrivalNotes);
    });
  }, []);

  /* #region ------------------SEARCH CLIENT BY TYPING ------------------------------------------------- */
  const {
    searchTableVisible,
    setSearchTableVisible,
    commonArrayTwo,
    setCommonArrayTwo,
  } = useContext(ColItemContext);

  const { showSelected, setShowSelected } = useContext(ColItemContext);
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext);
  const inputRef = useRef(null);
  const [itemssbyname, setItemssbyname] = useState([]); //Data List searched by name
  const tableHead = ["id", "Client name", "tin number"];
  const [clientId, setClientId] = useState();
  const hideSelectorLink = () => {
    setShowSelected(false);
    setSearchItemValue("");
  };
  const findClientByNameLike = (searchItemValue) => {
    StockRepository.findClientByNameLike(searchItemValue, authHeader).then(
      (res) => {
        setItemssbyname(res.data.content);
        setDataLoad(true);
      }
    );
  };
  const [numCaharacters, setNumCaharacters] = useState(0);
  const searchOnThirdSecond = (e) => {
    // setSearchTableVisible(true)
    const newVal = e.target.value;
    setSearchItemValue(newVal);
    setNumCaharacters(newVal.length);
    if (newVal.length > 3) {
      setSearchTableVisible(true);
      findClientByNameLike(searchItemValue);
    } else {
      setSearchTableVisible(false);
    }

    if (searchItemValue) {
      //if the user has typed in something
      // setCompletedSearch(false)
      // setSearchProgress(true) // Go and show the progress bar,
    }
  };
  useEffect(() => {
    StockRepository.findClientCargonById(clientId, authHeader).then((res) => {
      setCommonArrayTwo(res.data.allCargoByClient);
    });
  }, [refresh]);

  const searchDone = async (id, name, platenumber, status) => {
    setSearchTableVisible(false);
    setSearchItemValue(name);
    setShowSelected();

    const res = await StockRepository.findClientCargonById(id, authHeader).then(
      (res) => {
        setClients(res.data.allCargoByClient);
        setCommonArrayTwo(res.data.allCargoByClient);
        setClientId(id);
        const clientsItems = res.data.allCargoByClientAndItem.map((note) => ({
          id: note.id,
          arrivalNote: note.itemName || "",
          quantity: note.cargoBalance || note.noGrpCargoBalance || 0, // Use cargoBalance or noGrpCargoBalance as quantity
          newQuantity: 0,
          appendedValue: 0,
          tinNumber: note.tin_number,
          name: note.name,
          surname: note.surname,
          category: note.category,
          dateTime: note.date_time,
          lastDate: note.lastDate,
          prevQty: note.prevQty,
          weight: note.weight,
          itemId: note.itemId,
          userId: user,
          period: "",
          InvoicableCost: 0,
        }));
        setClientsItems(clientsItems);
      }
    );
  };
  /* #endregion */

  return (
    <div>
      <h4 className="fw-bold">Storage Calculation</h4>

      <Row className="d-flex justify-content-start">
        <Col md={12}>
          <SeaarchBytyping
            placeholder="Enter a Client Name"
            labelName="Search Client By Name "
            searchTableVisible={searchTableVisible}
            showSelected={showSelected}
            hideSelectorLink={hideSelectorLink}
            currentTypingVal={searchItemValue}
            ref={inputRef}
            sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)}
          />
          {searchTableVisible && (
            <SearchTableResult
              tableHead={tableHead}
              TableRows={() => (
                <ClientTableRows
                  clients={itemssbyname}
                  searchDone={searchDone}
                />
              )}
            />
          )}
        </Col>
      </Row>

      {/* <ClientCargo clients={clients} clientsItems={clientsItems} setClients={setClients} refresh={refresh} setRefresh={setRefresh} /> */}
      <ProcessMultipleArrivalNotes refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
};

export const cargoOutOfWarehouse = ({ cargoWarehouse }) => {
  const [inputs, setInputs] = useState([]); // State for arrival notes
  const [error, setError] = useState(""); // State for validation errors

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    setInputs(updatedInputs);
  };

  try {
    const arrivalNotes = cargoWarehouse.map((note) => ({
      id: note.id,
      arrivalNote: note.itemName || "",
      quantity:
        note.cargoBalance > 0
          ? note.cargoBalance
          : note.noGrpCargoBalance > 0 ?? 0, // Assuming first tally's unit as quantity
      newQuantity: 0, // Initialize newQuantity
    }));
    setInputs(arrivalNotes);
  } catch (err) {
    console.error("Error fetching arrival notes:", err);
    setError("Failed to load arrival notes.");
  }
  return (
    <>
      <h4 className="fw-bold">Cargo Out of Warehouse</h4>
    </>
  );
};
export const WarehouseCargo = ({ cargoINWh }) => {
  const { searchItemValue } = useContext(ColItemContext);
  const localHead = {
    padding: "12px",
    color: "#fff",
  };
  const [showmore, setShowmore] = useState(false);

  const showmoreHandler = () => {
    setShowmore(!showmore);
  };
  return (
    <div>
      <h4 className="fw-bold">Warehouse Cargo Inventory</h4>
      <a href="#" onClick={showmoreHandler} className="">
        Show more info
      </a>
      <table className="table table-bordered">
        <tr
          className="fw-bold"
          style={{ backgroundColor: "#1d6d7b", padding: "9px" }}>
          <td style={localHead}>Arrival id </td>
          {showmore && (
            <>
              <td style={localHead}>Client name </td>
              <td style={localHead}>TIN </td>
              <td style={localHead}>Arrival Date </td>
            </>
          )}
          <td style={localHead}>Cargo </td>
          <td style={localHead}>Previous </td>
          <td style={localHead}>Balance </td>
          {showmore && <td style={localHead}>Last removal </td>}
          {<td style={localHead}>New Quantity</td>}
        </tr>
        <tbody>
          {" "}
          {cargoINWh.map((client) => (
            <tr>
              <td>{client.id}</td>
              {showmore && (
                <>
                  <td>{client.name}</td>
                  <td>{client.tin}</td>
                  <td>{client.arrivalDate}</td>
                </>
              )}
              <td>{client.cargo}</td>
              <td>{client.previous}</td>

              <td>{client.balance}</td>
              {showmore && <td>{client.lastRemoval}</td>}
              <td>
                <InputOnly
                  name="newQuantity"
                  moreclass="w-100"
                  val={client.newQuantity}
                  handle={(e) =>
                    handleChange(index, "newQuantity", e.target.value)
                  }
                  label="newQuantity"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const StorageWithAsosrtedOrNot = ({ setMainTableorNextStep, cargoDetails, setCargoDetails, handleUpdateClick, handleEditableChange, handleChangePeriod, charges, })=> {
  // with assorted or not
  const gobackToWarehouse = () => {
    setMainTableorNextStep(1);
  };
  const { commonArrayTwo, setCommonArrayTwo, commonArray, setCommonArray } =
    useContext(ColItemContext);
  const [newQuantity, setnewQuantity] = useState();
  const [totalWeights, setTotalWeights] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [paymentOption, setPaymentOption] = useState(""); // Initialize as empty string so both radio buttons are unchecked
  const auth = useAuthUser();
  const user = auth();

  const [userType, setUserType] = useState();
  const [data, setData] = useState({});
  const [period, setPeriod] = useState();
  const [startDate, setStartDate] = useState();
  const [todayDate, setTodayDate] = useState(CurrentDate.todaydate());
  const [endDate, setEndDate] = useState();
  const [dateDiff, setDateDiff] = useState(null);
  const [dateRangeCategory, setDateRangeCategory] = useState("");
  const [fee, setFee] = useState();

  const [diffMinusFifteen, setDiffMinusFifteen] = useState(0);

  const [totalQuantity, setTotalQunatity] = useState();
  const [weightPerUnit, setWeightPerUnit] = useState();

  //The two below are for displaying purposes
  const [firstRangeCharge, setFirstRangeCharge] = useState(0);
  const [extraRangeCharge, setExtraRangeCharge] = useState(0);
  const [enableArrivalDate, setEnableArrivalDate] = useState("disabled");

  useEffect(() => {
    setUserType(localStorage.getItem("catname"));
  }, []);
  useEffect(() => {
    setData(commonArray);
    setTodayDate(CurrentDate.todaydate());
    setStartDate(commonArray[0].date_time.split(" ")[0]);
    // setCargoDetails({})
    setWeightPerUnit(commonArray[0].weight);
    const totalCargoBalance = commonArray.reduce(
      (sum, item) =>
        sum + (Number(item.cargoBalance || item.noGrpCargoBalance) || 0),
      0
    );
    setTotalQunatity(totalCargoBalance);
    calculateChargesWithDays();
  }, [commonArray]);

  useEffect(() => {
    calculateChargesWithDays();
  }, [newQuantity, totalWeights, startDate, endDate, todayDate]);

  useEffect(() => {
    if (commonArray[0]?.assortedOrNot === "Assorted") {
      setTotalWeights(commonArray[0].weight);
      // alert(commonArray[0].weight)
    } else {
      const totalCargoBalance = commonArray.reduce(
        (sum, item) => sum + (Number(newQuantity * weightPerUnit) || 0),
        0
      );
      setTotalWeights(newQuantity * weightPerUnit);
    }
  }, [totalQuantity, commonArray, newQuantity]);

  const calculateChargesWithDays = () => {
    let diffDays = 0,
      daysAfter15 = 0;
    if (startDate && todayDate) {
      const start = new Date(startDate);
      const end = new Date(todayDate);
      const diffTime = Math.abs(end - start);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDateDiff(diffDays);

      daysAfter15 = Math.max(0, diffDays - 15);
      setDiffMinusFifteen(daysAfter15);
      setDateRangeCategory("0 to Day 14");
      console.log(`The days after 15: ${daysAfter15}`);
    } else {
      setDateDiff(0);
    }
    // Use diffDays directly here!
    let calculatedCharges = 0;
    if (totalWeights && diffDays) {
      if (daysAfter15 <= 0) {
        // This means the total days are 14 or less
        calculatedCharges = totalWeights * diffDays * 0;
        setDateRangeCategory("0 to Day 14");
        setFee(0);
        setFirstRangeCharge(0);
        setExtraRangeCharge(0);
      } else if (daysAfter15 >= 0 && daysAfter15 <= 15) {
        // Days between 15 to 30 (i.e., daysAfter15 is 0 to 15)
        calculatedCharges = totalWeights * daysAfter15 * 0.6;
        setDateRangeCategory("15 to Day 30");
        setFee(0.6);
        setFirstRangeCharge(calculatedCharges); // Entire charge is within the first 15
        setExtraRangeCharge(0);
      } else if (daysAfter15 > 15) {
        // Days above 30
        const charge1 = totalWeights * 15 * 0.6;
        const charge2 = totalWeights * (daysAfter15 - 13) * 1.2;

        calculatedCharges = charge1 + charge2;
        setDateRangeCategory("30 days onwards");
        setFee(1.2);
        // 🔹 Set your new state values
        setFirstRangeCharge(charge1);
        setExtraRangeCharge(charge2);
      } else {
        setDateRangeCategory("");
        setFirstRangeCharge(0);
        setExtraRangeCharge(0);
      }
      setTotalAmount(calculatedCharges);
      console.log("---------- Calculated Charges:", calculatedCharges);
    }
  };

  const markers = {
    fontWeight: "bold",
    padding: "3px",
  };
  return (
    <>
      <Row className="">
        <Col md={12}>
          {data &&  (
            <Card
              style={{ width: "100%", maxWidth: "100%", margin: "20px auto" }}>
              <Card.Header>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md={8}>
                    <Card.Title>
                      {" "}
                      Total Entries:{" "}
                      <span style={markers}>{commonArray.length}</span> of same{" "}
                      <span style={markers}>date</span> and same{" "}
                      <span style={markers}>item</span>, on {startDate}{" "}
                    </Card.Title>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div className="d-flex row flex-column align-items-end">
                  <Col md={10}>
                    <Row className="d-flex justify-content-between">
                      <Col md={6}>
                        {" "}
                        <div className="mb-2">
                          <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="paymentOption" id="exitWithPayment" value="Exit with payment" checked={paymentOption === "Exit with payment"} onChange={(e) => setPaymentOption(e.target.value)} />
                            <label
                              className="form-check-label"
                              htmlFor="exitWithPayment">
                              {" "}
                              Exit with payment{" "}
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="paymentOption" id="exitPayLater" value="Exit and pay later" checked={paymentOption === "Exit and pay later"} onChange={(e) => setPaymentOption(e.target.value)} />
                            <label
                              className="form-check-label"
                              htmlFor="exitPayLater">
                              Exit and pay later
                            </label>
                          </div>
                        </div>
                      </Col>
                      <Col md={4} className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                         onClick={() => console.log( "Payment option confirmed:", paymentOption ) }>
                          Confirm & Continue
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </div>

                {/* Payment Option Indicator */}
                {paymentOption && (
                <div
                  className={`alert ${
                    paymentOption === "Exit with payment"
                      ? "alert-success"
                      : "alert-warning"
                  } mb-3`}>
                  <strong>Selected Option: </strong>
                  {paymentOption}
                  {paymentOption === "Exit with payment" && (
                    <span> ✅ - Payment will be processed immediately</span>
                  )}
                  {paymentOption === "Exit and pay later" && (
                    <span> ⏳ - Payment will be deferred</span>
                  )}
                </div>
                )}
                  {paymentOption && (  
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row className="d-flex justify-content-between">
                      <Col md={5}>
                        {" "}
                        <strong> {commonArray[0].itemName}</strong>
                      </Col>
                      <Col md={5}>
                        <strong>Collect Type: </strong>
                        {commonArray[0]?.assortedOrNot}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col md={3}>
                        {totalQuantity} units - {weightPerUnit}/unit
                        <InputOnly
                          num={true}
                          name={`${
                            commonArray[0].collect_type === "Assorted"
                              ? "Total Exit Quantity"
                              : " Exit Quantity"
                          } `}
                          val={newQuantity}
                          handle={(e) => setnewQuantity(e.target.value)}
                          placeholder="qty"
                          label="qty"
                        />
                        <br />
                      </Col>
                      <Col md={3}>
                        <strong>
                          {totalWeights && totalWeights.toLocaleString()} KG
                        </strong>
                        {commonArray[0].assortedOrNot === "Assorted" ? (
                          <InputOnly
                            num={true}
                            name={"Exit Weight"}
                            val={totalWeights}
                            handle={(e) => setTotalWeights(e.target.value)}
                            placeholder="qty"
                            label="qty"
                          />
                        ) : (
                          <InputOnlyDisabled
                            num={true}
                            name={"Exit Weight"}
                            val={totalWeights}
                            placeholder="qty"
                            label="qty"
                          />
                        )}
                      </Col>
                      <Col md={3} className="pt-4">
                        <input
                          disabled
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </Col>
                      <Col md={3} className="pt-4">
                        <input
                          type="date"
                          min={startDate}
                          value={todayDate}
                          onChange={(e) => setTodayDate(e.target.value)}
                        />
                      </Col>
                      <Col md={4} className="pt-4">
                        <p>
                          <strong>Full Date Range:</strong> {dateDiff} day(s)
                        </p>
                        <p>
                          <strong>Category:</strong> {dateRangeCategory}{" "}
                        </p>
                        <p>
                          <strong>Fee:</strong> {fee}{" "}
                          {fee < 1 && "Grace period"}{" "}
                        </p>
                      </Col>
                      <Col md={5} className="pt-4">
                        {data !== null && (
                          <div>
                            <p>
                              <strong>New Quantity:</strong> {newQuantity || 0}{" "}
                            </p>
                            {extraRangeCharge ? (
                              <>
                                <p
                                  style={{
                                    color: "#f17618",
                                    fontSize: "13px",
                                    padding: "0px",
                                    margin: "0px",
                                  }}>
                                  15 days (first 15 days):
                                  <strong>
                                    {" "}
                                    {firstRangeCharge.toLocaleString()} RWF{" "}
                                  </strong>
                                </p>
                                <p
                                  style={{
                                    color: "#f17618",
                                    fontSize: "13px",
                                    padding: "0px",
                                    margin: "0px",
                                  }}>
                                  Over 15 days (beyond 30 days):{" "}
                                  <strong>
                                    {extraRangeCharge.toLocaleString()} RWF{" "}
                                  </strong>
                                </p>
                                <hr />{" "}
                                <p
                                  style={{
                                    color: "#4d2608",
                                    fontSize: "16px",
                                    padding: "0px",
                                    margin: "0px",
                                  }}>
                                  {" "}
                                  Grand Total:{" "}
                                  <strong>
                                    <u>
                                      {(
                                        extraRangeCharge + firstRangeCharge
                                      ).toLocaleString()}{" "}
                                      RWF{" "}
                                    </u>
                                  </strong>
                                </p>
                              </>
                            ) : (
                              <p style={{ color: "#8c460f" }}>
                                Total Amount:RWF
                                <strong>
                                  {" "}
                                  {(totalAmount &&
                                    totalAmount.toLocaleString()) ||
                                    0}{" "}
                                </strong>
                              </p>
                            )}
                          </div>
                        )}
                      </Col>
                      {/* arrivalId, quantity, newQuantity, itemId, index, totalAmount,         totalWeights, dateRangeCategory, assortedOrNot, paymentOption */}
                      <Col md={3} className="pt-4">
                        <Button
                          variant={
                            paymentOption === "Exit with payment"
                              ? "success"
                              : "warning"
                          }
                          onClick={() =>
                            handleUpdateClick(
                              0,
                              totalQuantity,
                              newQuantity,
                              data.itemId,
                              0,
                              totalAmount,
                              totalWeights,
                              dateRangeCategory,
                              data.assortedOrNot,
                              paymentOption
                            )
                          }>
                          {paymentOption === "Exit with payment"
                            ? "Save & Pay Now"
                            : "Save & Pay Later"}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
                  )}
              </Card.Body>
            </Card>
          )}
          <br />
        </Col>
      </Row>
    </>
  );
};
