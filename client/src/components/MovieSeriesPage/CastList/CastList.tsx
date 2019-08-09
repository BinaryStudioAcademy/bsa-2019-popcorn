import React from "react";
import CastItem from "../CastItem/CastItem"
import './CastList.scss'

type CastListProps = {}

const castListMock = [{
    name: 'Viggo Mortensen',
    image: 'https://pixel.nymag.com/imgs/fashion/daily/2016/05/25/25-Viggo-Mortensen.w700.h700.jpg',
    role: 'Tony Lip'
},
    {
        name: 'Mahershala Ali',
        image: 'https://pixel.nymag.com/imgs/daily/vulture/2018/12/04/04-mahershala-ali.w330.h330.jpg',
        role: 'Dr. Donald Shirley'
    },
    {
        name: 'Linda Cardellini',
        image: 'https://pbs.twimg.com/profile_images/1016413503081463808/yikT0nAV.jpg',
        role: 'Dolores'
    },
    {
        name: 'Dimiter D. Marinov',
        image: 'https://img.reelgood.com/content/person/3bd2fb39-93a0-40f4-a221-755c6842e7dc/square-242.jpg',
        role: 'Oleg'
    }];

const CastList = () => {
    return <div className={'cast-list'}>
        <div className={'cast-list-header cross-line'}><span>Main cast</span></div>
        <div className={'cast-items-container'}>
            {
                castListMock.map(el => {
                    return <CastItem castItemInfo={el}/>
                })
            }
        </div>
    </div>
};

export default CastList;