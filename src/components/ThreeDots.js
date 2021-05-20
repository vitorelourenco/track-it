import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function ThreeDots(props){
  return(
    <Loader 
      type="ThreeDots"
      color="#ffffff"
      height={props.iconHeight}
      width={props.iconWidth}
      timeout={0} //3 secs
    />
  );
}

export default ThreeDots;