import { useState, useEffect, useContext } from 'react';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const CommentModal = ({ commnetDetails }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [loading, setLoading] = useState(false);
    // const { user } = useContext(AuthContext)

    const {userName ,photo, productId} = commnetDetails


    // Fetch comments when the modal opens
    useEffect(() => {
        if (open) {
            const fetchComments = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${import.meta.env.VITE_SERVER}/api/products/${productId}`); // Include the full URL

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json(); // Parse the JSON response

                    if (data && data.comments) {
                        setComments(data.comments); // Set comments to state
                    } else {
                        console.error('No comments found for this product.');
                    }
                } catch (error) {
                    console.error('Error fetching product data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchComments();
        }
    }, [ productId]);




    const handleCommentSubmit = async () => {
        const newReview = {
            comment: newComment,
            userRating: newRating,
            name: userName, // Replace with actual user's name from auth
            userPhoto: photo // Replace with actual user's photo URL
        };
        console.log(newReview);
        

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/products/${productId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                // Add the new comment to the local state after successful submission
                setComments([...comments, newReview]);
                setNewComment('');
                setNewRating(0);
               // handleClose(); // Close the modal
            } else {
                console.error('Error submitting comment.');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
       
            <div className="bg-white dark:bg-slate-400 p-6 rounded shadow-lg  text-black">
                <h2 className="text-lg font-semibold mb-4">Product Reviews</h2>

                {/* Show a loading spinner or message while fetching */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Display existing comments */}
                        <div className="max-h-60 overflow-y-auto">
                            {comments?.length > 0 ? (
                                comments?.map((review, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex items-center">
                                            <img src={review?.userPhoto} alt={review?.name} className="w-8 h-8 rounded-full mr-2" />
                                            <h3 className="font-bold mr-2">{review?.name}</h3>
                                            <Rating name="read-only" value={review?.userRating} readOnly />

                                        </div>
                                        <p>{review?.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>

                        {/* Comment and Rating Form */}
                        {/* Comment and Rating Form */}
                        <div className="mt-4">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-500 bg-white"
                                placeholder="Write your comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="mt-2 flex items-center">
                                <Rating
                                    name="new-rating"
                                    value={newRating}
                                    onChange={(e, newValue) => setNewRating(newValue)}
                                />
                                <button
                                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={handleCommentSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
       
    );
};

export default CommentModal;
