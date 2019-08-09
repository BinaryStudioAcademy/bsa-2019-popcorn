import {CANCEL_TEMP_AVATAR, FINISH_UPLOAD_AVATAR, SET_TEMP_AVATAR} from "./actionTypes";

const initialState = {
    profileInfo:{
        id: "7f13634d-c353-433c-98fe-ead99e1252c7",
        name: "Sofi Dub",
        male: false,
        female: true,
        location: "KIev",
        about: "Give me films",
        avatar:  "https://s3-alpha-sig.figma.com/img/919e/1a5a/da4f250d469108191ad9d4af68b2a639?Expires=1566172800&Signature=Kou41Z8bd8ig~9nLibgCH5gfaOc0K~9Io82-umabjJnomveXbPcqMWfD911bHy6h77reHT6ecNYFHCzmXkQNy3vEF-OzgJYgV875TI2rX~cPt1FaSJC5wCeybEfTrlBlCcdzSFn8iVcP~C8GTx-l6CIjyugGAhvr7xJ-hfAdlf~5Mll0Sy92dSKn8q7OkJdfsMvEEFVQ3rGHn8GGQZg1a60gif0VaQhuVX1gcRgwrsak~cerS1bnDvo93B1lFOIk85wlhY2hPwQrmCtI9A-qaAtbIxmzmxkRpuVUpDrX6Jd4hXpksbd7urSJ91Dg7tv9WzRZvIkLnPXflCfmPw~slw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
    },
    uploadUrl: ''
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FINISH_UPLOAD_AVATAR:
            return{
                ...state,
                profileInfo: action.payload.user
            };
        case SET_TEMP_AVATAR:{
            return{
                ...state,
                uploadUrl: action.payload.uploadUrl
            }
        }
        case CANCEL_TEMP_AVATAR:{
            console.log('tyt');
            return{
                ...state,
                uploadUrl: ''
            }
        }
        default:
            return state;
    }
}