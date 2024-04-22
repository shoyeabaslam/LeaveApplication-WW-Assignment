import { FaRegEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { Status } from '../types/Enum'
import { FC } from "react";
import { LeaveRequestType } from "../types/LeaveRequestType";

const colors = {
    'Pending': 'text-orange-500',
    'Approved': 'text-green-500',
    'Cancelled':'text-rose-600'

}

const RenderLeaveRequestsTable: FC<LeaveRequestType> = ({ leaveRequests, handleCancleLeaveRequest, handleUpdateLeaveRequest, currentStatus, searchTerms }) => {

  //filtering the data
    const filterLeaveRequests = leaveRequests.filter((item) => {
        const statusMatches = item.status === currentStatus;
        const searchTermNotEmpty = searchTerms.length !== 0;
        const searchTermLowerCase = searchTerms.toLowerCase();

        // Check if any of the columns match the search term
        const matchesSearchTerm = (
            (searchTermNotEmpty && item.managerName.toLowerCase().startsWith(searchTermLowerCase)) ||
            (searchTermNotEmpty && item.managerId.toLowerCase().startsWith(searchTermLowerCase)) ||
            (searchTermNotEmpty && item.fromDate.includes(searchTerms)) ||
            (searchTermNotEmpty && item.toDate.includes(searchTerms))
        );

        return statusMatches && (searchTermNotEmpty ? matchesSearchTerm : true);
    });



    return (
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">Manager Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">From Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">To Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">Total Days</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-[220px]">Reason for Leave</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider w-[150px]">Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filterLeaveRequests.map((request, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.managerId}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.managerName}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.fromDate}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.toDate}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.totalDays}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium w-[220px]">{request.reasonForLeave}</td>

                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap flex justify-between items-center w-[150px]">
                            <div className={`${colors[request.status]}`}>
                                {request.status}
                            </div>
                            {
                                request.status === Status.Approved &&
                                <div className='flex flex-col space-y-3 justify-center'>
                                    <MdCancelPresentation className='text-rose-500 cursor-pointer text-lg' onClick={handleCancleLeaveRequest} />
                                   
                                </div>
                            }
                            {
                                request.status === Status.Pending &&
                                <div className='flex flex-col space-y-3 justify-center'>
                                        <MdCancelPresentation className='text-rose-500 cursor-pointer text-lg' onClick={handleCancleLeaveRequest} />
                                        <FaRegEdit className='text-black cursor-pointer text-lg ml-0.5' onClick={handleUpdateLeaveRequest} />

                                </div>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RenderLeaveRequestsTable