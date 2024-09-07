import Navbar from "../../components/Navbar";
import userImage from "../../assets/doctorImage.png";
import CommonButton from "../../components/CommonButton";
import CommonModal from "../../components/CommonModal";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, isWithinInterval } from "date-fns";
import { RiInformation2Line } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
import COLORS from "../../constants/constants";
import { getApiWithAuth } from "../../apis/api";

const allAppointments = [
  {
    name: "Sabrina Max",
    email: "sabrina.max@gmail.com",
    phone: "03017933876",
    date: "12-09-2024",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 1,
  },
  {
    name: "Joy Doe",
    email: "joe.doe@gmail.com",
    phone: "03017933876",
    date: "12-09-2024",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 2,
  },
  {
    name: "Max John",
    email: "max.john@gmail.com",
    phone: "03017933876",
    date: "12-09-2024",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 3,
  },
];

const DoctorHome = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="px-6" style={{ width: "80%", margin: "0 auto" }}>
        <h1 className="text-3xl mt-10 font-semibold">Pending Appointments</h1>
        {allAppointments.map((item) => (
          <div
            className="flex items-center border border-gray100 p-7 rounded-2xl mt-6"
            key={item.doctorId}
          >
            <div className="" style={{ width: "7%" }}>
              <img src={userImage} height={60} width={60} alt="Doctor" />
            </div>
            <div className="" style={{ width: "73%" }}>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-base text-gray600">{item.email}</p>
              <p className="text-base text-gray600">{item.phone}</p>
            </div>
            <div className="flex" style={{ width: "20%" }}>
              <CommonButton
                title={"Accept"}
                variant={"filled"}
                onClick={() => handleBookAppointment(item)}
              />
              <div className="ml-1 w-full">
                <CommonButton
                  title={"Decline"}
                  onClick={() => handleBookAppointment(item)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorHome;
