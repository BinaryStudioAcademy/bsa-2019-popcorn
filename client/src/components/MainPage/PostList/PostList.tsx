import React, { PureComponent } from "react";
import Post from "../Post/Post";
import "./PostList.scss"

const posts = [{
		author:"Doug Walker", 
		postDate:"2 hours ago", 
		postImage:"http://wikimovies.ru/_ld/18/82413019.jpg", 
		authorImage:"https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg", 
		body: "I've just watched this movie and wanna share my review with you! Link to it is below!",
		
		content: {
			image: "https://www.bravotv.com/sites/bravo/files/styles/blog-post-embedded--mobile/public/2019-06/sandra-bullock-keanu-reeves-date.jpg?itok=5ylIbvDh",
			description: `Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis incididunt... `,
			link: "#"
		},
		
		comments: [
			{
				id: "12das",
				author: "marie_marie",
				commentDate: "18 hours ago",
				commentBody: "She is my favourite actress!"
			},
			{
				id: "13asdd2",
				author: "denny_de_vito",
				commentDate: "19 hours ago",
				commentBody: "She looks amazing!"
			}
		],
		tags: [	{	id: "9992fdas",
				tagName: "movie"
			},	{	id: "143adsasdd2",
				tagName: "beloved"
			},	{	id: "143asdd32",
				tagName: "happy"
			},	{	id: "1243asdd2",
				tagName: "new"
			},	{	id: "143asdsfd2",
				tagName: "best"
			},	{	id: "1d3asdd2",
				tagName: "keanu"
			},	{	id: "143asd2",
				tagName: "movies"
			},	{	id: "3asdd2",
				tagName: "2019"
			},	{	id: "1243asdwwd2",
				tagName: "cannes"
			},	{	id: "143ahdd2",
				tagName: "cinema"
			},
		]
	},
	{
		author:"Doug Walker", 
		postDate:"3 hours ago", 
		postImage:"https://ichef.bbci.co.uk/news/660/cpsprodpb/462C/production/_107846971_lion_king_disney.jpg", 
		authorImage:"https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
	},
	{
		author:"Doug Walker", 
		postDate:"5 hours ago", 
		postImage:"https://ichef.bbci.co.uk/news/660/cpsprodpb/462C/production/_107846971_lion_king_disney.jpg", 
		authorImage:"https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg", 
		body: "Amazing movie, I love it! Everyone should check out this awesome visual effects! I created a survey with comparing 1994 video to 2019",
		
		content: {
			image: "http://media.altpress.com/uploads/2018/11/the_lion_king_comparison.jpg",
			description: `Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis incididunt... `,
			link: "#"
		},
		tags: [{id: "1addsfghndd2",
			tagName: "lion"
		},	{	id: "143adsasfghndd2",
			tagName: "cartoon"
		},	{	id: "143asdd32",
			tagName: "disney"
		},	{	id: "1243as66dd2",
			tagName: "art"
		},	{	id: "143asdsssfd2",
			tagName: "3d"
		}]
	}
];

class PostList extends PureComponent{
	render (){
		return (
			<div className='feed-list'>
				<div className='feed-heading'>News feed</div>
				{ posts.map((post) => 
					<Post post={post}/>
				)}
			</div>
		);
	}
}


export default PostList;