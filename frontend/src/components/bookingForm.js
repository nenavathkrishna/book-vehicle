import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VehicleBookingForm = () => {
  const [step, setStep] = useState(1); // Track current step/question
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numWheels, setNumWheels] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");

  // Fetch vehicle types based on number of wheels
  useEffect(() => {
    if (numWheels) {
      axios
        .get(`http://localhost:3000/api/vehicle/types?wheels=${numWheels}`)
        .then((response) => {
          setVehicleTypes(response.data);
          setSelectedVehicleType(null); // Reset selection
        });
    }
  }, [numWheels]);

  // Fetch specific vehicle models based on selected vehicle type
  useEffect(() => {
    if (selectedVehicleType) {
      axios
        .get(`http://localhost:3000/api/vehicle/models?type=${selectedVehicleType}`)
        .then((response) => {
          setVehicleModels(response.data);
          setSelectedModel(null); // Reset selection
        });
    }
  }, [selectedVehicleType]);

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      firstName,
      lastName,
      numWheels,
      selectedVehicleType,
      selectedModel,
      startDate,
      endDate,
    };
    axios
      .post("http://localhost:3000/api/book", bookingData)
      .then((response) => {
        alert("Booking Successful!");
      setStep(1);
      setFirstName("");
      setLastName("");
      setNumWheels(null);
      setVehicleTypes([]);
      setSelectedVehicleType(null);
      setVehicleModels([]);
      setSelectedModel(null);
      setStartDate(null);
      setEndDate(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Show popup or alert for conflicting booking
          alert(error.response.data.error);
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred. Please try again.");
        }
      });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!firstName || !lastName) {
          setError("Please fill out both first and last name.");
          return; // Prevent advancing to next step
      }
  } else if (step === 2) {
      if (!numWheels) {
          setError("Please select the number of wheels.");
          return;
      }
  } else if (step === 3) {
      if (!selectedVehicleType) {
          setError("Please select a vehicle type.");
          return;
      }
  } else if (step === 4) {
      if (!selectedModel) {
          setError("Please select a vehicle model.");
          return;
      }
  } else if (step === 5) {
      if (!startDate || !endDate) {
          setError("Please select both start and end dates.");
          return;
      }
  }

  // If validation passes, reset the error and move to next step
  setError("");
  setStep(step + 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-6"
    >
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">What is your name?</h2>
          <div className="space-y-4">

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="button" onClick={handleNextStep}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Number of wheels</h2>
          <div className="space-y-2">
          <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="numWheels"
                  value="2"
                  onChange={() => setNumWheels(2)}
                  className="form-radio"
                />
                <span>2 Wheels</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="numWheels"
                  value="4"
                  onChange={() => setNumWheels(4)}
                  className="form-radio"
                />
                <span>4 Wheels</span>
              </label>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="button" onClick={handleNextStep}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Type of vehicle</h2>
          
          <div className="space-y-4">
            {vehicleTypes.map((type) => (
              <label key={type.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="vehicleType"
                  value={type.id}
                  onChange={() => setSelectedVehicleType(type.id)}
                />
                <span>{type.name}</span>
              </label>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="button" onClick={handleNextStep}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          
          <h2 className="text-xl font-semibold text-center mb-4">Specific Model</h2>
          <div className="space-y-4">
            {vehicleModels.map((model) => (
              <label key={model.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="vehicleModel"
                  value={model.id}
                  onChange={() => setSelectedModel(model.id)}
                />
                 <span>{model.model}</span>
               
              </label>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button 
          type="button" 
          onClick={handleNextStep}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >Next</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Select Date Range</h2>
          <div className="space-y-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
             
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              minDate={startDate}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="button" 
          onClick={handleNextStep}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >Next</button>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Your Booking</h3>
        
        <div className="space-y-2 text-left">
          <p><strong>Name:</strong> {firstName} {lastName}</p>
          <p><strong>Number of Wheels:</strong> {numWheels}</p>
          <p><strong>Vehicle Type:</strong> {
            vehicleTypes.find(type => type.id === selectedVehicleType)?.name || 'Not Selected'
          }</p>
          <p><strong>Vehicle Model:</strong> {
            vehicleModels.find(model => model.id === selectedModel)?.model || 'Not Selected'
          }</p>
          <p><strong>Start Date:</strong> {startDate ? startDate.toLocaleDateString() : 'Not Selected'}</p>
          <p><strong>End Date:</strong> {endDate ? endDate.toLocaleDateString() : 'Not Selected'}</p>
        </div>
    
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Confirm Booking
        </button>
      </div>
      )}
    </form>
    </div>
  );
};

export default VehicleBookingForm;


// <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-6"
//       >
//         {step === 1 && (
//           <div>
//             <h2 className="text-xl font-semibold text-center mb-4">What is your name?</h2>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleNextStep}
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <h2 className="text-xl font-semibold text-center mb-4">Number of Wheels</h2>
//             <div className="space-y-2">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="numWheels"
//                   value="2"
//                   onChange={() => setNumWheels(2)}
//                   className="form-radio"
//                 />
//                 <span>2 Wheels</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="numWheels"
//                   value="4"
//                   onChange={() => setNumWheels(4)}
//                   className="form-radio"
//                 />
//                 <span>4 Wheels</span>
//               </label>
//             </div>
//             <button
//               type="button"
//               onClick={handleNextStep}
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {/* Repeat similar structure for other steps */}
//       </form>
//     </div>