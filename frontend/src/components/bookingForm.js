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
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <label>What is your name?</label>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Number of wheels</label>
          <div>
            <label>
              <input
                type="radio"
                name="numWheels"
                value="2"
                onChange={() => setNumWheels(2)}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="numWheels"
                value="4"
                onChange={() => setNumWheels(4)}
              />
              4
            </label>
          </div>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Type of vehicle</label>
          <div>
            {vehicleTypes.map((type) => (
              <label key={type.id}>
                <input
                  type="radio"
                  name="vehicleType"
                  value={type.id}
                  onChange={() => setSelectedVehicleType(type.id)}
                />
                {type.name}
              </label>
            ))}
          </div>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <label>Specific Model</label>
          <div>
            {vehicleModels.map((model) => (
              <label key={model.id}>
                <input
                  type="radio"
                  name="vehicleModel"
                  value={model.id}
                  onChange={() => setSelectedModel(model.id)}
                />
                {model.model}
              </label>
            ))}
          </div>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <label>Select Date Range</label>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
              minDate={startDate}
            />
          </div>
          <button type="button" onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 6 && (
        <div>
        <h3>Confirm your booking</h3>
        <p><strong>Name:</strong> {firstName} {lastName}</p>
        <p><strong>Number of Wheels:</strong> {numWheels}</p>

         {/* Correctly map selected vehicle type */}
    <p><strong>Vehicle Type:</strong> {
      vehicleTypes.find(type => type.id === selectedVehicleType)?.name || 'Not Selected'
    }</p>
        {/* <p><strong>Vehicle Type:</strong> {vehicleTypes.find(type => type.id === selectedVehicleType)?.name}</p> */}
        <p><strong>Vehicle Model:</strong> {vehicleModels.find(model => model.id === selectedModel)?.model}</p>
        <p><strong>Booking Dates:</strong> {startDate ? startDate.toLocaleDateString() : "N/A"} to {endDate ? endDate.toLocaleDateString() : "N/A"}</p>
        <button type="submit" >Confirm Booking</button>
      </div>
      )}
    </form>
  );
};

export default VehicleBookingForm;
