import React, { SFC } from 'react';
import { connect } from 'react-redux';
import './MovieSeriesReviews.scss';
import ReviewItem from './ReviewItem/ReviewItem';
import Spinner from '../../shared/Spinner';

export interface IReview {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	reviewText: string;
	created_at: string;
	rating: number;
}

interface IProps {
	reviews: IReview[];
}

const MovieSeriesReviews: React.FC<IProps> = ({ reviews }) => {
	return (
		<div className="MovieSeriesReviews">
			{!reviews ? (
				<Spinner />
			) : (
				reviews.map((item: IReview) => {
					return <ReviewItem review={item} />;
				})
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		reviews: mockReviews // state.reviews
	};
};

export default connect(mapStateToProps)(MovieSeriesReviews);

const mockReviews = [
	{
		id: '7f13334d-c353-4c3c-98fe-ead99e1252c5',
		author: {
			name: 'Anastasiia',
			avatar: 'https://i.pravatar.cc/300?img=20'
		},
		reviewText:
			'Quentin Tarantino’s “Inglourious Basterds” is a big, bold, audacious war movie that will annoy some, startle others and demonstrate once again that he’s the real thing, a director of quixotic delights. For starters (and at this late stage after the premiere in May at Cannes, I don’t believe I’m spoiling anything), he provides World War II with a much-needed alternative ending. For once the basterds get what’s coming to them.From the title, ripped off from a 1978 B-movie, to the Western sound of the Ennio Morricone opening music to the key location, a movie theater, the film embeds Tarantino’s love of the movies. The deep, rich colors of 35mm film provide tactile pleasure. A character at the beginning and end, not seen in between, brings the story full circle. The “basterds” themselves, savage fighters dropped behind Nazi lines, are an unmistakable nod to the Dirty Dozen. And above all, there are three iconic characters, drawn broadly and with love: the Hero, the Nazi and the Girl. These three, played by Brad Pitt, Christoph Waltz and Melanie Laurent, are seen with that Tarantino knack of taking a character and making it a Character, definitive, larger than life, approaching satire in its intensity but not — quite — going that far. Let’s say they feel bigger than most of the people we meet in movies.',
		created_at: 'July 28',
		rating: 4
	},
	{
		id: '3f13634d-c353-433c-98fe-e2d9911252c7',
		author: {
			name: 'Mike',
			avatar: 'https://i.pravatar.cc/300?img=22'
		},
		reviewText:
			'John Wick has a very simple, maybe even laughable plot. It is a typical guy takes his revenge movie. It can be easily summarized as "Keanu gets pissed and shoots people in the face for 101 minutes" but the thing is you actually can see it is really Keanu who is doing it. Instead of shaky cameras and dozens of superfast cuts, you can see kick-ass long takes which are amazingly choreographed. Since this is their first film, the director duo has a few problems with storytelling but I am glad that they made me realize how much I miss watching an action movie and actually see whats going on.',
		created_at: 'July 21',
		rating: 1
	},
	{
		id: '7f13634d-c353-4c3c-98fe-e3d99e1252c5',
		author: {
			name: 'Margaret',
			avatar: 'https://i.pravatar.cc/300?img=25'
		},
		reviewText:
			'The movie really live up audience expectation. Its dumb, ridiculous,fun, and crazy too. This why audience watch this kind of movie because of its entertainment value. The movie really offer audience a lot this time. You got Dwayne Johnson and Jason Statham bicker all the time like husband and wife, ridiculous action sequence, and powerful family theme which I think very relatable for some audience. The movie also have surprise appearance by some popular actor which I think gonna get people excited more. Overall, its very enjoyable dumb flick action movie that definitely live up our expectation',
		created_at: 'July 28',
		rating: 4
	},
	{
		id: '7f13634d-c353-4c3c-98fe-e3d99e1252c5',
		author: {
			name: 'Helen',
			avatar: 'https://i.pravatar.cc/300?img=27'
		},
		reviewText:
			'I was a mere child when I watched LOTR franchise and I still liked it. Ever since, year by year, I grew fonder and fonder of the movies and they remain, and probably forever will, one of my favorite movies of all time. Ive read all the books countless times (including Hobit) and when I saw that Hobbit was coming into the cinema, my mind was entirely wiped away from its existence due to excitement that entered me. Now, movie review. As expected from Peter - almost flawless masterpiece. Given that he had a lot of material to work with, I imagine it was quite hard to put everything together for the scenery - yet he did it, once more. He captured the feeling of the book and transcended it onto a screen; of course, it was not solely his credit, to not be mistaken. The acting was amazing - perfectly fitting into fantasy style. The chemistry between actors was more than just the obvious - you could actually feel their interactions and live the story. Yes, it was that good. I have no need to begin writing about camera work and all that comes with it; locations were beautiful, effects and colors were mixed perfect, a soundtrack that followed through pattered with what was going on perfectly ... it is really one of those moments when you simply cant say enough because you know, regardless of how many words you put in, you still wont be able to describe things the way you felt them. I have only one thing to say: congratulations Mr. Jackson and rest of the cast.The Hobbit: An Unexpected Journey will become classic without any doubt; I am just glad that I got to be a part of the generation that witnessed the never-dying franchise of Mr. Tolkiens work.',
		created_at: 'July 28',
		rating: 4
	}
];
