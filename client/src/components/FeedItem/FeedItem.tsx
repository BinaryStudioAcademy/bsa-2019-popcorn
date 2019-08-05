import React from "react";
import AddComment from "../AddComment/AddComment"
import "./FeedItem.scss"

type IFeedItemProps = {
    feedItem:{
    author: string,
    authorImage: string,
    postDate: string,
    postImage: string
    }
}

const settingSvg = <svg width="30" height="7" viewBox="0 0 30 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26.411" cy="3.61511" rx="3.34268" ry="3.34314" fill="black" />
    <ellipse cx="15.2665" cy="3.61511" rx="3.34268" ry="3.34314" fill="black" />
    <ellipse cx="4.12589" cy="3.61511" rx="3.34268" ry="3.34314" fill="black" />
</svg>
const likeSvg = <svg className='like-svg' width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.8719 3.18856C31.0201 1.33651 28.5685 0.324252 25.952 0.324252C23.3355 0.324252 20.8765 1.34401 19.0247 3.19606L18.0575 4.16332L17.0754 3.18106C15.2236 1.32901 12.7571 0.301758 10.1406 0.301758C7.53156 0.301758 5.0725 1.32151 3.22821 3.16606C1.37641 5.01812 0.356802 7.47752 0.364299 10.0944C0.364299 12.7113 1.39141 15.1632 3.2432 17.0152L17.3228 31.0968C17.5178 31.2918 17.7802 31.3967 18.0351 31.3967C18.29 31.3967 18.5524 31.2993 18.7473 31.1043L32.8569 17.0452C34.7087 15.1932 35.7283 12.7337 35.7283 10.1169C35.7358 7.50001 34.7237 5.04061 32.8719 3.18856ZM31.4324 15.6131L18.0351 28.9598L4.66766 15.5906C3.19822 14.1209 2.38853 12.1714 2.38853 10.0944C2.38853 8.01739 3.19072 6.06786 4.66016 4.60572C6.1221 3.14357 8.07136 2.33377 10.1406 2.33377C12.2173 2.33377 14.174 3.14357 15.6435 4.61321L17.3378 6.3078C17.7352 6.70521 18.3724 6.70521 18.7698 6.3078L20.4491 4.62821C21.9186 3.15857 23.8753 2.34876 25.9445 2.34876C28.0138 2.34876 29.963 3.15857 31.4324 4.62071C32.9019 6.09036 33.7041 8.03988 33.7041 10.1169C33.7116 12.1939 32.9019 14.1434 31.4324 15.6131Z" fill="black" />
</svg>
const commentSvg = <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.948 0.543945H3.52903C1.75531 0.543945 0.3125 1.98695 0.3125 3.76093V20.9187C0.3125 22.6925 1.75531 24.1355 3.52903 24.1355H10.951L13.4089 29.0522C13.8371 29.9086 14.5039 30.4 15.2384 30.4C15.9729 30.4 16.6398 29.9086 17.0679 29.0522L19.5261 24.1355H26.948C28.7215 24.1355 30.1643 22.6925 30.1643 20.9187V3.76093C30.1643 1.98695 28.7215 0.543945 26.948 0.543945V0.543945ZM28.4152 20.9187C28.4152 21.7278 27.757 22.3861 26.948 22.3861H18.9856C18.6542 22.3861 18.3516 22.5733 18.2033 22.8697L15.5035 28.2697C15.3947 28.4875 15.2924 28.5946 15.2384 28.6356C15.1844 28.5946 15.0822 28.4875 14.9733 28.2697L12.2736 22.8697C12.1255 22.5733 11.8226 22.3861 11.4915 22.3861H3.52903C2.71983 22.3861 2.06163 21.7278 2.06163 20.9187V3.76093C2.06163 2.95162 2.71983 2.29332 3.52903 2.29332H26.948C27.757 2.29332 28.4152 2.95162 28.4152 3.76093V20.9187Z" fill="black" />
</svg>
const plusSvg = <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.7718 0.0078125C7.23907 0.0078125 0.296875 6.95096 0.296875 15.4849C0.296875 24.0188 7.23907 30.9619 15.7718 30.9619C24.3045 30.9619 31.2467 24.0188 31.2467 15.4849C31.2467 6.95096 24.3045 0.0078125 15.7718 0.0078125ZM15.7718 29.6722C7.94995 29.6722 1.58643 23.3078 1.58643 15.4849C1.58643 7.66194 7.94995 1.29755 15.7718 1.29755C23.5936 1.29755 29.9571 7.66194 29.9571 15.4849C29.9571 23.3078 23.5936 29.6722 15.7718 29.6722Z" fill="black" />
    <path d="M24.1554 14.8429H16.418V7.10437C16.418 6.74791 16.1296 6.45947 15.7732 6.45947C15.4168 6.45947 15.1284 6.74791 15.1284 7.10437V14.8429H7.3909C7.0345 14.8429 6.74609 15.1313 6.74609 15.4878C6.74609 15.8442 7.0345 16.1327 7.3909 16.1327H15.1284V23.8712C15.1284 24.2277 15.4168 24.5161 15.7732 24.5161C16.1296 24.5161 16.418 24.2277 16.418 23.8712V16.1327H24.1554C24.5118 16.1327 24.8002 15.8442 24.8002 15.4878C24.8002 15.1313 24.5118 14.8429 24.1554 14.8429Z" fill="black" />
</svg>
const stokeSvg = <svg width="100%" height="2" viewBox="0 0 802 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.487305 1.43213H801.512" stroke="black" stroke-opacity="0.11" />
</svg>

const FeedItem = ({ feedItem:{author, authorImage, postDate, postImage} }: IFeedItemProps) => {
    return <div className='feed-item'>
        <div className='feed-item-header'>
            <img className='feed-item-avatar' src={authorImage} alt="author" />
            <div className='feed-item-info'>
                <div className='feed-item-author-name'>{author}</div>
                <div className='feed-item-post-time'>{postDate}</div>
            </div>
            <button className='feed-item-settings'>
                {settingSvg}
            </button>
        </div>
        <img className='feed-item-image' src={postImage} alt="post" />
        <div className='feed-item-action-buttons'>
            <button>{likeSvg}</button>
            <button>{commentSvg}</button>
            <button className='feed-item-action-plus'>{plusSvg}</button>
        </div>
        <div className='feed-item-last-reaction' > <img className='feed-item-reaction-image' src={authorImage} alt="author" />
            <div className='feed-item-reaction-text'>Appreciate by&nbsp;<strong>Doug Walker</strong></div>
        </div>
        {stokeSvg}
        <AddComment></AddComment>
    </div>
}

export default FeedItem;