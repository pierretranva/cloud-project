import React, { useRef, useState, useEffect } from "react";
import { Map, FullscreenControl, Popup, Marker } from "react-map-gl";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
	TextField,
	Typography,
	Button,
	Chip,
	Select,
	MenuItem,
	IconButton,
	FilledInput,
	Fab,
	Tooltip,
	FormControl,
	InputLabel,
} from "@mui/material";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

const tempJob = {
	image: "/powerPlant.jpeg",
	title: "Power Plant Explosion",
	location: "Richmond",
	dangerLevel: "HIGH",
	description:
		"Following a factory explosion in Richmond, VA, volunteers are urgently needed to control fires and clear rubble once safe.",
	roles: [
		{ title: "Fire Extinguishing Crew", description: "Immediate assistance needed; basic training provided on-site." },
		{
			title: "Rubble Clearance Team",
			description: "Assistance needed starting tomorrow at 8:00 AM; equipment provided.",
		},
	],
	date: "11-10-2023",
	contact:
		"Register on the Community Crisis Aid Network to respond to this emergency call. Your help is vital in navigating through this crisis!",
	coordinates: { latitude: 37.227, longitude: -77.421 },
};

const jobTemplate = {
	image: "/powerPlant.jpeg",
	title: "",
	location: "",
	dangerLevel: "HIGH",
	description: "",
	roles: [{ title: "", description: "" }],
	date: "",
	contact: "",
	coordinates: { latitude: 0, longitude: 0 },
};

