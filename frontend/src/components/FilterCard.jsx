import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '../redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ['Delhi NCR', 'Bangalore', 'Pune', 'Mumbai']
  },
  {
    filterType: "Industry",
    array: ['frontend', 'backend', 'database', 'ai']
  },
  {
    filterType: "Salary",
    array: ['0-40k', '40k-80k', '80k-1.2L', '1.2L+']
  }
]

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandle = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setsearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Filter Jobs</h1>
      <hr className="mb-6 border-gray-300" />

      {
        filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">{data.filterType}</h2>

            <RadioGroup value={selectedValue} onValueChange={changeHandle}>
              {
                data.array.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 mb-2">
                    <RadioGroupItem
                      id={`${data.filterType}-${idx}`}
                      value={item}
                      className="border-gray-400"
                    />
                    <Label htmlFor={`${data.filterType}-${idx}`} className="text-gray-600 cursor-pointer">
                      {item}
                    </Label>
                  </div>
                ))
              }
            </RadioGroup>
          </div>
        ))
      }
    </div>
  )
}

export default FilterCard
