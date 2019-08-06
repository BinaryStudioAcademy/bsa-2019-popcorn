import React from "react";
import CastItem from "../CastItem/CastItem"
import './CastList.scss'

type CastListProps={

}

const CastList = ()=>{
    return <div className='cast-list'>
        <div className='cast-list-header'>Main cast</div>
        <div className='cast-items-container'>
        <CastItem castItemInfo={{name:'Viggo Mortensen', image:'https://pixel.nymag.com/imgs/fashion/daily/2016/05/25/25-Viggo-Mortensen.w700.h700.jpg', role:'Tony Lip'}}/>
        <CastItem castItemInfo={{name:'Mahershala Ali', image:'https://pixel.nymag.com/imgs/daily/vulture/2018/12/04/04-mahershala-ali.w330.h330.jpg', role:'Dr. Donald Shirley'}}/>
        <CastItem castItemInfo={{name:'Linda Cardellini', image:'https://pbs.twimg.com/profile_images/1016413503081463808/yikT0nAV.jpg', role:'Dolores'}}/>
        <CastItem castItemInfo={{name:'Dimiter D. Marinov', image:'https://img.reelgood.com/content/person/3bd2fb39-93a0-40f4-a221-755c6842e7dc/square-242.jpg', role:'Oleg'}}/>
        </div>
    </div>
}

export default CastList;