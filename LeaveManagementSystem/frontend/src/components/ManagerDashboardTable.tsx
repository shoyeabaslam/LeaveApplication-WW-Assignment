import { FaRegEdit, FaSort } from "react-icons/fa"
import { LeaveType } from "../types/LeaveRequestType"
import { MdCancelPresentation } from "react-icons/md"
import { SortingTypes, Status } from "../types/Enum"

const colors = {
  'Pending': 'text-orange-500',
  'Approved': 'text-green-500',
  'Cancelled':'text-rose-600'

}


const ManagerDashboardTable = ()=>{

  function handleSorting(TotalDays: number) {
   console.log(TotalDays)
  }

  const filterLeaveRequests: LeaveType[] = []

  function handleCancleLeaveRequest(p0: number){
    throw new Error("Function not implemented.")
  }

//   const filterLeaveRequests = leaveRequests.filter((item) => {
//     const statusMatches = item.leaveStatus === currentStatus || currentStatus === 'All';
//     const searchTermNotEmpty = searchTerms.length !== 0;
//     const searchTermLowerCase = searchTerms.toLowerCase();

//     // Check if any of the columns match the search term
//     const matchesSearchTerm = (
//         (searchTermNotEmpty && item.mngEmail.toLowerCase().startsWith(searchTermLowerCase)) ||
//         (searchTermNotEmpty && item.fromDate.includes(searchTerms)) ||
//         (searchTermNotEmpty && item.toDate.includes(searchTerms))
//     );

//     return statusMatches && (searchTermNotEmpty ? matchesSearchTerm : true);
// });
  return(
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
    <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">Email ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                    <div>From Date</div>
                    <div className="cursor-pointer" onClick={()=>handleSorting(SortingTypes.FromDates)}><FaSort/></div>
                </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                    <div>To Date</div>
                    <div className="cursor-pointer" onClick={()=>handleSorting(SortingTypes.ToDates)}><FaSort/></div>
                </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                    <div>Total Days</div>
                    <div className="cursor-pointer" onClick={()=>handleSorting(SortingTypes.TotalDays)}><FaSort/></div>
                </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-[220px]">Reason for Leave</th>
            <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-[150px]">Status</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {filterLeaveRequests.map((request, index) => (
            <tr key={index}>
                <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.mngEmail}</td>
                <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.fromDate}</td>
                <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.toDate}</td>
                <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.totalDays}</td>
                <td className="px-6 py-4 text-left text-xs font-medium">{request.reasonForLeave}</td>

                <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap flex justify-between items-center w-[150px]">
                    <div className={`${colors[request.leaveStatus]}`}>
                        {request.leaveStatus}
                    </div>
                    {
                        request.leaveStatus === Status.Approved &&
                        <div className='flex flex-col space-y-3 justify-center'>
                            <MdCancelPresentation className='text-rose-500 cursor-pointer text-lg' onClick={()=>handleCancleLeaveRequest(request.id!)} />
                           
                        </div>
                    }
                    {
                        request.leaveStatus === Status.Pending &&
                        <div className='flex flex-col space-y-3 justify-center'>
                                <MdCancelPresentation className='text-rose-500 cursor-pointer text-lg' onClick={()=>handleCancleLeaveRequest(request.id!)} />
                                <FaRegEdit className='text-black cursor-pointer text-lg ml-0.5' onClick={()=>handleCancleLeaveRequest(request.id!)} />

                        </div>
                    }
                </td>
            </tr>
        ))}
    </tbody>
</table>
  )
}

export default ManagerDashboardTable;