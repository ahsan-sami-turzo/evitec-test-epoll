// src/components/PollsList.js
import React from 'react';

const PollsList = ({ polls, selectedPoll, onPollClick }) => (
    <div className="mt-4">
        <h2>Poll List</h2>
        <ul className="list-group">
            {polls.map(poll => (
                <li
                    key={poll.id}
                    className={`list-group-item ${selectedPoll && selectedPoll.id === poll.id ? 'active' : ''}`}
                    onClick={() => onPollClick(poll)}
                >
                    {poll.title}
                </li>
            ))}
        </ul>
    </div>
);

export default PollsList;
