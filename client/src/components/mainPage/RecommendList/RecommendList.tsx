import React from "react";
import RecommendItem from '../RecommendItem/RecommendItem'
import "./RecommendList.scss"
import { ReactComponent as StaredIcon } from '../../../assets/icons/general/movie/staredIcon.svg';

type RecommendList={

}

const RecommendList: React.FC = ({}:RecommendList) => {
    return <div className="recommend-list">
        <div className='recommend-heading'><span>Recommended     </span>
        <StaredIcon width='16' height='14'/>
        </div>
        <RecommendItem recommendItem={{date:"22 July", name:"Big Beauty reunion", image:"https://i1.wp.com/www.revistabula.com/wp/wp-content/uploads/2019/01/O-Lagosta-1.jpg?resize=610%2C350&ssl=1", rating:4}}></RecommendItem>
        <RecommendItem recommendItem={{date:"22 July", name:"Big Beauty reunion", image:"https://i1.wp.com/www.revistabula.com/wp/wp-content/uploads/2019/01/O-Lagosta-1.jpg?resize=610%2C350&ssl=1", rating:4}}></RecommendItem>
    </div>
}

export default RecommendList;