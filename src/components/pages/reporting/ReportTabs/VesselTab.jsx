import { useState, useRef, useContext } from "react";
import { Form } from "react-bootstrap";
import ReportTable from "../SharedTabComponents/ReportTable";
import { motion, AnimatePresence } from "framer-motion";
import RadioGroup from "../SharedTabComponents/RadioButtons";
import { TitleSmallDesc } from "../../../globalcomponents/TitleSmallDesc";
import ListToolBar, { SearchformAnimation } from "../../../Global/ListToolBar";
import SearchBox from "../../../Global/SearchBox";
import CurrentDate from "../../../Global/CurrentDate";
import { useReactToPrint } from "react-to-print";
import { DateRangeContext } from "../../../globalcomponents/ButtonContext";

export default function VesselTab() {
  const [view, setView] = useState("brief"); // default view
  
  // Header component states
  const [searchHeight, setSearchHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const { setStartDate, setendDate } = useContext(DateRangeContext);
  
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1);
    setendDate(date2);
  };
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "vessel-report",
  });

  return (
    <div ref={componentRef}>
      <TitleSmallDesc
        title={`Vessel Report on ${CurrentDate.todaydate()} `}
        moreclass="showOnPrint"
      />
      <ListToolBar
        hideSaveBtn={true}
        height={height}
        entity="Vessel report"
        changeFormHeightClick={() => setHeight(height === 0 ? "auto" : 0)}
        changeSearchheight={() =>
          setSearchHeight(searchHeight === 0 ? "auto" : 0)
        }
        handlePrint={handlePrint}
        searchHeight={searchHeight}
      />
      <SearchformAnimation searchHeight={searchHeight}>
        <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
      </SearchformAnimation>
      
      {/* Radio Buttons */}
      <RadioGroup
        name="VesselTab"
        options={[
          { label: "Brief", value: "brief" },
          { label: "Summarized", value: "summarized" },
          { label: "Details", value: "details" },
        ]}
        selected={view}
        onChange={setView}
      />
      

      {/* Dynamic Table with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view} // important: re-renders on view change
          initial={{ opacity: 0, y: 50 }} // start hidden
          animate={{ opacity: 1, y: 0 }} // slide in
          exit={{ opacity: 0, y: -50 }} // slide out
          transition={{ duration: 0.2 }}
        >
          <ReportTable view={view} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
