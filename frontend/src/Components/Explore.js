import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import UserProfile from './Profile';

const profiles = [
    {
        firstName: 'Jerry',
        lastName: 'Wang',
        age: 25,
        tags: ['Military', 'FireFighter'],
    },
];

const Explore = () => {
    const [ageRange, setAgeRange] = useState([18, 80]);
    const [tags, setTags] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([profiles]); // initially all profiles

    const handleSliderChange = (event, newValue) => {
        setAgeRange(newValue);
        filterProfiles();
    };

    const handleTagChange = (event) => {
        const newTags = event.target.value.split(',').map(tag => tag.trim());
        setTags(newTags);
        filterProfiles();
    };

    const filterProfiles = () => {
        setFilteredProfiles(
            profiles.filter(profile => 
                profile.age >= ageRange[0] && profile.age <= ageRange[1] &&
                tags.every(tag => profile.tags.includes(tag))
            )
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
                        {filteredProfiles.map((profile, index) => (
                            <UserProfile key={index} profile={profile} />
                        ))}
                    </div>
                    
                </div>
            </div>
        );
    };
    
    export default Explore;
    