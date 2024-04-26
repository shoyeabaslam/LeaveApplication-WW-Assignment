import { FC } from "react"
import { CancelPropsTypes } from "../types/CancelProps"
import { updateRequest } from "../api/LeaveRequestAPI"
import { Status } from "../types/Enum";
import { toast } from "react-toastify";

const CancelPopUp: FC<CancelPropsTypes> = ({ setIsCancelPopup, currentId, leaveRequests, setLeaveRequest }) => {

  const updateLeaveStatus = (id: number, newStatus: 'Pending' | 'Approved' | 'Cancelled') => {
    const index = leaveRequests.findIndex(request => request.id === id);
    if (index !== -1) {
      const updatedLeaveRequests = [...leaveRequests];

      // Update the leave status of the found leave request
      updatedLeaveRequests[index] = {
        ...updatedLeaveRequests[index],
        leaveStatus: newStatus
      };

      // Set the updated array using setLeaveRequest
      setLeaveRequest(updatedLeaveRequests);
    } else {
      console.error(`Leave request with ID ${id} not found.`);
    }
  };


  const updateStatusToCancel = async () => {
    const data = leaveRequests.filter((lr) => lr.id === currentId)[0]
    if (data) {
      const res = await updateRequest({
        ...data,
        leaveStatus: Status.Cancelled
      }, currentId)
      try {
        if (res.ok) {
          console.log('cancelled successfully')
          toast.success('Cancelled successfully')
          updateLeaveStatus(currentId, Status.Cancelled)
        }
        else {
          console.log('something went wrong')
          toast.error('Error occured')
        }
      } catch (err) {
        toast.error(`Error occured ${err}`)

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