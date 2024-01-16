// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [newPoll, setNewPoll] = useState({ title: '', options: ['', ''] });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...newPoll.options];
    newOptions[index] = event.target.value;
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      options: newOptions,
    }));
  };

  const handleAddOption = () => {
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      options: [...prevPoll.options, ''],
    }));
  };

  const handleCreatePoll = () => {
    axios.post('http://localhost:8081/api/polls/add', newPoll)
      .then(response => {
        setPolls((prevPolls) => [...prevPolls, response.data]);
        setNewPoll({ title: '', options: ['', ''] });
      })
      .catch(error => console.error('Error creating poll:', error));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1>Poll List</h1>
          <ul className="list-group">
            {polls.map(poll => (
              <li key={poll.id} className="list-group-item" onClick={() => handlePollClick(poll)}>
                {poll.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h1>Create a New Poll</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="pollTitle" className="form-label">Poll Title</label>
              <input
                type="text"
                className="form-control"
                id="pollTitle"
                name="title"
                value={newPoll.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Poll Options</label>
              {newPoll.options.map((option, index) => (
                <div key={index} className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(event) => handleOptionChange(index, event)}
                  />
                  {index === newPoll.options.length - 1 && (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleAddOption}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreatePoll}>
              Create Poll
            </button>
          </form>
        </div>
      </div>
      {selectedPoll && (
        <div className="mt-4">
          <h2>{selectedPoll.title}</h2>
          <ul className="list-group">
            {selectedPoll.options.map(option => (
              <li key={option.id} className="list-group-item">
                {option.title} - Votes: {option.votes}
                <button
                  className="btn btn-sm btn-outline-primary ms-2"
                  onClick={() => handleVote(selectedPoll.id, option.id)}
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
