// api.js

const express = require('express');
const pollsController = require('./controller/PollsController');

const router = express.Router();

// Get Poll List
router.get('/polls', async (req, res) => {
  try {
    const polls = await pollsController.getPolls();
    res.json({ polls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a Poll options by ID
router.get('/polls/:id', async (req, res) => {
  const pollId = parseInt(req.params.id);

  try {
    const poll = await pollsController.getPollById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Poll by ID
router.delete('/delete/poll/:id', async (req, res) => {
  const pollId = parseInt(req.params.id);

  try {
    const deletedPoll = await pollsController.deletePollById(pollId);

    if (!deletedPoll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote in a Poll
router.post('/polls/:id/vote/:option', async (req, res) => {
  const pollId = parseInt(req.params.id);
  const optionId = parseInt(req.params.option);

  try {
    const updatedPoll = await pollsController.voteForOption(pollId, optionId);
    res.json(updatedPoll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new Poll
router.post('/polls/add', async (req, res) => {
  const polls = await pollsController.getPolls();

  const { title, options } = req.body;

  // Validate that options is an array before accessing its elements
  if (!Array.isArray(options)) {
    return res.status(400).json({ error: 'Options must be an array' });
  }

  // Initialize votes count to 0 for each option
  const pollOptions = options.map((option, index) => ({
    id: index + 1,
    title: option,
    votes: 0,
  }));

  // Create a new poll document
  const newPoll = {
    id: polls.length + 1,  // Assuming polls is an array containing existing polls
    title: title,
    options: pollOptions,
  };


  try {
    const createdPoll = await pollsController.createPoll(newPoll);
    res.json(createdPoll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
