import React from 'react'

const ShowPinModal = () => {
  return (
    <>
     <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div 
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative z-[300]"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching backdrop
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                Enter Transaction PIN
              </h3>

              <div className="mb-6">
                <TextField
                  label="Enter 4-digit PIN"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  fullWidth
                  inputProps={{ maxLength: 4 }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-full"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    setShowPinModal(false);
                    setPin("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 w-full"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    withdrawFunds();
                  }}
                  disabled={!pin || pin.length !== 4 || loading}
                >
                  {loading ? "Processing..." : "Confirm Transfer"}
                </button>
              </div>
            </div>
          </div>
    </>
  )
}

export default ShowPinModal



{/* PIN MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 z-[200] overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setShowPinModal(false);
              setPin("");
            }}
          ></div>

         
         
        </div>
      )}