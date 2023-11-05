import React from 'react';
import '../Stylings/PastJobs.css'

const PastJobs = ({ jobs, onAddJob }) => {
    if (!jobs || jobs.length === 0) {
        return <p>No past jobs to display.</p>;
    }

    return (
        <div className="past-jobs-container">
            <div className="past-jobs-header">
                <h3>Past Jobs</h3>
                <button className="add-job-btn" onClick={onAddJob}>+</button>
            </div>
            <div className="past-jobs-list">
                <ul>
                    {jobs.map((job, index) => (
                        <li key={index}>
                            <img src={job.image} alt={job.title} />
                            <div>
                                <strong>{job.title}</strong>
                                <p>{job.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default PastJobs;
