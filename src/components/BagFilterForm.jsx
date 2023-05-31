import { useState } from 'react'
import Select from 'react-select'


const categories = [
  {value: 'g4', label: 'G4'},
  {value: 'f5', label: 'F5'},
  {value: 'f6', label: 'F6'},
  {value: 'f7', label: 'F7'},
  {value: 'f9', label: 'F9'},
]

const BagFilterForm = () => {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [number3, setNumber3] = useState('')
  const [number4, setNumber4] = useState('')


  const [category, setCategory] = useState('')
  const [result, setResult] = useState('')


  const handleCalculate = (e) => {
    e.preventDefault()
    const num1 = parseFloat(number1)
    const num2 = parseFloat(number2)
    const calculateResult = num1 + num2
    setResult(calculateResult % 1 === 0 ? calculateResult.toFixed(0) : calculateResult.toFixed(2))

    // reset the form
    setNumber1('')
    setNumber2('')
    setNumber3('')
    setNumber4('')
  }
console.log(category.value);

  return (
    <>
       <form className='bg-white shadow-md rounded-lg p-11 flex flex-col justify-center items-center flex-grow' onSubmit={handleCalculate}>
        <div className='mb-4'>
          <label>
            <span>Upišite visinu filtera:</span>
            <input className='w-64 md:w-96 block border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500'
              required
              type="number"
              placeholder='592' 
              onChange={(e) => setNumber1(e.target.value)}
              value={number1}
            />
        </label>
        </div>
        
        <div className='mb-4'>
          <label>
            <span>Upišite širinu filtera:</span> 
            <input className='w-64 md:w-96 block  border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500'
              required 
              type="number"
              placeholder='287'
              onChange={(e) => setNumber2(e.target.value)} 
              value={number2}
            />
          </label>
        </div>
        
        <div className='mb-4'>
          <label>
            <span>Upišite dubinu filter vreće:</span> 
            <input className='w-64 md:w-96 block  border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500'
              required 
              type="number"
              placeholder='360'
              onChange={(e) => setNumber3(e.target.value)} 
              value={number3}
            />
          </label>
        </div>

        <div className='mb-4'>
          <label>
            <span>Upišite broj filter vreća:</span> 
            <input className='w-64 md:w-96 block border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500'
              required 
              type="number"
              placeholder='6'
              onChange={(e) => setNumber4(e.target.value)} 
              value={number4}
            />
          </label>
        </div>

        <div className="mb-4">
          <label>
            <span>Vrsta materijala:</span>
            <Select className='w-64 md:w-96'
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </label>
        </div>

        <button type='submit' className='m-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-2xl'>Izracunaj</button>

        {result && <p
            className="transition-opacity animate-fade-in"
            style={{
              animationName: 'fade-in',
              animationDuration: '600ms',
              animationTimingFunction: 'ease-in-out',
          }}
        >
          Cijena: {result} HRK
        </p>
}
        {result && <p
          className="transition-opacity animate-fade-in font-semibold"
          style={{
            animationName: 'fade-in',
            animationDuration: '600ms',
            animationTimingFunction: 'ease-in-out',
        }}  
        >
          Cijena: {(result / 7.53).toFixed(2)} EUR</p>}
      </form>
    </>
  )
}

export default BagFilterForm
