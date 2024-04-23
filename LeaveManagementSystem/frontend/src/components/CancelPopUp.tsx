import { FC } from "react"
import { CancelPropsTypes } from "../types/CancelProps"
import { updateLeaveRequest } from "../api/updateLeaveRequest"

const CancelPopUp: FC<CancelPropsTypes> = ({ setIsCancelPopup, currentId, leaveRequests }) => {
  const updateStatusToCancel = async () => {
    console.log(leaveRequests)
    const data = leaveRequests.filter((lr) => lr.id === currentId)[0]
    if (data) {
      const res = await updateLeaveRequest({...data,leaveStatus:'Cancelled'},currentId)
      try {
        if (res.ok) {
          console.log('cancelled successfully')
        }
        else {
          console.log('something went wrong')
        }
      } catch (err) {
        console.log(err)
      }
    }
    setIsCancelPopup(false);
  }
  return (
    <div className='fixed flex justify-center items-center top-0 overflow-hidden left-0 bottom-0 right-0 bg-white/80'>
      <div className='py-4 px-6 shadow-md rounded-lg bg-white border'>
        <h3 className='text-lg p-2 font-bold'>Are you sure you want to cancel the request?</h3>
        <div className="my-2 flex justify-between px-5 py-2">
          <button className="px-2 bg-rose-500 hover:shadow-lg hover:bg-rose-600 text-white rounded-lg" onClick={updateStatusToCancel}>Yes</button>
          <button className="px-2 bg-green-500 hover:shadow-lg hover:bg-green-600 text-white rounded-lg" onClick={() => setIsCancelPopup(false)}>No</button>
        </div>
      </div>
    </div>
  )
}

export default CancelPopUp