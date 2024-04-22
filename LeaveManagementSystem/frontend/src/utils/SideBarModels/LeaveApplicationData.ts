import ISideBarData from '../../types/ISideBarData';
import { FaWpforms } from "react-icons/fa";
import { MdPreview } from "react-icons/md";

export const LeaveApplicationData: ISideBarData[] = [
  {
    name: 'Leave Application',
    url: '/leave-application',
    icon:FaWpforms
  },
  {
    name: 'View Leave Requests',
    url: '/view-leaves',
    icon:MdPreview
  }
];
