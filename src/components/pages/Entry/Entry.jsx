import { useContext } from "react"
import { ColItemContext } from "../../Global/GlobalDataContentx"
import TruckVessel from "./TruckVesselForm"
import TruckWarehouse from "./TruckWarehouse"
import VesselWarehouse from "./VesselWarehouse"
import WarehouseTruck from "./WarehouseTruck"
import WarehouseVessel from "./WarehouseVessel"
import VesselVessel from "./VesselVessel"
import VesselTruck from "./VesselTruck"
import TruckTruck from "./TruckTruck"
import { useNavigate } from "react-router-dom"

const Entry = () => {

  const {destination_id} = useContext(ColItemContext)
  const navigate = useNavigate();
  const handleNavigate =(e,destination_id) => {
      e.preventDefault(e)
      navigate("/entryform")
  }
  return <>
    {
      destination_id == 1?<VesselVessel title = "Vessel to Vessel" />:
      destination_id == 2? <VesselTruck title = "Vessel to Truc"/>:
      destination_id == 3? <TruckTruck title = "Truck to Truck"/>:
      destination_id == 4? <TruckVessel title = "Truck to Vessel"/>:
      destination_id == 5? <TruckWarehouse title ="Truck to warehouse"/>:
      destination_id == 6? <VesselWarehouse title = "Vessel to Warehouse"/>:
      destination_id == 7? <WarehouseTruck title = "Warehouse to Truck"/>:
      <WarehouseVessel title = "Warehouse to Vessel"/>
    }
  </>
}

export default Entry