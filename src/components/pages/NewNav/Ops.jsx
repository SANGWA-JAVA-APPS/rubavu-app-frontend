import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PathOpsHome } from "./BreadCrumb";
import { TitleBigList } from "../../globalcomponents/TitleAndList";
import { ListItems } from "./ListItems";
import { VesselSubMenu } from "./BerthSubMenu/VesselSubMenu";
import { Trucks } from "./opsSubMenu/Trucks";
import { Warehouse } from "./opsSubMenu/Warehouse";
import { Vessel } from "./opsSubMenu/Vessel";

import { Icon } from "react-icons-kit";
import { truck } from "react-icons-kit/icomoon/truck";
import { home as whouse } from "react-icons-kit/icomoon/home";
import { androidBoat as boat } from "react-icons-kit/ionicons/androidBoat";
import { statsBars as reports } from "react-icons-kit/icomoon/statsBars";
import { MainMenuContainer } from "./MainMenuContainer";
import { map_add as gate } from "react-icons-kit/ikons/map_add";
import { Gate } from "./opsSubMenu/Gate";
import { Reports } from "./opsSubMenu/Reports";
import StockRepository from "../../services/StockServices/StockRepository";
import { ColItemContext } from "../../Global/GlobalDataContentx";
import { ButtonContext } from "../../globalcomponents/ButtonContext";
import { MenuSides } from "./Vessels";
import { useAuthHeader } from "react-auth-kit";
export const Ops = () => {
  const [gateOption, setGateOption] = useState(true);
  const [trucksOption, setTruckslOption] = useState(false);
  const [warehouseOption, setWarehouseOption] = useState(false);
  const [vesselOption, setVesselOption] = useState(false);
  const [reportOption, setReportOption] = useState(false);
  const authHeader = useAuthHeader()();
  const {
    setTrucksProcesses,
    setWarehouseProcesses,
    setVesselProcesses,
    setArrivalPage,
    setTallyPage,
    setPurchasePage,
    setSalePage,
    setInvoicePage,
    setReceiptPage,
    setExitPage,
    chosenProcess,
  } = useContext(ColItemContext);

  const { setupBycolor, disableBodyScroll } = useContext(ColItemContext);
  useEffect(() => {
    setupBycolor();
    disableBodyScroll();
    setTruckslOption(true);
  }, []);
  const { arrivalNote, setArrivalNote } = useContext(ButtonContext);
  useEffect(() => {
    setArrivalPage(true);
    setTallyPage(false);
    setPurchasePage(false);
    setSalePage(false);
    setInvoicePage(false);
    setReceiptPage(false);
    setExitPage(false);
    // RESET THE SOURCE AND THE DESTINATION IDs
    if (arrivalNote.dest_id !== "0" || arrivalNote.source_id !== "0") {
      setArrivalNote((prevState) => ({
        // reset the destination beacuse on this page the user may change the destination/source
        ...prevState, // Keep existing values
        dest_id: "0", // Update only arrival_id
        source_id: "0", // Update only arrival_id
      }));
    }
  }, [arrivalNote.dest_id, arrivalNote.source_id]);
  const truckClick = () => {
    StockRepository.getTruckProcesses(authHeader).then((res) => {
      setTrucksProcesses(res.data);
    });
    setVesselOption(false);
    setWarehouseOption(false);
    setTruckslOption(true);
    setReportOption(false);
    setGateOption(false);
  };
  const warehouseClick = () => {
    setVesselOption(false);
    setWarehouseOption(true);
    setTruckslOption(false);
    setReportOption(false);
    setGateOption(false);
    StockRepository.getWarehouseProcesses(authHeader).then((res) => {
      setTrucksProcesses(res.data);
    });
  };
  const vesselClick = () => {
    setVesselOption(true);
    setWarehouseOption(false);
    setTruckslOption(false);
    setReportOption(false);
    setGateOption(false);
    StockRepository.getVesselProcesses(authHeader).then((res) => {
      setTrucksProcesses(res.data);
    });
  };
  const reportClick = () => {
    setVesselOption(false);
    setWarehouseOption(false);
    setTruckslOption(false);
    setReportOption(true);
    setGateOption(false);
  };

  return (
    <MainMenuContainer>
      {/* <PathOpsHome /> */}
      <MenuSides
        partLeft={
          <TitleBigList
            li1={
              <ListItems
                title="Trucks"
                desc="Trucks, Truck by entries, arrival notes"
                chosen={trucksOption ? "redBorder" : ""}
                iconName={truck}
                clickHandle={truckClick}
              />
            }
            li2={
              <ListItems
                title="Warehouse"
                desc="Tonnage, vessels"
                iconName={whouse}
                chosen={warehouseOption ? "redBorder" : ""}
                clickHandle={warehouseClick}
              />
            }
            li3={
              <ListItems
                title="Vessel"
                desc="Some desc"
                iconName={boat}
                chosen={vesselOption ? "redBorder" : ""}
                clickHandle={vesselClick}
              />
            }
          />
        }
        partRight={
          <Row>
            <Trucks />
          </Row>
        }
      />
    </MainMenuContainer>
  );
};
