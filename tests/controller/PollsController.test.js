const { deletePollById } = require('../../app/controller/PollsController'); // Update the path accordingly
const { initializeDB, connectToDatabase, getDatabase } = require('../../app/db'); // Update the path accordingly

beforeAll(async () => {
    await connectToDatabase(); // Establish database connection before tests
});

afterAll(async () => {
    const db = getDatabase();
    await db.close(); // Close the database connection after tests
});

describe('PollsController', () => {
    it('should delete a poll by ID', async () => {
        // Assume you have a poll with ID 1 in your test database
        const pollIdToDelete = 1;

        const deletedPoll = await deletePollById(pollIdToDelete);

        // Check if the deleted poll has the correct ID
        expect(deletedPoll.id).toBe(pollIdToDelete);
    });

    // Add more tests for other controller methods
});
