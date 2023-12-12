import React, { useState, useEffect } from "react";
import PastJobs from "./PastJobs";
import "../Stylings/Profile.css";
import axios from "axios";
import { TextField, Box, Select, InputBase, Chip, MenuItem } from "@mui/material";

const initialProfile = {
	firstName: "Jerry",
	lastName: "Wang",
	location: "Richmond, VA",
	age: 25,
	height: "5'1\"",
	weight: "190 lbs",
	bio: "Ex-Marine, Volunteer Firefighter",
	image: "/firefighter.jpg",
	tags: ["Military", "FireFighter"],
	jobs: [
		{ title: "Firefighter", year: "2018 - 2022", description: "Worked at the Springfield Fire Department" },
		{ title: "Paramedic", year: "2015 - 2018", description: "Served as a paramedic in the Springfield region" },
	],
};

const UserProfile = (props) => {
	const [profile, setProfile] = useState(initialProfile);
	const [editMode, setEditMode] = useState(false);

	const tagValues = ["Medical", "FireFighter", "Police", "Military"];

	useEffect(() => {
		console.log(props);
		axios.get("http://localhost:3000/db/profile/" + props.user.profile).then((res) => {
			setProfile(res.data);
		});
	}, []);

	const userJobs = [
		{
			title: "Firefighter",
			year: "2018 - 2022",
			description: "Worked at the Springfield Fire Department",
			image: "powerPlant.jpeg",
		},
		{
			title: "Paramedic",
			year: "2015 - 2018",
			description: "Served as a paramedic in the Springfield region",
			image: "firefighter.jpg",
		},
	];

	const handleAddJob = () => {
		// Logic to add a new job
		console.log("Add new job logic here");
	};

	const saveProfile = () => {
		const url = `http://localhost:3000/db/profile/update/${props.user.profile}`;
		axios
			.post(url, profile)
			.then((response) => {
				console.log("Profile updated", response.data);
			})
			.catch((error) => {
				console.error("Error updating profile", error);
			});
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<div className="profile">
				<div className="profile-image">
					<img src={profile.image} alt={`${profile.firstName} ${profile.lastName}`} />
				</div>
				<div className="profile-info">
					{editMode ? (
						<Box>
							<TextField
								sx={{ m: 1 }}
								label="First Name"
								value={profile.firstName}
								onChange={(e) => {
									let temp = { ...profile };
									temp.firstName = e.target.value;
									setProfile(temp);
								}}
							></TextField>
							<TextField
								sx={{ m: 1 }}
								label="Last Name"
								value={profile.lastName}
								onChange={(e) => {
									let temp = { ...profile };
									temp.lastName = e.target.value;
									setProfile(temp);
								}}
							></TextField>
						</Box>
					) : (
						<h2>{`${profile.firstName} ${profile.lastName}`}</h2>
					)}
					{editMode ? (
						<TextField
							sx={{ m: 1 }}
							label="Location"
							value={profile.location}
							onChange={(e) => {
								let temp = { ...profile };
								temp.location = e.target.value;
								setProfile(temp);
							}}
						></TextField>
					) : (
						<p>{profile.location}</p>
					)}
					{editMode ? (
						<TextField
							sx={{ m: 1 }}
							label="Age"
							value={profile.age}
							onChange={(e) => {
								let temp = { ...profile };
								temp.age = e.target.value;
								setProfile(temp);
							}}
						></TextField>
					) : (
						<p>{`${profile.age} Years Old`}</p>
					)}
					{editMode ? (
						<Box>
							<TextField
								sx={{ m: 1 }}
								label="Height"
								value={profile.height}
								onChange={(e) => {
									let temp = { ...profile };
									temp.height = e.target.value;
									setProfile(temp);
								}}
							></TextField>

							<TextField
								sx={{ m: 1 }}
								label="Weight"
								value={profile.weight}
								onChange={(e) => {
									let temp = { ...profile };
									temp.weight = e.target.value;
									setProfile(temp);
								}}
							></TextField>
						</Box>
					) : (
						<p>{`${profile.height}, ${profile.weight}`}</p>
					)}
					{editMode ? (
						<TextField
							multiline
							value={profile.bio}
							label="bio"
							sx={{ m: 1 }}
							onChange={(e) => {
								let temp = { ...profile };
								temp.bio = e.target.value;
								setProfile(temp);
							}}
						></TextField>
					) : (
						<p>{profile.bio}</p>
					)}
				</div>
				{!editMode ? (
					<div className="profile-tags">
						{profile.tags.map((tag, index) => (
							<span key={index} className="profile-tag">
								{tag}
							</span>
						))}
					</div>
				) : (
					<Select
						label="Tags"
						multiple
						value={profile.tags}
						onChange={(e) => {
							const {
								target: { value },
							} = e;
							let temp = { ...profile };
							temp.tags = typeof value === "string" ? value.split(",") : value;
							setProfile(temp);
						}}
						input={
							<InputBase
								sx={{
									"& fieldset": { border: "none" },
									marginLeft: "1rem",
									backgroundColor: "white",
									p: "2px 4px",
									borderRadius: "4px",
									boxShadow: 1,
								}}
							></InputBase>
						}
					>
						{tagValues.map((val) => (
							<MenuItem key={val} value={val}>
								{val}
							</MenuItem>
						))}
					</Select>
				)}

				<div className="profile-jobs">
					<PastJobs jobs={profile.jobs} onAddJob={handleAddJob} />
				</div>
				{editMode ? (
					<button
						onClick={() => {
							saveProfile();
							setEditMode(!editMode);
						}}
					>
						Save Profile
					</button>
				) : (
					<button
						onClick={() => {
							setEditMode(!editMode);
						}}
					>
						Edit Profile
					</button>
				)}
			</div>
		</Box>
	);
};

export default UserProfile;
