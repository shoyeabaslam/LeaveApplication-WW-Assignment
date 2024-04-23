import SideBar from '../../components/SideBar';
import { LeaveApplicationData } from '../../utils/SideBarModels/LeaveApplicationData';
import { ChangeEvent, useEffect, useState } from 'react';
import CancelPopUp from '../../components/CancelPopUp';
import EditLeaveRequestPopup from '../../components/EditLeaveRequestPopup';
import RenderLeaveRequestsTable from '../../components/RenderLeaveRequestsTable';
import { StatusData } from '../../utils/DataArray'
import { ColorsType } from '../../types/ColorsType';
import { Status } from '../../types/Enum';
import { getLeaveRequest } from '../../api/getLeaveRequest';
import { LeaveType } from '../../types/LeaveRequestType';
import { updateLeaveRequest } from '../../api/updateLeaveRequest';


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


const ViewLeaveRequests = () => {
  const [leaveRequests,setLeaveRequest] = useState<LeaveType[]>([])
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

  const [currentId,setCurrentId] = useState<number>();
  //to fetch the data



  useEffect(()=>{
    async function data() {
        try{
          const res = await getLeaveRequest('john@example.com');
        if(res.ok){
          const data:LeaveType[] = await res.json()
          setLeaveRequest(data)
          const pending = data.filter((dataItem)=>dataItem.leaveStatus === Status.Pending).length
          const approved = data.filter((dataItem)=>dataItem.leaveStatus === Status.Cancelled).length
          const cancelled = data.filter((dataItem)=>dataItem.leaveStatus === Status.Approved).length
          setStatusLength({
            Approved:approved.toString(),
            Pending:pending.toString(),
            Cancelled:cancelled.toString()
          })
        }
        else{
          console.log('No data found!!!')
        }
        }catch(err){
          console.log(err)
        }
    }
    data();
  },[])

 
  const handleCancleLeaveRequest = async (id:number)=>{
    setIsCancelPopup((prev) => !prev)
    setCurrentId(id)
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
      {isCancelPopUp && <CancelPopUp setIsCancelPopup = {setIsCancelPopup} currentId={currentId!} leaveRequests={leaveRequests}/>}
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
