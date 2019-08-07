import React from "react";
import StaffItem from '../StaffItem/StaffItem';
import './StaffList.scss';

type StaffListProps = {

}

const staffListMock = [{ names: ['Pete Farrelly'], role: 'Director' },
{ names: [' Nick Vallelonga', 'Brian Hayes Currie', 'Peter Farrelly'], role: 'Writers' },
{ names: ['Pete Farrelly'], role: 'Music by' },
{ names: ['Universal Pictures', 'DreamWorks'], role: 'Studios' }]
const StaffList = () => {
    return <div className='staff-list'>
        <div className='staff-list-header'>Staff</div>
        <div className='staff-items-container'>
            {staffListMock.map(el=>{return <StaffItem staffItemInfo={el}></StaffItem>})}
        </div>
    </div>
}

export default StaffList;