import  { FormEvent, useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';

import InputField from '../../components/InputField';
import { LeaveApplicationData } from '../../utils/SideBarModels/LeaveApplicationData';
import { postLeaveRequest } from '../../api/postLeaveRequest';
import { LeaveType } from '../../types/LeaveRequestType';
import { Status } from '../../types/Enum';
import { useNavigate } from 'react-router';


const LeaveApplicationForm = () => {
  const [formData, setFormData] = useState({
    empId: '',
    empEmail: 'john@example.com',
    empPhone: '',
    managerEmail: '',
    fromDate: '',
    toDate: '',
    reasonForLeave: ''
  });
  const navigate = useNavigate();
  
  const [radioButton,setRadioButton] = useState({
    fromDate:{
      isFirstHalf:true
    },
    toDate:{
      isFirstHalf:false
    }
  })

  const handleRadioButtons = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name)
    setRadioButton(prevState => ({
      ...prevState,
      [name]: { // Update the specific property using the name variable
        isFirstHalf: (value === 'FirstHalf') // Set isFirstHalf based on the radio button value
      }
    }));
  
  };
  
  const [totalDays,setTotalDays] = useState('');

  
  useEffect(()=>{
    const calculateTotalDays = ()=>{
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      const differenceMs = toDate.getTime() - fromDate.getTime();
      const totalDays = differenceMs / (1000 * 60 * 60 * 24) + 1;
      if(!Number.isNaN(totalDays)){
        let dayCount = 0;
        if((!radioButton.fromDate.isFirstHalf && !radioButton.toDate.isFirstHalf) || (radioButton.fromDate.isFirstHalf && radioButton.toDate.isFirstHalf)){
          dayCount = -0.5
        }
        if(!radioButton.fromDate.isFirstHalf && radioButton.toDate.isFirstHalf) dayCount = -1
        setTotalDays((totalDays + dayCount).toString())
      }
    }
    calculateTotalDays()
    return
  },[formData.fromDate, formData.toDate,radioButton.fromDate.isFirstHalf,radioButton.toDate.isFirstHalf])



  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    const body:LeaveType = {
      empEmail:formData.empEmail,
      mngEmail:formData.managerEmail,
      fromDate:formData.fromDate,
      toDate:formData.toDate,
      totalDays:totalDays,
      reasonForLeave:formData.reasonForLeave,
      leaveStatus:Status.Pending
    }
    try{
      const res = await postLeaveRequest(body);
      if(res.ok){
        navigate('/view-leaves')
      }
      else{
        console.log(res)
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
  
<SideBar data = {LeaveApplicationData}>

<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-5">Leave Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
         <InputField name='empId' type='text' inputValue={formData.empId} handleChange={handleChange} placeholder='Employee Id' isReadOnly={true}/>
         <InputField name='empEmail' type='email' inputValue={formData.empEmail} handleChange={handleChange} placeholder='Employee Email' isReadOnly={true}/>
         <InputField name='empPhone' type='text' inputValue={formData.empPhone} handleChange={handleChange} placeholder='Employee Phone' isReadOnly={true}/>
         <InputField name='managerEmail' type='email' inputValue={formData.managerEmail} handleChange={handleChange} placeholder='Manager Email' isAutoFocus={true}/>
         <InputField name='fromDate' type='date' inputValue={formData.fromDate} handleChange={handleChange} placeholder='From Date'/>
        
          {/* from date radio buttons */}
          <div className='flex flex-col justify-center'>
            <div className='mt-5'>
              <div className='flex space-x-4'>
                <input type='radio' name='fromDate' value='FirstHalf' onChange={handleRadioButtons} defaultChecked/>
                <label>First Half</label>
              </div>
              <div className='flex space-x-4'>
                <input type='radio' name='fromDate' value='SecondHalf' onChange={handleRadioButtons}/>
                <label>Second Half</label>
              </div>
            </div>
          </div>

          <InputField name='toDate' type='date' inputValue={formData.toDate} handleChange={handleChange} placeholder='To Date'/>

           {/* to date radio buttons */}
           <div className='flex flex-col justify-center'>
            <div className='mt-5'>
              <div className='flex space-x-4'>
                <input type='radio' name='toDate' value='FirstHalf' onChange={handleRadioButtons}/>
                <label>First Half</label>
              </div>
              <div className='flex space-x-4'>
                <input type='radio' name='toDate' value='SecondHalf' defaultChecked onChange={handleRadioButtons} />
                <label>Second Half</label>
              </div>
            </div>
          </div>  

          <InputField name='totalDays' type='text' inputValue={totalDays} handleChange={handleChange} placeholder='Total Days'/>

          <div className="col-span-2">
            <label htmlFor="reasonForLeave" className="block text-sm font-medium text-gray-700">Reason for Leave</label>
            <textarea id="reasonForLeave" name="reasonForLeave" value={formData.reasonForLeave} onChange={handleChange} rows={3} className="mt-1 p-2 w-full border rounded-md focus:outline-blue-500"></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
</SideBar>
  );
};

export default LeaveApplicationForm;
