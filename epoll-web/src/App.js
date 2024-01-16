// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PollList from './components/PollsList';
import PollDetails from './components/PollDetails';
import AddPoll from './components/AddPoll';

function App() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/api/polls')
      .then(response => setPolls(response.data.polls))
      .catch(error => console.error('Error fetching polls:', error));
  }, []);

  const handlePollClick = (poll) => {
    axios.get(`http://localhost:8081/api/polls/${poll.id}`)
      .then(response => setSelectedPoll(response.data))
      .catch(error => console.error(`Error fetching poll details for ${poll.id}:`, error));
  };

  const handleVote = (pollId, optionId) => {
    axios.post(`http://localhost:8081/api/polls/${pollId}/vote/${optionId}`)
      .then(response => setSelectedPoll(response.data))
      .catch(error => console.error(`Error voting for option ${optionId} in poll ${pollId}:`, error));
  };

  const handleAddPoll = (newPoll) => {
    axios.post('http://localhost:8081/api/polls/add', newPoll)
      .then(response => {
        setPolls((prevPolls) => [...prevPolls, response.data]);
      })
      .catch(error => console.error('Error creating poll:', error));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <PollList polls={polls} selectedPoll={selectedPoll} onPollClick={handlePollClick} />
        </div>
        <div className="col-md-6">
          <AddPoll onAddPoll={handleAddPoll} />
        </div>
      </div>
      {selectedPoll && <PollDetails selectedPoll={selectedPoll} onVote={handleVote} />}
    </div>
  );
}

export default App;
