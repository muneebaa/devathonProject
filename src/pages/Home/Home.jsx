import { useSelector } from "react-redux";
import { AiFillAlipayCircle } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import CommonInput from "../../components/CommonInput/CommonInput";

const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);
  return (
    <div>
      <p className="border border-red-400 text-4xl">Logout</p>
      <p className="border border-red-400 text-4xl">Logout</p>
      <AiFillAlipayCircle />
      <ClipLoader
        color={"red"}
        loading={true}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <CommonInput placeholder={"placehoder here"} />
    </div>
  );
};

export default Home;
