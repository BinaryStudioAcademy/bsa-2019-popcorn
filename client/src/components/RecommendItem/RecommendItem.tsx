import React from "react";
import "./RecommendItem.scss"

type RecommendItemProps = {
    recommendItem: {
        image: string,
        name: string,
        date: string
    }
}
const settingSvg = <svg width="13" height="4" viewBox="0 0 13 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11.0056" cy="1.84646" r="1.37283" fill="black" />
    <circle cx="6.42947" cy="1.84646" r="1.37283" fill="black" />
    <circle cx="1.8533" cy="1.84646" r="1.37283" fill="black" />
</svg>

const staredSvg = <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.23644 0.131771L6.50843 2.65737L9.76488 2.89206C9.99074 2.90843 10.0826 3.14484 9.91118 3.26929L7.44112 5.06456L8.18132 7.73528C8.23265 7.92088 7.99293 8.06686 7.7989 7.96825L5.00032 6.55236L2.20174 7.96825C2.0072 8.06643 1.76799 7.92045 1.81932 7.73528L2.55952 5.06456L0.0889476 3.26886C-0.0824987 3.14441 0.00887091 2.908 0.235242 2.89163L3.49169 2.65694L4.76368 0.131771C4.85197 -0.0439235 5.14815 -0.0439235 5.23644 0.131771Z" fill="#FB8700" />
</svg>

const notStaredSvg = <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.7128 0.131771L5.85759 2.65737L8.7884 2.89206C8.99167 2.90843 9.07436 3.14484 8.92006 3.26929L6.69701 5.06456L7.36318 7.73528C7.40938 7.92088 7.19364 8.06686 7.01901 7.96825L4.50029 6.55236L1.98157 7.96825C1.80648 8.06643 1.59119 7.92045 1.63739 7.73528L2.30357 5.06456L0.0800529 3.26886C-0.0742488 3.14441 0.00798382 2.908 0.211717 2.89163L3.14253 2.65694L4.28731 0.131771C4.36678 -0.0439235 4.63334 -0.0439235 4.7128 0.131771Z" fill="black" fill-opacity="0.5" />
</svg>

const likeSvg = <svg width="1.5em" height="1.5em" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.8719 3.18856C31.0201 1.33651 28.5685 0.324252 25.952 0.324252C23.3355 0.324252 20.8765 1.34401 19.0247 3.19606L18.0575 4.16332L17.0754 3.18106C15.2236 1.32901 12.7571 0.301758 10.1406 0.301758C7.53156 0.301758 5.0725 1.32151 3.22821 3.16606C1.37641 5.01812 0.356802 7.47752 0.364299 10.0944C0.364299 12.7113 1.39141 15.1632 3.2432 17.0152L17.3228 31.0968C17.5178 31.2918 17.7802 31.3967 18.0351 31.3967C18.29 31.3967 18.5524 31.2993 18.7473 31.1043L32.8569 17.0452C34.7087 15.1932 35.7283 12.7337 35.7283 10.1169C35.7358 7.50001 34.7237 5.04061 32.8719 3.18856ZM31.4324 15.6131L18.0351 28.9598L4.66766 15.5906C3.19822 14.1209 2.38853 12.1714 2.38853 10.0944C2.38853 8.01739 3.19072 6.06786 4.66016 4.60572C6.1221 3.14357 8.07136 2.33377 10.1406 2.33377C12.2173 2.33377 14.174 3.14357 15.6435 4.61321L17.3378 6.3078C17.7352 6.70521 18.3724 6.70521 18.7698 6.3078L20.4491 4.62821C21.9186 3.15857 23.8753 2.34876 25.9445 2.34876C28.0138 2.34876 29.963 3.15857 31.4324 4.62071C32.9019 6.09036 33.7041 8.03988 33.7041 10.1169C33.7116 12.1939 32.9019 14.1434 31.4324 15.6131Z" fill="black" />
</svg>
const plusSvg = <svg width="1.5em" height="1.5em" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.7718 0.0078125C7.23907 0.0078125 0.296875 6.95096 0.296875 15.4849C0.296875 24.0188 7.23907 30.9619 15.7718 30.9619C24.3045 30.9619 31.2467 24.0188 31.2467 15.4849C31.2467 6.95096 24.3045 0.0078125 15.7718 0.0078125ZM15.7718 29.6722C7.94995 29.6722 1.58643 23.3078 1.58643 15.4849C1.58643 7.66194 7.94995 1.29755 15.7718 1.29755C23.5936 1.29755 29.9571 7.66194 29.9571 15.4849C29.9571 23.3078 23.5936 29.6722 15.7718 29.6722Z" fill="black" />
    <path d="M24.1554 14.8429H16.418V7.10437C16.418 6.74791 16.1296 6.45947 15.7732 6.45947C15.4168 6.45947 15.1284 6.74791 15.1284 7.10437V14.8429H7.3909C7.0345 14.8429 6.74609 15.1313 6.74609 15.4878C6.74609 15.8442 7.0345 16.1327 7.3909 16.1327H15.1284V23.8712C15.1284 24.2277 15.4168 24.5161 15.7732 24.5161C16.1296 24.5161 16.418 24.2277 16.418 23.8712V16.1327H24.1554C24.5118 16.1327 24.8002 15.8442 24.8002 15.4878C24.8002 15.1313 24.5118 14.8429 24.1554 14.8429Z" fill="black" />
</svg>

const RecommendItem = ({recommendItem:{ image, name, date }}: RecommendItemProps) => {
    return (<div className='recommend-item'>
        <div className='recommend-item-header'>
            <div className='recommend-item-header-text'>Added to&nbsp;<strong>Popular</strong></div>
            <button className='recommend-item-settings'>
                {settingSvg}
            </button>
        </div>
        <div className='recommend-item-wrp'>
            <img className='recommend-item-image' src={image} alt="event" />
        </div>
        <div className='recommend-item-info'>
            <div className='recommend-item-row'>
                <div className='recommend-item-name'>{name}</div>
                <div className='recommend-item-percent'>85%</div>
            </div>
            <div className='recommend-item-row'>
                <div>
                    <span className='recommend-item-date'>{date} <svg width="2" height="11" viewBox="0 0 2 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0V11" stroke="black" stroke-opacity="0.11" />
                    </svg>
                        Variety
                    </span>
                </div>
                <div className='recommend-item-rating'>
                    {staredSvg}
                    {staredSvg}
                    {staredSvg}
                    {staredSvg}
                    {notStaredSvg}
                </div>
            </div>
            <div className='recommend-item-row'>
                <div className='recommend-item-action-buttons'>
                    <button>{likeSvg}</button>
                    <button>{plusSvg}</button>
                </div>
                <div>
                    <img className='recommend-item-reaction-image' src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg" alt="author" />
                    <img className='recommend-item-reaction-image' src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg" alt="author" />
                    <img className='recommend-item-reaction-image' src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg" alt="author" />
                    <img className='recommend-item-reaction-image' src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg" alt="author" />
                    <svg className='recommend-item-reaction-image' width="2em" height="2em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#FB8700" />
                        <text style={{ fontSize: '8px' }} x="2" y="13" fill="white">+12</text>
                    </svg>

                </div>
            </div>
        </div>
    </div>
    )
}

export default RecommendItem;