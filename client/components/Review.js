import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, FlexParent,  CardText, Title } from './component-styles'
import { fetchAllReviews, addNewReview } from '../store';


class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      rating: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }
componentDidMount() {
    this.props.loadAllReviews();
  }


  handleChangeContent (event) {
    this.setState({ content: event.target.value });
  }

  handleChangeRating (event) {
    this.setState({ rating: event.target.value });
  }


  handleSubmit (event) {
    event.preventDefault();

    const review = {
      content: this.state.content,
      rating: this.state.rating
    }
    this.props.addNewReview(review, this.props.user.id)


  }

  render () {
    const reviews = this.props.reviews;
console.log("riviews", this.props.reviews);

    return (
    <div>
       <h2>All Riviews</h2>
       <FlexParent>

          {
           reviews && reviews.map(review => {
              return (
                <Card key={review.id}>

                  <CardText>
                    <span>{review.content}</span>

                    <span>{review.rating}</span>

                  </CardText>
                </Card>
              );
            })
          }

      </FlexParent>
      <form className="review" onSubmit={this.handleSubmit}>
        <h4>Write your review</h4>

        <div className="rating">
            <h5>Rating</h5>
             <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
          <div className="form-group">
            <textarea cols="50" rows="6" name="comment" onChange={this.handleChangeContent}></textarea>
          </div>
        <button type="submit" className="btn btn-success"> Submit </button>
      </form>
       </div>
    );
  }
}
/* -----------------    CONTAINER     ------------------ */
// const mapStateToProps = ({reviews}) => ({reviews});

// export default withRouter(connect(mapStateToProps)(Review));

// export default Review;


const mapStateToProps = ({riviews, user}) => ({riviews, user});

const mapDispatchToProps = (dispatch) => {
  return {
loadAllReviews ()
 {
      dispatch(fetchAllReviews());
    },
   addNewReview(review, userId){
      console.log("order", review);
      dispatch(addNewReview(review, userId));

  }
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Review));
