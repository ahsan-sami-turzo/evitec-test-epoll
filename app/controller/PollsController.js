// pollsController.js

const { initializeDB, connectToDatabase, getDatabase } = require('../db');

// connectToDatabase()

// get list of polls
async function getPolls() {
    try {
        const db = getDatabase()
        return await db.collection('polls').find().toArray();
    } catch (error) {
        console.error('Error fetching polls:', error);
        throw new Error('Internal Server Error');
    }
}

// get a poll options by ID
async function getPollById(pollId) {
    try {
        const db = getDatabase()
        return await db.collection('polls').findOne({ id: pollId });
    } catch (error) {
        console.error('Error fetching poll:', error);
        throw new Error('Internal Server Error');
    }
}

// vote for a poll option
async function voteForOption(pollId, optionId) {
    try {
        const db = getDatabase()
        const poll = await db.collection('polls').findOne({ id: pollId });

        if (!poll) {
            throw new Error('Poll not found');
        }

        const option = poll.options.find(o => o.id === optionId);

        if (!option) {
            throw new Error('Option not found');
        }

        // Update the vote count for the selected option
        await db.collection('polls').updateOne(
            { id: pollId, 'options.id': optionId },
            { $inc: { 'options.$.votes': 1 } }
        );

        // Fetch and return the updated poll
        return await db.collection('polls').findOne({ id: pollId });
    } catch (error) {
        console.error('Error voting:', error);
        throw new Error('Internal Server Error');
    }
}

// delete a poll by ID
async function deletePollById(pollId) {
    try {
        const db = getDatabase();
        const pollsCollection = db.collection('polls');

        // Find the poll to be deleted
        const pollToDelete = await pollsCollection.findOne({ id: pollId });

        if (!pollToDelete) {
            throw new Error('Poll not found');
        }

        // Delete the poll by ID
        await pollsCollection.deleteOne({ id: pollId });

        return pollToDelete;
    } catch (error) {
        console.error('Error deleting poll:', error);
        throw new Error('Internal Server Error');
    }
}


// create a new poll
async function createPoll(newPoll) {
    try {
        const db = getDatabase()
        // Insert the new poll into the 'polls' collection
        const result = await db.collection('polls').insertOne(newPoll);

        // Return the newly created poll
        return result;
    } catch (error) {
        console.error('Error creating poll:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = {
    initializeDB,
    getPolls,
    getPollById,
    voteForOption,
    createPoll,
    deletePollById
};
