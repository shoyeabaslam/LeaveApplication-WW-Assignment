import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import { LeaveApplicationData } from '../../utils/SideBarModels/LeaveApplicationData';
import { StatusData } from '../../utils/DataArray';
import { Status } from '../../types/Enum';
import { ManagerSideBarData } from '../../utils/SideBarModels/ManagerData';
import ManagerDashboardTable from '../../components/ManagerDashboardTable';
import { getLeaveRequestByMngId } from '../../api/LeaveRequestAPI';
import { toast } from 'react-toastify';
import { LeaveType } from '../../types/LeaveRequestType';


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

const ManagerDashboard = () => {
 const [searchTerms,setSearchTerms] = useState('');
 const [leaveRequests,setLeaveRequest] = useState<LeaveType[]>([])
 const [currentStatus,setCurrentStatus] = useState('All');
 const handleStatusFiltering = (status: string) => {
  setCurrentStatus(status)
}
const [statusLength, setStatusLength] = useState<StatusLengthType>({
    All: '',
    Approved: '',
    Cancelled: '',
    Pending: ''
  })

useEffect(()=>{
  const getData = async ()=>{
    try{
      const res = await getLeaveRequestByMngId(2);
      if(res.ok){
        console.log('yes data added')
        const data = await res.json();
        console.log(data)
        setLeaveRequest(data)
      }else{
        console.log('error occurred');
      }
    }catch(err){
      console.log(err)
    }
  }
  getData();
  return
},[])

  return (
    <SideBar data={ManagerSideBarData}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Leave Approval Dashboard</h1>
        <div className="my-4 flex space-x-5">
          <div>
            <input
              type="text"
              value={searchTerms}
              className="px-2 border outline-none rounded-lg py-1"
              placeholder="Search..."
              onChange={(e) => setSearchTerms(e.target.value)}
            />
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

       <ManagerDashboardTable/>
      </div>
    </SideBar>
  );
};

export default ManagerDashboard;
