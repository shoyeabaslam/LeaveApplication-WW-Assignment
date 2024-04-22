import InputField from "./InputField"
import { useState,useEffect, FormEvent } from "react";

const EditLeaveRequestPopup = ({setIsUpdatePopup}) => {
    const [formData, setFormData] = useState({
        managerEmail: '',
        fromDate: '',
        toDate: '',
        reasonForLeave: ''
      });
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
      
        console.log(radioButton);
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
    
      const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
      };
  return (
    <div className='absolute flex justify-center items-center top-0 z-10  left-0 bottom-0 right-0 min-h-full  bg-white/80'>
    <form className="py-4 px-6 shadow-md rounded-lg bg-white border">
        <div className=' grid grid-cols-2 gap-4'>
            <div className="col-span-2">
            <InputField name='managerEmail' type='email' inputValue={formData.managerEmail} handleChange={handleChange} placeholder='Manager Email' isAutoFocus={true}/>
            </div>
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

            <InputField name='totalDays' type='text' inputValue={totalDays} handleChange={handleChange} placeholder='Total Days'/><div/>
            <div className="col-span-2">
                <label htmlFor="reasonForLeave" className="block text-sm font-medium text-gray-700">Reason for Leave</label>
                <textarea id="reasonForLeave" name="reasonForLeave" value={formData.reasonForLeave} onChange={handleChange} rows={3} className="mt-1 p-2 w-full border rounded-md focus:outline-blue-500"></textarea>
            </div>

        </div>
       <div className="flex">
        <button className="w-full m-2 py-1 bg-blue-500 text-white rounded-lg" type="submit" onClick={handleSubmit}> Update</button>
        <button className="w-full my-2 py-1 border text-black border-blue-500  rounded-lg" type="button" onClick={()=>{setIsUpdatePopup(false)}}> Cancel</button>
       </div>
    </form>
</div>
  )
}

export default EditLeaveRequestPopup