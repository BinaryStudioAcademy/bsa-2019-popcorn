import React from "react";
import StaffItem from '../StaffItem/StaffItem';
import './StaffList.scss';

const StaffList = ()=>{
    return <div className='staff-list'>
         <div className='staff-list-header'>Staff</div>
         <div className='staff-items-container'>
             <StaffItem staffItemInfo={{names:['Pete Farrelly'], role:'Director'}}></StaffItem>
             <StaffItem staffItemInfo={{names:[' Nick Vallelonga', 'Brian Hayes Currie', 'Peter Farrelly'], role:'Writers'}}></StaffItem>
             <StaffItem staffItemInfo={{names:['Pete Farrelly'], role:'Music by'}}></StaffItem>
             <StaffItem staffItemInfo={{names:['Universal Pictures', 'DreamWorks'], role:'Studios'}}></StaffItem>
         </div>
    </div>
}

export default StaffList;