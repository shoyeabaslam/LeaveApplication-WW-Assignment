import { toast } from "react-toastify";
import { updateRequest } from "../api/LeaveRequestAPI";
import { EditLeaveRequestType } from "../types/EditLeaveRequestType";
import { LeaveShift } from "../types/Enum";
import { LeaveType } from "../types/LeaveRequestType";
import InputField from "./InputField"
import { useState, useEffect, FormEvent, FC } from "react";

interface FieldsEmptyType {
  managerEmail: boolean,
  fromDate: boolean,
  toDate: boolean,
  reasonForLeave: boolean
}

interface LeaveShiftType{
  fromDate:{
    leaveShift:string
  },
  toDate:{
    leaveShift:string
  }
}

const EditLeaveRequestPopup: FC<EditLeaveRequestType> = ({ setIsUpdatePopup, currentId, leaveRequests, setLeaveRequest }) => {
  const [formData, setFormData] = useState({
    managerEmail: '',
    fromDate: '',
    toDate: '',
    reasonForLeave: ''
  
  });
  //checking the fields empty or not and giving red color alert if border if it is empty
  const [radioButton, setRadioButton] = useState<LeaveShiftType>({
    fromDate: {
      leaveShift: LeaveShift.FirstHalf
    },
    toDate: {
      leaveShift: LeaveShift.SecondHalf
    }
  })
  const [isFieldsEmpty, setIsFieldsEmpty] = useState<FieldsEmptyType>({
    managerEmail: false,
    fromDate: false,
    toDate: false,
    reasonForLeave: false
  })


  const handleRadioButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRadioButton(prevState => ({
      ...prevState,
      [name]: {
        leaveShift: value
      }
    }));

  };

  const [totalDays, setTotalDays] = useState('');

  useEffect(() => {
    const data = leaveRequests.filter((lr) => lr.id === currentId)[0];
    console.log(data)
    setFormData({
      managerEmail: data.mngEmail,
      fromDate: data.fromDate,
      toDate: data.toDate,
      reasonForLeave: data.reasonForLeave,
    })

    setRadioButton({
      fromDate: {
        leaveShift: data.fromLeaveShift
      },
      toDate: {
        leaveShift: LeaveShift.SecondHalf
      }
    })
   return
  }, [currentId, leaveRequests])

  useEffect(() => {
    const calculateTotalDays = () => {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      const differenceMs = toDate.getTime() - fromDate.getTime();
      const totalDays = differenceMs / (1000 * 60 * 60 * 24) + 1;
      if (!Number.isNaN(totalDays)) {
        let dayCount = 0;
        if ((radioButton.fromDate.leaveShift === LeaveShift.FirstHalf &&
          radioButton.toDate.leaveShift === LeaveShift.FirstHalf) ||
          (radioButton.fromDate.leaveShift === LeaveShift.SecondHalf && radioButton.toDate.leaveShift === LeaveShift.SecondHalf)) {
          dayCount = -0.5
        }
        if (radioButton.fromDate.leaveShift === LeaveShift.SecondHalf && radioButton.toDate.leaveShift === LeaveShift.FirstHalf) dayCount = -1
        setTotalDays((totalDays + dayCount).toString())
      }
    }
    calculateTotalDays()
    
    return
  }, [formData.fromDate, formData.toDate, radioButton.fromDate.leaveShift, radioButton.toDate.leaveShift])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'fromDate') {
      setFormData({
        ...formData,
        ['fromDate']: value,
        ['toDate']: value
      })
    }
    else if (name === 'toDate') {
      const d1 = new Date(formData.fromDate).getTime();
      const d2 = new Date(value).getTime()
      if ((d2 - d1) >= 0) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    }
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

  };

  //checking for validation
  const isFormFieldsValid = () => {
    const { managerEmail, fromDate, toDate, reasonForLeave } = formData;
    const isEmpty = (value: string) => value.trim() === '';
  
    const isValid = {
      managerEmail: isEmpty(managerEmail),
      fromDate: isEmpty(fromDate),
      toDate: isEmpty(toDate),
      reasonForLeave: isEmpty(reasonForLeave)
    };
    setIsFieldsEmpty(isValid);

    return Object.values(isValid).every(value => !value);
  }

  //updating state
  const updateLeaveRequestsState = (currentId:number,data:LeaveType)=>{
    const index = leaveRequests.findIndex(request => request.id === currentId);
    if (index !== -1) {
      const updateRequest = [...leaveRequests];
      updateRequest[index] = data
      // Set the updated array using setLeaveRequest
      setLeaveRequest(updateRequest);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(isFormFieldsValid())
    if (isFormFieldsValid()) {
      //send put request
      const data = leaveRequests.filter((lr)=>lr.id === currentId)[0];
      const updatedData:LeaveType = {
        ...data,
        mngEmail:formData.managerEmail,
        fromDate:formData.fromDate,
        toDate:formData.toDate,
        fromLeaveShift:radioButton.fromDate.leaveShift,
        toLeaveShift:radioButton.toDate.leaveShift,
        totalDays:totalDays,
        reasonForLeave:formData.reasonForLeave
      }
      try{
        const res = await updateRequest(updatedData,currentId)
        if(res.ok){
          console.log('updated..')
          toast.success('Updated successfully')
          updateLeaveRequestsState(currentId,updatedData);
          setIsUpdatePopup(false)
        }else{
          toast.error('Error occured');
        }
      }catch(err){
        toast.error(`Error occured ${err}`);
      }

    }
  };
  return (
    <div className='fixed flex justify-center items-center top-0 z-10  left-0 bottom-0 right-0 min-h-full  bg-white/80'>
      <form className="py-4 px-6 shadow-md rounded-lg bg-white border">
        <div className=' grid grid-cols-2 gap-4'>
          <div className="col-span-2">
            <InputField isEmpty={isFieldsEmpty.managerEmail} name='managerEmail' type='email' inputValue={formData.managerEmail} handleChange={handleChange} placeholder='Manager Email' isAutoFocus={true} />
          </div>
          <InputField isEmpty={isFieldsEmpty.fromDate} name='fromDate' type='date' inputValue={formData.fromDate} handleChange={handleChange} placeholder='From Date' />
          {/* from date radio buttons */}
          <div className='flex flex-col justify-center'>
            <div className='mt-5'>
              <div className='flex space-x-4'>
                <input type='radio' name='fromDate' value={LeaveShift.FirstHalf} onChange={handleRadioButtons} checked={radioButton.fromDate.leaveShift === LeaveShift.FirstHalf} />
                <label>First Half</label>
              </div>
              <div className='flex space-x-4'>
                <input type='radio' name='fromDate' value={LeaveShift.SecondHalf} onChange={handleRadioButtons} checked={radioButton.fromDate.leaveShift === LeaveShift.SecondHalf} />
                <label>Second Half</label>
              </div>
            </div>
          </div>

          <InputField isEmpty={isFieldsEmpty.toDate} name='toDate' type='date' inputValue={formData.toDate} handleChange={handleChange} placeholder='To Date' />

          {/* to date radio buttons */}
          <div className='flex flex-col justify-center'>
            <div className='mt-5'>
              <div className='flex space-x-4'>
                <input type='radio' name='toDate' value={LeaveShift.FirstHalf} onChange={handleRadioButtons} checked={radioButton.toDate.leaveShift === LeaveShift.FirstHalf} />
                <label>First Half</label>
              </div>
              <div className='flex space-x-4'>
                <input type='radio' name='toDate' value={LeaveShift.SecondHalf}  onChange={handleRadioButtons} checked={radioButton.toDate.leaveShift === LeaveShift.SecondHalf}/>
                <label>Second Half</label>
              </div>
            </div>
          </div>

          <InputField name='totalDays' type='text' inputValue={totalDays} handleChange={handleChange} placeholder='Total Days' isReadOnly={true} /><div />
          <div className="col-span-2">
            <label htmlFor="reasonForLeave" className="block text-sm font-medium text-gray-700">Reason for Leave</label>
            <textarea id="reasonForLeave" name="reasonForLeave" value={formData.reasonForLeave} onChange={handleChange} rows={3} className={`mt-1 p-2 w-full border rounded-md focus:outline-blue-500 ${isFieldsEmpty.reasonForLeave && 'border-rose-500'}`}></textarea>
          </div>

        </div>
        <div className="flex">
          <button className="w-full m-2 py-1 bg-blue-500 text-white rounded-lg" type="submit" onClick={handleSubmit}> Update</button>
          <button className="w-full my-2 py-1 border text-black border-blue-500  rounded-lg" type="button" onClick={() => { setIsUpdatePopup(false) }}> Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditLeaveRequestPopup