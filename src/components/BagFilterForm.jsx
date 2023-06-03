import { useState, useRef } from "react";
import Select from "react-select";

const categories = [
  { value: 10, label: "G4" },
  { value: 11, label: "F5" },
  { value: 11.5, label: "F6" },
  { value: 12, label: "F7" },
  { value: 12.5, label: "F8" },
  { value: 13, label: "F9" },
];

const squaredPriceLim = 12.5;
const squaredPriceSipka = 12.0;
const izradaPoKomadu = 20;

const BagFilterForm = () => {
  const [heightFilter, setHeightFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [depthFilter, setDepthFilter] = useState("");
  const [numOfBags, setNumOfBags] = useState("");
  const selectRef = useRef(null);

  const [category, setCategory] = useState("");
  const [result, setResult] = useState("");
  const resultEUR = result / 7.53;
  const resultEURPDV = resultEUR + resultEUR * 0.25;

  const pHeightFilter = parseFloat(heightFilter);
  const pWidthFilter = parseFloat(widthFilter);
  const pDepthFilter = parseFloat(depthFilter);
  const pNumOfBags = parseFloat(numOfBags);

  const priceFilcBag = () => {
    const vreca = (680 * (pDepthFilter + 40)) / 1000000;
    const vrecaNums = vreca * pNumOfBags;
    return vrecaNums * parseFloat(category.value);
  };

  const priceLimBag = () => {
    const okvir = (pHeightFilter + pWidthFilter) * 2;
    const gramaza = (okvir * 2.14) / 10;
    return (gramaza * squaredPriceLim) / 1000;
  };

  const priceOkvirSipke = () => {
    const okvirSipke =
      (pHeightFilter - 5) * 2 + (pWidthFilter - 5) * (pNumOfBags + 1);
    const okvirGrama = (okvirSipke * 9.8) / 100;
    return (okvirGrama * squaredPriceSipka) / 1000;
  };

  const materijalSaRadom =
    priceFilcBag() + priceLimBag() + priceOkvirSipke() + izradaPoKomadu;
  const prostorPoKomadu = 0.6 * materijalSaRadom;

  const handleCalculate = (e) => {
    e.preventDefault();
    const calculateResult =
      priceFilcBag() +
      priceLimBag() +
      priceOkvirSipke() +
      izradaPoKomadu +
      prostorPoKomadu;
    setResult(
      calculateResult % 1 === 0
        ? calculateResult.toFixed(0)
        : calculateResult.toFixed(2)
    );

    // reset the form
    setHeightFilter("");
    setWidthFilter("");
    setDepthFilter("");
    setNumOfBags("");
    setCategory("");
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded-lg p-11 pb-4 flex flex-col justify-center items-center flex-grow"
        onSubmit={handleCalculate}
      >
        <div className="mb-4">
          <label>
            <span>Upišite visinu filtera:</span>
            <input
              className="w-64 md:w-96 block border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              required
              type="number"
              placeholder="592"
              onChange={(e) => setHeightFilter(e.target.value)}
              value={heightFilter}
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span>Upišite širinu filtera:</span>
            <input
              className="w-64 md:w-96 block  border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              required
              type="number"
              placeholder="287"
              onChange={(e) => setWidthFilter(e.target.value)}
              value={widthFilter}
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span>Upišite dubinu filter vreće:</span>
            <input
              className="w-64 md:w-96 block  border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              required
              type="number"
              placeholder="360"
              onChange={(e) => setDepthFilter(e.target.value)}
              value={depthFilter}
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span>Upišite broj filter vreća:</span>
            <input
              className="w-64 md:w-96 block border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              required
              type="number"
              placeholder="6"
              onChange={(e) => setNumOfBags(e.target.value)}
              value={numOfBags}
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span>Vrsta materijala:</span>
            <Select
              className="w-64 md:w-96"
              ref={selectRef}
              value={category}
              onChange={(option) => setCategory(option)}
              options={categories}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="m-4 mb-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-2xl"
        >
          Izracunaj
        </button>

        {result && (
          <p
            className="transition-opacity animate-fade-in"
            style={{
              animationName: "fade-in",
              animationDuration: "600ms",
              animationTimingFunction: "ease-in-out",
            }}
          >
            Cijena bez PDV: {result} HRK
          </p>
        )}
        {result && (
          <p
            className="transition-opacity animate-fade-in font-semibold"
            style={{
              animationName: "fade-in",
              animationDuration: "600ms",
              animationTimingFunction: "ease-in-out",
            }}
          >
            Cijena bez PDV: {(result / 7.53).toFixed(2)} EUR
          </p>
        )}

        {result && (
          <p
            className="transition-opacity animate-fade-in font-semibold"
            style={{
              animationName: "fade-in",
              animationDuration: "600ms",
              animationTimingFunction: "ease-in-out",
            }}
          >
            Cijena sa PDV: {resultEURPDV.toFixed(2)} EUR
          </p>
        )}
      </form>
    </>
  );
};

export default BagFilterForm;
