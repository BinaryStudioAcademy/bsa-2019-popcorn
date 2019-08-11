import React, { SFC } from 'react';
import { connect } from 'react-redux';
import "./MovieSeriesReviews.scss";
import ReviewItem from './ReviewItem/ReviewItem'
import Spinner from '../../shared/Spinner';

export interface IReview {
    id: string
    author: {
        name: string
        avatar: string
    }
    reviewText: string
    created_at: string
    rating: number
}

interface IProps {
    reviews: IReview[]
}

const MovieSeriesReviews: React.FC<IProps> = ( { reviews } )  => {
    
    return (
        <div className="MovieSeriesReviews">
          {(!reviews) ? (<Spinner />) : (
              reviews.map( (item :IReview) => {
                return (
                    <ReviewItem review={item} />
                )
              })
          )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        reviews: mockReviews // state.reviews
    }
}

export default connect(mapStateToProps)(MovieSeriesReviews);

const mockReviews = [
    {
        id: "7f13334d-c353-4c3c-98fe-ead99e1252c5",
        author: {
            name: "Anastasiia",
            avatar: "https://i.pravatar.cc/300?img=20"
        },
        reviewText: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
        created_at: "July 28",
        rating: 4
    },
    {
        id: "3f13634d-c353-433c-98fe-e2d9911252c7",
        author: {
            name: "Mike",
            avatar: "https://i.pravatar.cc/300?img=22"
        },
        reviewText: 'Bad film',
        created_at: "July 21",
        rating: 1
    },
    {
        id: "7f13634d-c353-4c3c-98fe-e3d99e1252c5",
        author: {
            name: "Anastasiia",
            avatar: "https://i.pravatar.cc/300?img=20"
        },
        reviewText: 'Comment comment comment comment comment comment comment comment comment comment  comment comment comment ',
        created_at: "July 28",
        rating: 4
    }
];