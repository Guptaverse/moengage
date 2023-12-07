import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarReview from "../../components/StarReview";

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating , setRating] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        setDetails(response.data);

        const token = `bearer ${localStorage.getItem('token')}`
        // Fetch reviews from your backend using the brewery id (id)
        const reviewsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`);
        console.log(reviewsResponse)
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async() => {
    setReviews([...reviews, newReview]);
    const token = `bearer ${localStorage.getItem("token")}`
    console.log(rating)
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/add`,{newReview,rating,id:details.id,token}).then((res)=>{
        console.log("success on review")
    }).catch((err)=>{
        console.log("error in HandleReviewSubmit")
    })
    setNewReview("");
  };
  const handleRating = (selectedRating) => {

    setRating(selectedRating)
  };
  return (
    <div style={{color:"black",backgroundColor:"white",width:"400px",textAlign:"left",height:"500px",padding:"25px",borderRadius:"10px"}}>
      <div>
        <h2>{details.name}</h2>
        <p>
          <span style={{ fontWeight: "600" }}>Brewery Address: </span>
          {details.address_1}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Phone No: </span>
          {details.phone}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Website: </span>
          {details.website_url}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Current Rating: </span>
          {5}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>State: </span>
          {details.state}
        </p>
      </div>
      <div>
        <h3>Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            {review.owner}
            <br/>
            {review.review}
            {}
          </div>
        ))}
        <StarReview onRate={handleRating}/>
        <br/>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Add your review..."
          style={{width:"100%",height:"60px"}}
        />
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default DetailsPage;
