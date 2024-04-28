import { FaRegEdit, FaSort } from "react-icons/fa";
import { MdCancelPresentation, MdDone } from "react-icons/md";
import { SortingTypes, Status } from '../types/Enum'
import { FC, useContext, useEffect, useState } from "react";
import { LeaveRequestType, LeaveType } from "../types/LeaveRequestType";
import UserContext from "../context/UserContext";
import { IoIosEye } from "react-icons/io";
const colors = {
    'Pending': 'text-orange-500',
    'Approved': 'text-green-500',
    'Cancelled':'text-rose-600'

}

const RenderLeaveRequestsTable: FC<LeaveRequestType> = ({ leaveRequests, handleCancleLeaveRequest, handleUpdateLeaveRequest, currentStatus, searchTerms,setLeaveRequest ,handleApproval,handleEmployeeViewDetails}) => {
    const [isFromSorting,setIsFromSorting] = useState(false);
    const [isToSorting,setIsToSorting] = useState(false);
    const [isTotalDaysSorting,setIsTotalDaysSorting] = useState(false)
    const {user} = useContext(UserContext);
    const [tableHeader,setTableHeader] = useState<string>()
    useEffect(()=>{
        if(user){
            if(user.isManager){
                setTableHeader('Employee Id')
            }else{
                setTableHeader('Manager Email');
            }
        }
    },[user])



    //filtering the data
    const filterLeaveRequests = leaveRequests.filter((item) => {
        const statusMatches = item.leaveStatus === currentStatus || currentStatus === 'All';
        const searchTermNotEmpty = searchTerms.length !== 0;
        const searchTermLowerCase = searchTerms.toLowerCase();

        // Check if any of the columns match the search term
        const matchesSearchTerm = (
            (searchTermNotEmpty && item.mngEmail.toLowerCase().startsWith(searchTermLowerCase)) ||
            (searchTermNotEmpty && item.fromDate.includes(searchTerms)) ||
            (searchTermNotEmpty && item.toDate.includes(searchTerms))
        );

        return statusMatches && (searchTermNotEmpty ? matchesSearchTerm : true);
    });

    

    //sorting based on the dates
    function handleSorting(isTypeOf:number): void {
       if(isTypeOf === SortingTypes.FromDates){
        setLeaveRequest((prev:LeaveType[])=>{
            const sortedArray = [...prev]
            sortedArray.sort((a,b)=>{
                const d1 = new Date(a.fromDate);
                const d2 = new Date(b.fromDate)
                if(!isFromSorting) return d2.getTime() - d1.getTime();
                return d1.getTime() - d2.getTime();
            })
            return sortedArray
        })

        setIsFromSorting((prev)=>!prev)
       }
       else if(isTypeOf === SortingTypes.ToDates ){
        setLeaveRequest((prev:LeaveType[])=>{
            const sortedArray = [...prev]
            sortedArray.sort((a,b)=>{
                const d1 = new Date(a.toDate);
                const d2 = new Date(b.toDate)
                if(!isToSorting) return d2.getTime() - d1.getTime();
                return d1.getTime() - d2.getTime();
            })
            return sortedArray
        })

        setIsToSorting((prev)=>!prev)
       }
       else{
        setLeaveRequest((prev)=>{
            const sortedArray = [...prev]
            sortedArray.sort((a,b)=>{
                
                if(!isTotalDaysSorting) return Number(a.totalDays) - Number(b.totalDays);
                return Number(b.totalDays) - Number(a.totalDays);
            })
            return sortedArray
        })

        setIsTotalDaysSorting((prev)=>!prev)
       }
       
    }
   
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">{tableHeader}</th>
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
                        {
                            user && user.isManager ? <td className="px-6 flex items-center space-x-2 py-4 text-left text-xs font-medium whitespace-nowrap">
                                <span className="text-blue-400 text-lg hover:text-blue-600 cursor-pointer" onClick={()=>handleEmployeeViewDetails(request.empId)}><IoIosEye/></span>
                                <span>{request.empId}</span>
                            </td> :
                            <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.mngEmail}</td>
                        }
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.fromDate}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.toDate}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium whitespace-nowrap">{request.totalDays}</td>
                        <td className="px-6 py-4 text-left text-xs font-medium">{request.reasonForLeave}</td>

                        {
                            user && !user.isManager ?
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
                                        <FaRegEdit className='text-black cursor-pointer text-lg ml-0.5' onClick={()=>handleUpdateLeaveRequest(request.id!)} />

                                </div>
                            }
                        </td> :
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
                                    <MdDone className='text-green-600 hover:text-white hover:rounded-sm hover:bg-green-600  cursor-pointer text-lg' onClick={()=>handleApproval(request.id!)} />

                            </div>
                        }
                    </td>
                    }
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RenderLeaveRequestsTable