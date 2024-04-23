import SideBar from '../../components/SideBar';
import { LeaveApplicationData } from '../../utils/SideBarModels/LeaveApplicationData';
import { ChangeEvent, useEffect, useState } from 'react';
import CancelPopUp from '../../components/CancelPopUp';
import EditLeaveRequestPopup from '../../components/EditLeaveRequestPopup';
import RenderLeaveRequestsTable from '../../components/RenderLeaveRequestsTable';
import { StatusData } from '../../utils/DataArray'
import { ColorsType } from '../../types/ColorsType';
import { LeaveType } from '../../types/LeaveRequestType';
import { Status } from '../../types/Enum';
import { getLeaveRequest } from '../../api/getLeaveRequest';


const colors: ColorsType = {
    'Pending': 'bg-orange-500',
    'Approved': 'bg-green-500',
    'Cancelled':'bg-red-600'
}

interface StatusLengthType{
    Approved:string,
    Pending:string,
    Cancelled:string,
    [Key:string]:string
}

const requests: LeaveType[] = [
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-04-20',
        toDate: '2024-04-25',
        totalDays: '6',
        reasonForLeave: 'Vacation long vacation very long vacation very very very very',
        status: 'Pending'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-04-20',
        toDate: '2024-04-25',
        totalDays: '5',
        reasonForLeave: 'Vacation long vacation very long vacation very very very very',
        status: 'Pending'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-04-20',
        toDate: '2024-04-25',
        totalDays: '6',
        reasonForLeave: 'Vacation long vacation very long vacation very very very very',
        status: 'Pending'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-04-20',
        toDate: '2024-04-25',
        totalDays: '5',
        reasonForLeave: 'Vacation long vacation very long vacation very very very very',
        status: 'Pending'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-05-10',
        toDate: '2024-05-25',
        totalDays: '4',
        reasonForLeave: 'Vacation long vacation very long vacation very very very very',
        status: 'Pending'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-06-18',
        toDate: '2024-06-20',
        totalDays: '5',
        reasonForLeave: 'Family emergency',
        status: 'Approved'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-04-18',
        toDate: '2024-04-22',
        totalDays: '5',
        reasonForLeave: 'Family emergency',
        status: 'Cancelled'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-05-10',
        toDate: '2024-05-25',
        totalDays: '4',
        reasonForLeave: 'Vacation long vacation very long vacation very very very very',
        status: 'Pending'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-06-18',
        toDate: '2024-06-20',
        totalDays: '1',
        reasonForLeave: 'Family emergency',
        status: 'Approved'
    },
    {
        managerId: 'MNG002',
        managerName: 'King',
        fromDate: '2024-04-18',
        toDate: '2024-04-22',
        totalDays: '5',
        reasonForLeave: 'Family emergency',
        status: 'Cancelled'
    },
    // Add more sample data as needed
];

const ViewLeaveRequests = () => {
  const [leaveRequests,setLeaveRequest] = useState(requests)
  const [isCancelPopUp,setIsCancelPopup] = useState(false);
  const [isUpdatePopup,setIsUpdatePopup] = useState(false);
  const [currentStatus,setCurrentStatus] = useState('Pending');
  const [filtering, setFiltering] = useState('All');
  const [searchTerms, setSearchTerms] = useState('');
  const [statusLength,setStatusLength] = useState<StatusLengthType>({
    Approved:'',
    Cancelled:'',
    Pending:''
  })

  //to fetch the data
  useEffect(()=>{
    async function data() {
        const d = await getLeaveRequest()
        console.log(d)
    }
    data();
  },[])

  useEffect(()=>{
    const Approved = leaveRequests.filter((value)=>value.status === Status.Approved).length
    const Pending = leaveRequests.filter((value)=>value.status === Status.Pending).length
    const Cancelled = leaveRequests.filter((value)=>value.status === Status.Cancelled).length
    setStatusLength({Approved:Approved.toString(),Cancelled:Cancelled.toString(),Pending:Pending.toString()})
  },[leaveRequests])
   
  const handleCancleLeaveRequest = ()=>{
    setIsCancelPopup((prev) => !prev)
  }
  const handleUpdateLeaveRequest = ()=>{
    setIsUpdatePopup((prev)=>!prev)
   }
    const handleStatusFiltering = (status: string) => {
        setCurrentStatus(status)
   }

    function handleFiltering(event: ChangeEvent<HTMLSelectElement>): void {
        setFiltering(event.target.value);
    }

  return (
   <SideBar data={LeaveApplicationData}>
     <div className="container mx-auto px-4 py-8">
      {isCancelPopUp && <CancelPopUp setIsCancelPopup = {setIsCancelPopup}/>}
      {isUpdatePopup && <EditLeaveRequestPopup setIsUpdatePopup={setIsUpdatePopup} />}
              <h1 className="text-3xl font-semibold text-gray-800 mb-8">Leave Request Dashboard</h1>
              <div className='my-4 flex space-x-5'>
                  <div>
                      <input type='text' value={searchTerms} className='px-2 border outline-none rounded-lg py-1' placeholder='search...' onChange={(e) => setSearchTerms(e.target.value)} />
                  </div>
                  <div>
                      <ul className='flex items-center space-x-10'>
                          {
                              StatusData.map((items, index) => (
                                  <li key={index} className={`border ${colors[items]} rounded-lg px-2 py-1 text-white cursor-pointer flex items-center space-x-2`} onClick={()=>handleStatusFiltering(items)}><span>{items}</span><span className='font-bold text-pretty font-serif'>{statusLength[items]}</span></li>
                              ))
                          }
                          <li  className={`border  rounded-lg px-4 py-1 text-white  bg-blue-500 flex items-center space-x-2`}>
                            <span>Total</span>
                            <span className='font-bold text-pretty font-serif'>{leaveRequests.length}</span>
                          </li>
                      </ul>
                  </div>
                  <div className='w-full flex justify-end'>
                      <select className='px-3 py-1 outline-none rounded-lg'
                          value={filtering} onChange={handleFiltering}>
                          <option className='All'>All</option>
                          <option>FY-2024</option>
                          <option>FY-2025</option>
                      </select>
                  </div>
              </div>

      
              {
                  leaveRequests.length === 0 ?
                  (
                    <p className="text-gray-500 ">No leave requests found.</p>
                  ) :
                  (
                          <RenderLeaveRequestsTable
                              leaveRequests={leaveRequests} handleCancleLeaveRequest={handleCancleLeaveRequest} handleUpdateLeaveRequest={handleUpdateLeaveRequest}
                              currentStatus={currentStatus}
                              searchTerms={searchTerms}
                              setLeaveRequest={setLeaveRequest}

                          />
                  )
              }
    </div>
   </SideBar>
  );
};

export default ViewLeaveRequests;