const MapPage = ( props) => {
	const mapRef = useRef(null);
	const [urgency, setUrgency] = useState(["low", "medium", "high"]);
	const [allJobs, setAllJobs] = useState([]);
	const [currentJob, setCurrentJob] = useState(null);
	const [searchBox, setSearchBox] = useState("");
	const [addJobMode, setAddJobMode] = useState(false);
	const [newJob, setNewJob] = useState(jobTemplate);
    const [newJobError, setNewJobError] = useState();

	const urgencyValues = ["low", "medium", "high"];

    useEffect(() =>{
            axios.get("http://localhost:3000/db/jobs").then((res) =>{
                console.log(res.data)
                setAllJobs(res.data)
            })
            console.log(props.user)

    },[])
	function handleChange(e) {
		const {
			target: { value },
		} = e;
		setUrgency(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	}

	function handleSearch() {
		getGeocode();
	}
	function getGeocode() {
		fetch("https://geocode.maps.co/search?q={" + searchBox + "}")
			.then((res) => res.json())
			.then((json) => {
				if (json.length !== 0) {
					mapRef.current.fitBounds([
						[json[0].boundingbox[2], json[0].boundingbox[0]],
						[json[0].boundingbox[3], json[0].boundingbox[1]],
					]);
				}
				// mapRef.current.flyTo({center:[json[0].lon,json[0].lat]})
			});
	}
	function onSubmit() {
		if (newJob.coordinates.latitude === 0 && newJob.coordinates.longitude === 0) {
			console.log("Please input a location");
		}
        else{
		fetch("https://geocode.maps.co/reverse?lat=" + newJob.coordinates.latitude + "&lon=" + newJob.coordinates.longitude)
			.then((res) => res.json())
			.then((json) => {
                if(Object.keys(json.address).includes('city'))
                {
                    return json.address.city
                }
                else if(Object.keys(json.address).includes('county'))
                {
                    return json.address.county
                }
                else if(Object.keys(json.address).includes('hamlet')){
                    return json.address.hamlet
                }
                else{
                    return json.display_name;  
                }
			})
			.then((display_name) => {
				let temp = { ...newJob };
				temp.location = display_name;
				setNewJob(temp);
				axios.post("http://localhost:3000/db/jobs/create", temp).then((res) => {
                    console.log(res.data)
                    setAllJobs(res.data)
				});
                setAddJobMode(false)
                setNewJob(jobTemplate)
			})
        
        }
            
	}
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					alignItems: "stretch",
					height: window.innerHeight * 0.85,
					marginTop: "2%",
				}}
			>
				<Paper elevation={4} sx={{ width: "60%", marginLeft: "10" }}>
					<Box sx={{ position: "absolute", zIndex: 1, marginTop: 2, marginLeft: 2, display: "flex", height: "3rem" }}>
						{/* <TextField
							id="outlined-uncontrolled"
							label="Search CrisLine.org"
							defaultValue="Virginia"
							InputLabelProps={{
								style: { fontSize: 13 },
							}}
							sx={{ backgroundColor: "white", borderRadius: 4, "& fieldset": { border: "none" } }}
                            onChange={(e)=>{console.log(e.target.value)}}
						><IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                      </IconButton></TextField> */}
						{props.user && <Tooltip title="Add New Job">
							<Fab
								size="medium"
								aria-label="add"
								onClick={() => {
									setAddJobMode(true);
									setCurrentJob(null);
								}}
								sx={{ mr: "1rem", backgroundColor: "red", mt: -0.5 }}
							>
								<AddIcon />
							</Fab>
						</Tooltip>}
						<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Search CrisLine Map"
								value={searchBox}
								inputProps={{ "aria-label": "search CrisLine Map" }}
								onChange={(e) => {
									setSearchBox(e.target.value);
								}}
								onKeyDown={(ev) => {
									if (ev.key === "Enter") {
										handleSearch();
										ev.preventDefault();
									}
								}}
							/>
							<IconButton
								onClick={() => {
									handleSearch();
								}}
								type="button"
								sx={{ p: "10px" }}
								aria-label="search"
							>
								<SearchIcon />
							</IconButton>
						</Paper>
						<Select
							multiple
							value={urgency}
							onChange={handleChange}
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
							renderValue={(urgency) => {
								return (
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
										{urgency.length !== 0 ? (
											urgency.map((value) => <Chip key={value} label={value} />)
										) : (
											<Chip key="urgency" label="Click one" />
										)}
									</Box>
								);
							}}
						>
							{urgencyValues.map((val) => (
								<MenuItem key={val} value={val}>
									{val}
								</MenuItem>
							))}
						</Select>
					</Box>
					<Map
						ref={mapRef}
						mapboxAccessToken="pk.eyJ1IjoicGllcnJldHJhbnZhIiwiYSI6ImNsb21hc2EwdzBxdzAya29hOW93ODdvZzAifQ.sEo9dei56DzcmmuKrCPd0Q"
						initialViewState={{
							latitude: 37.227,
							longitude: -80.421,
							zoom: 6,
						}}
						cursor={addJobMode ? "crosshair" : "auto"}
						// mapStyle="mapbox://styles/pierretranva/clomgll9q006u01qndjaoa9w8" //monochrome
						mapStyle="mapbox://styles/pierretranva/clonwj13o00a101qq9abf5vye" //street
						// mapStyle="mapbox://styles/pierretranva/clonwkk3o009o01qo1nolcv7z" //outdoors
						onClick={(e) => {
							if (addJobMode) {
								let tempJob = { ...newJob };
								tempJob.coordinates = { longitude: e.lngLat.lng, latitude: e.lngLat.lat };
								setNewJob(tempJob);
							}
						}}
					>
						{/* <Popup longitude={-80.41339397242855} latitude={37.22727240884507}>
							<Box> You are here</Box>
						</Popup> */}
						{allJobs.map((job, index) => {
                            console.log("hi")
							if (urgency.includes(job.dangerLevel.toLocaleLowerCase())) {
								return (
									<Marker
										onClick={() => {
											if (!addJobMode) {
												setCurrentJob(job);
											}
										}}
										key={index}
										latitude={job.coordinates.latitude}
										longitude={job.coordinates.longitude}
										anchor="bottom"
									>
										<img height="30" src="./pin1.png" />
									</Marker>
								);
							}
						})}
						{addJobMode && (
							<Marker latitude={newJob.coordinates.latitude} longitude={newJob.coordinates.longitude} anchor="bottom">
								<img height="40" src="./pin.png" />
							</Marker>
						)}
					</Map>
				</Paper>
				<Paper elevation={4} sx={{ width: "30%", display: "flex", flexDirection: "column" }}>
					<Paper
						elevation={4}
						sx={{ display: "flex", backgroundColor: "red", padding: 1, justifyContent: "center", borderRadius: 2 }}
					>
						<Typography
							variant="h4"
							noWrap
							sx={{
								fontFamily: "monospace",
								fontWeight: 700,
								color: "white",
								textDecoration: "none",
							}}
						>
							{addJobMode ? <>Create Job</> : <>Details</>}
						</Typography>
					</Paper>

					{currentJob && (
						<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
							<img style={{ borderRadius: "1rem", margin: "1rem" }} src={currentJob.image} height={200}></img>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 700,
									color: "black",
								}}
							>
								{currentJob.title}
							</Typography>
							<Box sx={{ display: "flex", justifyContent: "space-evenly", minWidth: "100%" }}>
								<Box >
									<Typography variant="caption">Location: {currentJob.location}</Typography>
								</Box>
								<Box>
									<Typography variant="caption">Danger Level: {currentJob.dangerLevel}</Typography>
								</Box>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Button
									variant="contained"
									color="success"
									sx={{ marginTop: "0.5rem", marginBottom: "-1rem", color: "white" }}
								>
									<Typography>JOIN</Typography>
								</Button>
							</Box>
							<Box sx={{ mr:'auto',display: 'flex', flexDirection: 'column',padding: "1rem", alignContent:"flex-start" }}>
								<Typography
									variant="body1"
									sx={{
										fontWeight: 700,
										color: "black",
									}}
								>
									Description:
								</Typography>
								<Typography variant="body2">{currentJob.description}</Typography>
								<Typography
									variant="body1"
									sx={{
										fontWeight: 700,
										color: "black",
									}}
								>
									Volunteer Roles:
								</Typography>
								<ol>
									{currentJob.roles.map((element, index) => {
										return (
											<li key={index}>
												<Typography variant="body2" sx={{ fontWeight: 700 }}>
													{element.title}
												</Typography>
												<Typography variant="body2">{element.description}</Typography>
											</li>
										);
									})}
								</ol>
								<Typography
									variant="body1"
									sx={{
										fontWeight: 700,
										color: "black",
									}}
								>
									Date: {currentJob.date}
								</Typography>
								<Typography
									variant="body1"
									sx={{
										color: "black",
									}}
								>
									<b>Contact: </b>
									{currentJob.contact}
								</Typography>
								<Typography variant="body1"></Typography>
							</Box>
						</Box>
					)}
					{props.user && addJobMode && (
						<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
							<img style={{ borderRadius: "1rem", margin: "1rem" }} src={newJob.image} height={200}></img>
							<Box sx={{ display: "flex", p: 2, m: 2 }}>
								<Button
									sx={{ mr: 1 }}
									color="error"
									variant="contained"
									onClick={() => {
										setAddJobMode(false)
                                        setNewJob(jobTemplate)
									}}
								>
									Cancel
								</Button>
								<Button
									sx={{ ml: 1 }}
									color="success"
									variant="contained"
									onClick={() => {
										onSubmit();
									}}
								>
									Submit
								</Button>
							</Box>
							<Box>
								<TextField label="latitude" value={newJob.coordinates.latitude} />
								<TextField label="longitude" value={newJob.coordinates.longitude} />
							</Box>
							<TextField
								sx={{ m: 1.5 }}
								label="title"
								value={newJob.title}
								onChange={(e) => {
									let temp = { ...newJob };
									temp.title = e.target.value;
									setNewJob(temp);
								}}
							/>
							<Box sx={{ display: "flex", marginLeft: -15 }}>
								<TextField
									sx={{ minWidth: "80%" }}
									type="date"
									value={newJob.date}
									onChange={(e) => {
										let temp = { ...newJob };
										temp.date = e.target.value;
										console.log(temp);
										setNewJob(temp);
									}}
								/>
								<FormControl sx={{ justifyContent: "center", minWidth: "80%" }}>
									<InputLabel>Danger Level</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={newJob.dangerLevel}
										label="Danger Level"
										onChange={(e) => {
											let temp = { ...newJob };
											temp.dangerLevel = e.target.value;
											setNewJob(temp);
										}}
									>
										<MenuItem value={"LOW"}>LOW</MenuItem>
										<MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
										<MenuItem value={"HIGH"}>HIGH</MenuItem>
									</Select>
								</FormControl>
							</Box>
							<TextField
								fullWidth
								multiline
								sx={{ m: 1.5, maxWidth: "90%" }}
								minRows={2}
								label="description"
								value={newJob.description}
								onChange={(e) => {
									let temp = { ...newJob };
									temp.description = e.target.value;
									setNewJob(temp);
								}}
							/>
							<TextField
								fullWidth
								multiline
								sx={{ m: 1.5, maxWidth: "90%" }}
								minRows={2}
								label="contact"
								value={newJob.contact}
								onChange={(e) => {
									let temp = { ...newJob };
									temp.contact = e.target.value;
									setNewJob(temp);
								}}
							/>
							<Box sx={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                                <Typography sx={{
								fontFamily: "monospace",
								fontWeight: 700,
								color: "black",
								textDecoration: "none",
							}}variant="subtitle2"> Volunteer Roles</Typography>
								{newJob.roles.map((item, i) => {
									return (
										<Box key={i} sx={{p:1, mt:1}}>
											<TextField
                                            sx={{maxWidth: "30%", mr: 1 }}
												label="title"
												value={item.title}
												onChange={(e) => {
													let temp = { ...newJob };
													temp.roles[i].title = e.target.value;
													setNewJob(temp);
												}}
											/>
											<TextField
                                             sx={{maxWidth: "80%"}}
												label="description"
												value={item.description}
												onChange={(e) => {
													let temp = { ...newJob };
													temp.roles[i].description = e.target.value;
													setNewJob(temp);
												}}
											/>
                                        <DeleteForeverIcon onClick={() =>{let temp = { ...newJob };
										temp.roles.splice(i,1);
										setNewJob(temp);}} sx={{ml: 2,mt: 2}} />
										</Box>
									);
								})}
                                <Button
                                sx={{maxWidth: '50%', mb:4,mt:2}}
                                variant="contained"
									onClick={() => {
										let temp = { ...newJob };
										temp.roles.push({ title: "", description: "" });
										setNewJob(temp);
									}}
								>
									Add New Role
								</Button>
							</Box>
						</Box>
					)}
				</Paper>
			</Box>
		</>
	);
};
export default MapPage;
