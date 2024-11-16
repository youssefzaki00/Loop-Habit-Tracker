import "./loading.css";

function Loading() {
  return (
    <div className="h-screen w-screen bg-dark2 flex items-center justify-center">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
}

export default Loading;
