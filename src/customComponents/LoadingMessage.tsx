import {BeatLoader} from "react-spinners";

function LoadingMessage() {
  return (
    <div style={{ width: "80px", height: "30px" }}>
     <BeatLoader
        color="#fff"
        loading={true}
     />
    </div>
  );
}

export default LoadingMessage;
