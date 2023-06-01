import { useState } from "react";

const squaredPriceFilc = 14.46;
const squaredPriceLim = 12.5;
const squaredPriceRabicZica = 12;
const izradaPoKomadu = 20;
const prostorPoKomadu = 19.83;

const FramedFilterForm = () => {
  const [heightFilter, setHeightFilter] = useState("");
  const [widthFilter, setWidthFilter] = useState("");
  const [depthFilter, setDepthFilter] = useState("");

  const [result, setResult] = useState("");
  const resultEUR = result / 7.53
  const resultEURPDV = resultEUR + (resultEUR * 0.25)

  const pHeightFilter = parseFloat(heightFilter);
  const pWidthFilter = parseFloat(widthFilter);
  const pDepthFilter = parseFloat(depthFilter);

  const priceFilc = () => {
    const cijenaFilca48 =
      ((pHeightFilter + 23) / 1000) * (pWidthFilter * 2 * 0.001);
    const cijenaFilca98 =
      ((pHeightFilter + 23) / 1000) * (pWidthFilter * 3 * 0.001);
    if (depthFilter < 51) {
      return cijenaFilca48 * squaredPriceFilc;
    } else if (depthFilter > 51) {
      return cijenaFilca98 * squaredPriceFilc;
    }
  };

  const priceLim = () => {
    const cijenaLima = (pHeightFilter + pWidthFilter) * 2;

    if (depthFilter < 51) {
      return (((cijenaLima * 3.04) / 10) * squaredPriceLim) / 1000;
    } else if (depthFilter > 51) {
      return (((cijenaLima * 5.01) / 10) * squaredPriceLim) / 1000;
    }
  };

  const priceRabicZica = () => {
    const rabicZica48 =
      (pHeightFilter / 1000) * ((pWidthFilter * 2) / 1000) * 2;
    const rabicZica98 =
      (pHeightFilter / 1000) * ((pWidthFilter * 2) / 1000) * 3;
    if (depthFilter < 51) {
      return rabicZica48 * squaredPriceRabicZica;
    } else if (depthFilter > 51) {
      return rabicZica98 * squaredPriceRabicZica;
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // tu ide finalni izracun
    const calculateResult =
      priceFilc() +
      priceLim() +
      priceRabicZica() +
      izradaPoKomadu +
      prostorPoKomadu;
    setResult(
      calculateResult % 1 === 0
        ? calculateResult.toFixed(0)
        : calculateResult.toFixed(2)
    );
    console.log("cijena filca je: ", priceFilc());
    console.log("cijena lima je", priceLim());
    console.log("cijena zice je", priceRabicZica());

    // reset the form
    setHeightFilter("");
    setWidthFilter("");
    setDepthFilter("");
  };
  return (
    <>
      <form
        className="bg-white shadow-md rounded-lg p-11 flex flex-col justify-center items-center flex-grow"
        onSubmit={handleCalculate}
      >
        <div className="mb-4">
          <label>
            <span>Upišite visinu kazetnog filtera:</span>
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
            <span>Upišite širinu kazetnog filtera:</span>
            <input
              className="w-64 md:w-96 block border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
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
            <span>Upišite dubinu kazetnog filtera:</span>
            <input
              className="w-64 md:w-96 block border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              required
              type="number"
              placeholder="98"
              onChange={(e) => setDepthFilter(e.target.value)}
              value={depthFilter}
            />
          </label>
        </div>

        <button
          type="submit"
          className="m-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-2xl"
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
            Cijena bez PDV: {resultEUR.toFixed(2)} EUR
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

export default FramedFilterForm;
