import React from "react";
import './TopList.scss';
import TopListItem from "./TopListItem/TopListItem";

const mock = {
    title: 'Big Beauty reunion',
    rating: '85%',
    year: 2019,
    genre: 'Drama'
}

const TopList: React.FC = () => {
    return (
        <div className="top-list-component">
            <div className="top-list-heading">Top of the year</div>
            <div  className="top-list">
                <div className="top-list-img"><img src="https://s3-alpha-sig.figma.com/img/1ebb/a6eb/56364eb8a23b4cb9e047144eee70da50?Expires=1566172800&Signature=aWQQK21~1P2NhbRrqOKUs9fwjx4XjZfgZ1dXr3u96aHv7CPYS-QlYNcRNihS~l7e3nPof-97pBseB7GE-vtYFSD8vvkl833LKHU~95w-G-t3iWsKzhHBh-wfT7GEKL9M54200dMNjWmGUj4TaduN-amxAqZQ2XSZ86RltG0ge22akjtaKpNaEhNkSiepKSFQjM0BjYRZauIzOblH0gaTedM1qznC2AfRIuZ59UOFUrvosNNbI9u5NnWeti5Iu-jPzsnvyepDo58VgrITOGTM17O~YutKAtkyzww1PP-xQZXSjXRLzlaGOmAYs6TJ4fDcBuQd6hmcxZ9KFf~NVi8wSA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" /></div>
                <div className="top-list-items">
                    <TopListItem title={mock.title} year={mock.year} genre={mock.genre} rating={mock.rating} />
                    <TopListItem title={mock.title} year={mock.year} genre={mock.genre} rating={mock.rating} />
                    <TopListItem title={mock.title} year={mock.year} genre={mock.genre} rating={mock.rating} />
                    <TopListItem title={mock.title} year={mock.year} genre={mock.genre} rating={mock.rating} />
                    <TopListItem title={mock.title} year={mock.year} genre={mock.genre} rating={mock.rating} />
                </div>
            </div>
        </div>)
}

export default TopList;