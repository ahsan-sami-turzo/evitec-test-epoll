// src/components/AddPoll.js
import React, { useState } from 'react';

const AddPoll = ({ onAddPoll }) => {
    const [newPoll, setNewPoll] = useState({ title: '', options: ['', ''] });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPoll(newPoll);
        setNewPoll({ title: '', options: ['', ''] });
    };

    return (
        <div>
            <h1>Create a New Poll</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={newPoll.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Options</label>
                    {newPoll.options.map((option, index) => (
                        <div key={index} className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(event) => handleOptionChange(index, event)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary" onClick={handleAddOption}>
                        Add Option
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">Create Poll</button>
            </form>
        </div>
    );
};

export default AddPoll;
