import React, { useState } from 'react';
import PastJobs from './PastJobs';
import '../Stylings/Profile.css';

const initialProfile = {
    firstName: 'Jerry',
    lastName: 'Wang',
    location: 'Richmond, VA',
    age: 25,
    height: "5'1\"",
    weight: '190 lbs',
    bio: 'Ex-Marine, Volunteer Firefighter',
    image: '/firefighter.jpg',
    tags: ['Military', 'FireFighter'],
    jobs: [
        { title: "Firefighter", year: "2018 - 2022", description: "Worked at the Springfield Fire Department" },
        { title: "Paramedic", year: "2015 - 2018", description: "Served as a paramedic in the Springfield region" },
    ]
};

const UserProfile = ({}) => {
    const [profile, setProfile] = useState(initialProfile);


    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const userJobs = [
        { title: "Firefighter", year: "2018 - 2022", description: "Worked at the Springfield Fire Department" },
        { title: "Paramedic", year: "2015 - 2018", description: "Served as a paramedic in the Springfield region" },
    ];

    const handleAddJob = () => {
        // Logic to add a new job
        console.log('Add new job logic here');
    };

    const saveProfile = () => {
        console.log('Profile saved', profile);
    };

    return (
        <div className="profile">
            <div className="profile-image">
                <img src={profile.image} alt={`${profile.firstName} ${profile.lastName}`} />
            </div>
            <div className="profile-info">
                <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                <p>{profile.location}</p>
                <p>{`${profile.age} Years Old`}</p>
                <p>{`${profile.height}, ${profile.weight}`}</p>
                <p>{profile.bio}</p>
            </div>
            <div className="profile-tags">
                {profile.tags.map((tag, index) => (
                    <span key={index} className="profile-tag">{tag}</span>
                ))}
            </div>

            <div className="profile-jobs">
                <PastJobs jobs={userJobs} onAddJob={handleAddJob} />
            </div>

            <button onClick={saveProfile}>Save Profile</button>
        </div>
    );
};

export default UserProfile;
