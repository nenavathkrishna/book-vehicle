import React from "react";

const NextButton = ({ onNext, isDisabled }) => (
  <div className="mt-4">
    <button
      className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : ''}`}
      onClick={onNext}
      disabled={isDisabled}
    >
      Next
    </button>
    {isDisabled && (
      <p className="mt-2 text-red-500 text-sm">Please answer the question before proceeding.</p>
    )}
  </div>
);

export default NextButton;
