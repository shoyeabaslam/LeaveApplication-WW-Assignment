import SideBar from '../../components/SideBar';
import { LeaveApplicationData } from '../../utils/SideBarModels/LeaveApplicationData';
import { useContext, useEffect, useState } from 'react';
import CancelPopUp from '../../components/CancelPopUp';
import EditLeaveRequestPopup from '../../components/EditLeaveRequestPopup';
import RenderLeaveRequestsTable from '../../components/RenderLeaveRequestsTable';
import { StatusData } from '../../utils/DataArray'
import { ColorsType } from '../../types/ColorsType';
import { Status } from '../../types/Enum';
import { getLeaveRequest, getLeaveRequestByMngId, updateRequest } from '../../api/LeaveRequestAPI';
import { LeaveType } from '../../types/LeaveRequestType';
import UserContext from '../../context/UserContext';
import InvalidPage from '../../components/InvalidPage';
import { ManagerSideBarData } from '../../utils/SideBarModels/ManagerData';
import ISideBarData from '../../types/ISideBarData';
import { toast } from 'react-toastify';
import ViewEmployeeDetails from '../../components/ViewEmployeeDetails';


const colors: ColorsType = {
  'All': 'bg-blue-500',
  'Pending': 'bg-orange-500',
  'Approved': 'bg-green-500',
  'Cancelled': 'bg-red-600'
}

interface StatusLengthType {
  Approved: string,
  Pending: string,
  Cancelled: string,
  [Key: string]: string
}


const ViewLeaveRequests = () => {
  const { user } = useContext(UserContext);
  const [leaveRequests, setLeaveRequest] = useState<LeaveType[]>([])
  const [isCancelPopUp, setIsCancelPopup] = useState(false);
  const [isUpdatePopup, setIsUpdatePopup] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('All');
  const [searchTerms, setSearchTerms] = useState('');
  const [sideBarData,setSideBarData] = useState<ISideBarData[]>([]);
  const [dashboardHeading,setDashboardHeading] = useState<string>('')
  const [statusLength, setStatusLength] = useState<StatusLengthType>({
    All: '',
    Approved: '',
    Cancelled: '',
    Pending: ''
  })
  const [isView,setIsView] = useState(false);
  const [currentEmpId,setCurrentEmpId] = useState(0);
  const [currentId, setCurrentId] = useState<number>();
  //to fetch the data


  useEffect(()=>{
    if(user){
      console.log(user)
      if(user.isManager){
        setSideBarData(ManagerSideBarData)
        setDashboardHeading('Leave Approval Dashboard')
      }else{
        setSideBarData(LeaveApplicationData);
        setDashboardHeading('Leave Request Dashboard')
      }
    }
  },[user])

  useEffect(() => {
    async function data() {
      if (user) 
      {
        if(user.isManager){
          // get the employess details relted to manager
          try {
            const res = await getLeaveRequestByMngId(user.empId);
            if (res.ok) {
              const data: LeaveType[] = await res.json()
              setLeaveRequest(data)
            }
            else {
              console.log('No data found!!!')
            }
          } catch (err) {
            console.log(err)
          }
        }else{
          try {
            const res = await getLeaveRequest(user?.empId);
            if (res.ok) {
              const data: LeaveType[] = await res.json()
              setLeaveRequest(data)
            }
            else {
              console.log('No data found!!!')
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
    data();
    return
  }, [user])

  useEffect(() => {
    const pending = leaveRequests.filter((dataItem) => dataItem.leaveStatus === Status.Pending).length
    const approved = leaveRequests.filter((dataItem) => dataItem.leaveStatus === Status.Approved).length
    const cancelled = leaveRequests.filter((dataItem) => dataItem.leaveStatus === Status.Cancelled).length
    setStatusLength({
      Approved: approved.toString(),
      Pending: pending.toString(),
      Cancelled: cancelled.toString()
    })
  }, [leaveRequests])

  const handleCancleLeaveRequest = async (id: number) => {
    setIsCancelPopup((prev) => !prev)
    setCurrentId(id)
  }
  const handleUpdateLeaveRequest = (id: number) => {
    setIsUpdatePopup((prev) => !prev)
    setCurrentId(id)
  }
  const handleStatusFiltering = (status: string) => {
    setCurrentStatus(status)
  }

  const handleEmployeeViewDetails = (empId:number)=>{
    setIsView(prev=>!prev);
    setCurrentEmpId(empId)
  }


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

  async function handleApproval(id:number){
    const data = leaveRequests.filter((lr) => lr.id === id)[0]
    if (data) {
      const res = await updateRequest({
        ...data,
        leaveStatus: Status.Approved
      }, id)
      try {
        if (res.ok) {
          toast.success('Approved successfully')
          updateLeaveStatus(id, Status.Approved)
        }
        else {
          console.log('something went wrong')
          toast.error('Error occured')
        }
      } catch (err) {
        toast.error(`Error occured ${err}`)

      }
    }
  }
 


  if (user) {
    return (
      <SideBar data={sideBarData}>
        <div className="container mx-auto px-4 py-8 overflow-x-scroll min-h-screen">
          {isView && <ViewEmployeeDetails empId={currentEmpId} setIsView={setIsView}/>}
          {isCancelPopUp && <CancelPopUp setIsCancelPopup={setIsCancelPopup} currentId={currentId!} leaveRequests={leaveRequests} setLeaveRequest={setLeaveRequest} />}
          {isUpdatePopup && <EditLeaveRequestPopup setIsUpdatePopup={setIsUpdatePopup} currentId={currentId!} leaveRequests={leaveRequests} setLeaveRequest={setLeaveRequest} />}
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">{dashboardHeading}</h1>
          <div className='my-4 flex space-x-5'>
            <div>
              <input type='text' value={searchTerms} className='px-2 border outline-none rounded-lg py-1' placeholder='search...' onChange={(e) => setSearchTerms(e.target.value)} />
            </div>
            <div>
              <ul className='flex items-center space-x-10'>
                {
                  StatusData.map((items, index) => (
                    <li key={index} className={`border ${colors[items]} rounded-lg px-2 py-1 text-white cursor-pointer flex items-center space-x-2`} onClick={() => handleStatusFiltering(items)}><span>{items}</span><span className='font-bold text-pretty font-serif'>{statusLength[items]}</span></li>
                  ))
                }

              </ul>
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
                  handleApproval={handleApproval}
                  handleEmployeeViewDetails={handleEmployeeViewDetails}
                />
              )
          }
        </div>
      </SideBar>
    );
  }

  else {
    return(
      <InvalidPage />
    )
  }

};

export default ViewLeaveRequests;
