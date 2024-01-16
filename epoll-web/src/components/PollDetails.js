// src/components/PollDetails.js
import React from 'react';

const PollDetails = ({ selectedPoll, onVote, onDelete }) => {
    const handleVoteClick = (optionId) => {
        onVote(selectedPoll.id, optionId);
    };

    const handleDeleteClick = () => {
        onDelete(selectedPoll.id);
    };

    return (
        <div className="mt-4">
            <h2>{selectedPoll.title}</h2>

            <div>
                <ul className="list-group">
                    {selectedPoll.options.map(option => (
                        <li key={option.id} className="list-group-item">
                            {option.title} - Votes: {option.votes}
                            <button
                                className="btn btn-sm btn-outline-primary ms-2"
                                onClick={() => onVote(selectedPoll.id, option.id)}
                            >
                                Vote
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='mt-2'>
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                    Delete Poll
                </button>
            </div>
        </div>
    );
};

export default PollDetails;



