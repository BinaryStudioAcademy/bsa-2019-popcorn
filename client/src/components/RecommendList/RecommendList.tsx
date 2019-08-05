import React from "react";
import RecommendItem from '../RecommendItem/RecommendItem'
import "./RecommendList.scss"

type RecommendList={

}

const RecommendList: React.FC = ({}:RecommendList) => {
    return <div className="recommend-list">
        <div className='recommend-heading'><span>Recommended     </span>
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.37831 0.230599L10.4135 4.6504L15.6238 5.06111C15.9852 5.08975 16.1322 5.50347 15.8579 5.72125L11.9058 8.86297L13.0901 13.5367C13.1722 13.8615 12.7887 14.117 12.4782 13.9444L8.00051 11.4666L3.52279 13.9444C3.21151 14.1162 2.82879 13.8608 2.91092 13.5367L4.09523 8.86297L0.142316 5.7205C-0.131998 5.50271 0.0141935 5.08899 0.376387 5.06036L5.58671 4.64965L7.62189 0.230599C7.76316 -0.0768662 8.23705 -0.0768662 8.37831 0.230599Z" fill="#FB8700" />
            </svg>
        </div>
        <RecommendItem recommendItem={{date:"22 July", name:"Big Beauty reunion", image:"https://i1.wp.com/www.revistabula.com/wp/wp-content/uploads/2019/01/O-Lagosta-1.jpg?resize=610%2C350&ssl=1"}}></RecommendItem>
        <RecommendItem recommendItem={{date:"22 July", name:"Big Beauty reunion", image:"https://i1.wp.com/www.revistabula.com/wp/wp-content/uploads/2019/01/O-Lagosta-1.jpg?resize=610%2C350&ssl=1"}}></RecommendItem>
    </div>
}

export default RecommendList;