import React, { useState, useEffect } from 'react';
import PastJobs from './PastJobs';
import '../Stylings/Profile.css';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/db/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Profile fetch failed');
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                setError('Error fetching profile');
            }
        };

        fetchProfile();
    }, []);

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddJob = (newJob) => {
        // Add logic to add a new job
        setProfile(prevState => ({
            ...prevState,
            jobs: [...prevState.jobs, newJob]
        }));
    };

    const saveProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/db/profile/${profile._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            });
            const data = await response.json();
            console.log('Profile updated', data);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Loading profile...</div>;
    }

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
                <PastJobs jobs={profile.jobs} onAddJob={handleAddJob} />
            </div>

            <button onClick={saveProfile}>Save Profile</button>
        </div>
    );
};

export default UserProfile;
