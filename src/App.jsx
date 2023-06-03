import { useState } from "react";
import "./App.css";
import BagFilterForm from "./components/BagFilterForm";
import FramedFilterForm from "./components/FramedFilterForm";

function App() {
  const [showBag, setShowBag] = useState(true);

  const handleFramedFilter = () => {
    setShowBag(true);
  };

  const handleBagFilter = () => {
    setShowBag(false);
  };

  return (
    <div className="flex flex-col  h-screen">
      <h1 className="text-center mt-6 mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-red-700">
          KLIMASPEKT
        </span>
      </h1>

      <button
        onClick={showBag ? handleBagFilter : handleFramedFilter}
        className=" self-center m-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-"
      >
        {showBag ? "Prebaci na vrećasti filter" : "Prebaci na kazetni filter"}
      </button>
      {showBag ? <FramedFilterForm /> : <BagFilterForm />}

      <p className="p-5 text-gray-900 bg-white text-center font-light">
        &copy;2023 Kristijan Koprtla. All Rights Reserved.
      </p>
    </div>
  );
}

export default App;
