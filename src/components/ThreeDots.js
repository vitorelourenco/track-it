import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ThreeDots = () => (
  <Loader
    type="ThreeDots"
    color="#ffffff"
    height={10}
    width={100}
    timeout={0} //3 secs
  />
);

export default ThreeDots;