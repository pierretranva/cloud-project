import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import "../Stylings/Profile.css";

const Explore = () => {
    const [ageRange, setAgeRange] = useState([18, 80]);
    const [tags, setTags] = useState([]);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/db/profiles")
            .then((res) => {
                setProfiles(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSliderChange = (event, newValue) => {
        setAgeRange(newValue);
    };

    const handleTagChange = (event) => {
        const newTags = event.target.value.split(',').map(tag => tag.trim());
        setTags(newTags);
    };

    const filterProfiles = () => {
        return profiles.filter(profile =>
            profile.age >= ageRange[0] && profile.age <= ageRange[1] &&
            tags.every(tag => profile.tags.includes(tag))
        );
    };

    const UserProfile = ({ profile }) => {
        return (
            <div style={{ marginBottom: '20px', borderBottom: '1px solid gray', paddingBottom: '20px', textAlign: 'center' }}>
                <div
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'inline-block',
                        marginBottom: '10px',
                    }}
                >
                    <img
                        src={profile.image}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <h2>{profile.firstName} {profile.lastName}</h2>
                <p style={{ margin: '5px' }}>
                    <strong>Location:</strong> {profile.location}
                </p>
                <p style={{ margin: '5px' }}>
                    <strong>Age:</strong> {profile.age}
                </p>
                <p style={{ margin: '5px' }}>
                    <strong>Height:</strong> {profile.height}
                </p>
                <p style={{ margin: '5px' }}>
                    <strong>Weight:</strong> {profile.weight}
                </p>
                <div style={{ marginTop: '10px' }}>
                {profile.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="profile-tag"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            </div>
        );
    };

    return (
        <div style={{ border: '1px solid black', padding: '1em', borderRadius: '5px', width: '80%', margin: '1em auto' }}>
            <div style={{ display: 'flex', flexDirection: 'row', borderRight: '1px solid gray' }}>
                <div style={{ flex: '30%', padding: '1em', borderRight: '1px solid gray' }}>
                    <h2>Preferences</h2>
                    <label>
                        Tags: 
                        <input 
                            type="text" 
                            placeholder="e.g., Military, FireFighter" 
                            onChange={handleTagChange} 
                        />
                    </label>
                    <h3>Age: {ageRange[0]} - {ageRange[1]}</h3>
                    <Slider
                        value={ageRange}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </div>
    
                <div style={{ flex: '70%', padding: '1em', overflowY: 'auto', maxHeight: '400px' }}>
                    {filterProfiles().map((profile, index) => (
                        <UserProfile key={index} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;
