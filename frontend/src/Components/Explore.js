import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import "../Stylings/Profile.css";
import PastJobs from "./PastJobs";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const Explore = () => {
    const [ageRange, setAgeRange] = useState([18, 80]);
    const [tags, setTags] = useState({
        Medical: false,
        FireFighter: false,
        Police: false,
        Military: false,
    });
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

    const handleTagChange = (tagName) => {
        setTags((prevTags) => ({
            ...prevTags,
            [tagName]: !prevTags[tagName],
        }));
    };

    const filterProfiles = () => {
        return profiles.filter(
            (profile) =>
                profile.age >= ageRange[0] &&
                profile.age <= ageRange[1] &&
                Object.entries(tags).every(([tag, isSelected]) =>
                    isSelected ? profile.tags.includes(tag) : true
                )
        );
    };

    const UserProfile = ({ profile }) => {
        return (
            <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center', borderBottom: '1px solid gray' }}>
                <div style={{ flex: '50%', paddingRight: '20px', textAlign: 'center' }}>
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'inline-block',
                            marginBottom: '10px',
                            verticalAlign: 'middle',
                        }}
                    >
                        <img
                            src={profile.image}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <h2>{profile.firstName} {profile.lastName}</h2>
                    <p style={{ margin: '-2px' }}><strong>Location:</strong> {profile.location}</p>
                    <p style={{ margin: '5px' }}><strong>Age:</strong> {profile.age}</p>
                    <p style={{ margin: '5px' }}><strong>Height:</strong> {profile.height}</p>
                    <p style={{ margin: '5px' }}><strong>Weight:</strong> {profile.weight}</p>
                    <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
                        {profile.tags.map((tag, index) => (
                            <span key={index} className="profile-tag" style={{ margin: '2px' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div style={{ flex: '50%', paddingLeft: '20px' }}>
                    <PastJobs jobs={profile.jobs} />
                </div>
            </div>
        );
    };

    return (
        <div style={{ border: '1px solid black', padding: '1em', borderRadius: '5px', width: '80%', margin: '1em auto' }}>
            <div style={{ height: "80vh",display: 'flex', flexDirection: 'row', borderRight: '1px solid gray' }}>
                <div style={{height: '80vh', flex: '30%', padding: '1em', borderRight: '1px solid gray' }}>
                    <h2><strong>Preferences</strong></h2>
                    <h4 style={{marginTop: '60px'}}>Tags:</h4>
                    <FormGroup>
                        {Object.entries(tags).map(([tag, isSelected]) => (
                            <FormControlLabel
                                key={tag}
                                control={
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={() => handleTagChange(tag)}
                                        color="primary" 
                                    />
                                }
                                label={tag}
                                style={{ margin: '0px', display: 'block' }}
                            />
                        ))}
                    </FormGroup>
                    <h4 style={{marginTop: '60px'}} >Age: {ageRange[0]} - {ageRange[1]}</h4>
                    <Slider
                        value={ageRange}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </div>

                <div style={{ flex: '70%', padding: '1em', overflowY: 'auto', maxHeight: '80vh' }}>
                    {filterProfiles().map((profile, index) => (
                        <UserProfile key={index} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explore;
