import Navbar from "../../components/Navbar";
import userImage from "../../assets/doctorImage.png";
import CommonButton from "../../components/CommonButton";
import CommonModal from "../../components/CommonModal";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const doctorsArr = [
  {
    doctorName: "Muneeba Dilawaze",
    doctorEmail: "sarfraz.ahmad@gmail.com",
    doctorPhone: "03017933876",
    appointments: [
      { startDate: "07-09-2024", endDate: "10-09-2024" },
      { startDate: "12-09-2024", endDate: "15-09-2024" },
      { startDate: "02-10-2024", endDate: "07-10-2024" },
    ],
    doctorId: 1,
  },
  {
    doctorName: "Rohail Taha",
    doctorEmail: "sarfraz.ahmad@gmail.com",
    doctorPhone: "03017933876",
    appointments: [
      { startDate: "07-09-2024", endDate: "10-09-2024" },
      { startDate: "12-09-2024", endDate: "15-09-2024" },
      { startDate: "02-10-2024", endDate: "07-10-2024" },
    ],
    doctorId: 2,
  },
  {
    doctorName: "Sarfraz Ahmad",
    doctorEmail: "sarfraz.ahmad@gmail.com",
    doctorPhone: "03017933876",
    appointments: [
      { startDate: "07-09-2024", endDate: "10-09-2024" },
      { startDate: "12-09-2024", endDate: "15-09-2024" },
      { startDate: "02-10-2024", endDate: "07-10-2024" },
    ],
    doctorId: 3,
  },
];

const PatientHome = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsVisible(true);
  };

  const isInRange = (date) => {
    return selectedDoctor?.appointments.some(
      ({ startDate: start, endDate: end }) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return date >= startDate && date <= endDate;
      }
    );
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6" style={{ width: "80%", margin: "0 auto" }}>
        <h1 className="text-3xl mt-10 font-semibold">Book an Appointment</h1>
        {doctorsArr.map((item) => (
          <div
            className="flex border border-gray100 p-7 rounded-2xl mt-6"
            key={item.doctorId}
          >
            <div className="" style={{ width: "7%" }}>
              <img src={userImage} height={60} width={60} alt="Doctor" />
            </div>
            <div className="" style={{ width: "73%" }}>
              <p className="text-lg font-medium">{item.doctorName}</p>
              <p className="text-base text-gray600">{item.doctorEmail}</p>
              <p className="text-base text-gray600">{item.doctorPhone}</p>
            </div>
            <div className="" style={{ width: "20%" }}>
              <CommonButton
                title={"Book Appointment"}
                onClick={() => handleBookAppointment(item)}
              />
            </div>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <CommonModal visible={isVisible} onClose={() => setIsVisible(false)}>
          <div className="flex  w-full">
            <div className=" px-10" style={{ width: "60%" }}>
              <h2 className="text-xl font-medium mb-4">
                Describe your symptoms here.{" "}
              </h2>
              <textarea
                className="w-full h-40 p-3 border-2 border-gray-300 rounded-lg resize-none"
                placeholder="Enter text here..."
              />
            </div>
            <div
              className=" border-l flex flex-col  items-center justify-center"
              style={{ width: "40%" }}
            >
              <h2 className="text-xl font-medium mb-4">
                Select Date Of Appointment
              </h2>
              <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                selectsRange
                inline
                filterDate={isInRange}
                minDate={new Date()}
              />
            </div>
          </div>
        </CommonModal>
      )}
    </div>
  );
};

export default PatientHome;
