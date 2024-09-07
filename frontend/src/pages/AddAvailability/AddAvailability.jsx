import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../PatientHome/style.css";
import CommonButton from "../../components/CommonButton";

const AddAvailability = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="px-6" style={{ width: "80%", margin: "0 auto" }}>
        <h1 className="text-3xl mt-10 text-center font-semibold">
          Set your Availabilities
        </h1>
        <div
          className=" "
          style={{ margin: "0 auto", width: "fit-content", marginTop: 20 }}
        >
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
        <div className="" style={{ width: 300, margin: "0 auto" }}>
          <CommonButton title={"Set Availability"} variant={"filled"} />
        </div>
      </div>
    </div>
  );
};

export default AddAvailability;
