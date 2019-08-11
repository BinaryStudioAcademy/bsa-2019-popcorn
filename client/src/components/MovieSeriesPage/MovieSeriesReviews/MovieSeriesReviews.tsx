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
        reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, amet. Expedita repellat fugit numquam aliquid sit, incidunt soluta eos rerum quisquam, corporis distinctio necessitatibus quas aspernatur, minima repudiandae inventore similique.",
        created_at: "July 28",
        rating: 4
    },
    {
        id: "3f13634d-c353-433c-98fe-e2d9911252c7",
        author: {
            name: "Mike",
            avatar: "https://i.pravatar.cc/300?img=22"
        },
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur tempore non ducimus sunt. Quae, molestiae reprehenderit! Vitae maxime architecto esse fugit ut labore sed tenetur. Modi possimus quod odit eius.Doloremque quasi aperiam nam. Architecto nulla debitis explicabo officia amet. Eligendi magnam voluptates, impedit expedita porro amet beatae praesentium, ea placeat consequuntur nemo iusto. Accusantium laboriosam eum sed ab illo?Harum ea quasi eaque eligendi nisi est eveniet in itaque id aut consectetur mollitia, nulla inventore doloremque adipisci nesciunt placeat ex dicta quo quam accusantium. Tempora provident repellendus veritatis ipsam!Animi quae temporibus iste illo. Nihil earum nisi labore voluptatem autem hic? Iure in minus praesentium error, similique qui inventore eligendi aperiam nulla autem commodi dolorum obcaecati et eveniet consectetur. Consequatur tempore non ducimus sunt. Quae, molestiae reprehenderit! Vitae maxime architecto esse fugit ut labore sed tenetur. Modi possimus quod odit eius.Doloremque quasi aperiam nam. Architecto nulla debitis explicabo officia amet. Eligendi magnam voluptates, impedit expedita porro amet beatae praesentium, ea placeat consequuntur nemo iusto. Accusantium laboriosam eum sed ab illo?Harum ea quasi eaque eligendi nisi est eveniet in itaque id aut consectetur mollitia, nulla inventore doloremque adipisci nesciunt placeat ex dicta quo quam accusantium. Tempora provident repellendus veritatis ipsam!Animi quae temporibus iste illo. Nihil earum nisi labore voluptatem autem hic? Iure in minus praesentium error, similique qui inventore eligendi aperiam nulla autem commodi dolorum obcaecati et eveniet consectetur.",created_at: "July 21",
        rating: 1
    },
    {
        id: "7f13634d-c353-4c3c-98fe-e3d99e1252c5",
        author: {
            name: "Anastasiia",
            avatar: "https://i.pravatar.cc/300?img=20"
        },
        reviewText: 'Tra-la-la',
        created_at: "July 28",
        rating: 4
    }
];