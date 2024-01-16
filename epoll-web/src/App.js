// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import PollList from './components/PollsList';
import PollDetails from './components/PollDetails';
import AddPoll from './components/AddPoll';

function App() {

  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [activeTab, setActiveTab] = useState("polls");

  useEffect(() => {
    axios.get(`${REACT_APP_API_BASE_URL}/polls`)
      .then(response => setPolls(response.data.polls))
      .catch(error => console.error('Error fetching polls:', error));
  }, []);

  const fetchPollsList = () => {
    
  }

  const handlePollClick = (poll) => {
    axios.get(`${REACT_APP_API_BASE_URL}/polls/${poll.id}`)
      .then(response => setSelectedPoll(response.data))
      .catch(error => console.error(`Error fetching poll details for ${poll.id}:`, error));
  };

  const handleVote = (pollId, optionId) => {
    axios.post(`${REACT_APP_API_BASE_URL}/polls/${pollId}/vote/${optionId}`)
      .then(response => setSelectedPoll(response.data))
      .catch(error => console.error(`Error voting for option ${optionId} in poll ${pollId}:`, error));
  };

  const handleAddPoll = (newPoll) => {
    axios.post(`${REACT_APP_API_BASE_URL}/polls/add`, newPoll)
      .then(() => {
        // Fetch the updated poll list after adding a new poll
        axios.get(`${REACT_APP_API_BASE_URL}/polls`)
          .then(response => {
            setPolls(response.data.polls);
            setActiveTab("polls"); // Switch to the "Polls" tab
          })
          .catch(error => console.error('Error fetching updated polls after adding a new poll:', error));
      })
      .catch(error => console.error('Error creating poll:', error));
  };

  const handleDeletePoll = (pollId) => {
    axios.delete(`${REACT_APP_API_BASE_URL}/delete/polls/${pollId}`)
      .then(() => {
        axios.get(`${REACT_APP_API_BASE_URL}/polls`)
          .then(response => {
            setPolls(response.data.polls);
            setActiveTab("polls"); // Switch to the "Polls" tab
          })
          .catch(error => console.error('Error fetching updated polls after adding a new poll:', error));
        setSelectedPoll(null);
      })
      .catch(error => console.error(`Error deleting poll ${pollId}:`, error));
  };

  return (
    <div className="container mt-4">
      <Tabs activeKey={activeTab} id="main-tabs" onSelect={(key) => setActiveTab(key)}>
        <Tab eventKey="polls" title="Polls">
          <PollList polls={polls} selectedPoll={selectedPoll} onPollClick={handlePollClick} />
          {selectedPoll && <PollDetails selectedPoll={selectedPoll} onVote={handleVote} onDelete={handleDeletePoll} />}
        </Tab>
        <Tab eventKey="addPoll" title="Add Poll">
          <AddPoll onAddPoll={handleAddPoll} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
