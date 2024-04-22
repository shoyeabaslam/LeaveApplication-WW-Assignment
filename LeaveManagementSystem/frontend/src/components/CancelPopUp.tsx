import { FC } from "react"
import { CancelPropsTypes } from "../types/CancelProps"

const CancelPopUp:FC<CancelPropsTypes> = ({setIsCancelPopup}) => {
  return (
    <div className='absolute flex justify-center items-center top-5  left-0 bottom-0 right-0 bg-white/80'>
        <div className='py-4 px-6 shadow-md rounded-lg bg-white border'>
            <h3 className='text-lg p-2 font-bold'>Are you sure you want to cancel the request?</h3>
            <div className="my-2 flex justify-between px-5 py-2">
                <button className="px-2 bg-rose-500 hover:shadow-lg hover:bg-rose-600 text-white rounded-lg" onClick={()=>setIsCancelPopup(true)}>Yes</button>
                <button className="px-2 bg-green-500 hover:shadow-lg hover:bg-green-600 text-white rounded-lg" onClick={()=>setIsCancelPopup(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default CancelPopUp