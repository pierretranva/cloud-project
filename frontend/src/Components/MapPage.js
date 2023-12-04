import React, { useRef, useState, useEffect } from "react";
import { Map, FullscreenControl, Popup, Marker } from "react-map-gl";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { TextField, Typography, Button, Chip, Select, MenuItem, IconButton, FilledInput } from "@mui/material";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import sha256 from 'crypto-js/sha256'

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
	date: "11/20/23",
	contact:
		"Register on the Community Crisis Aid Network to respond to this emergency call. Your help is vital in navigating through this crisis!",
};

const tempMarkers = [
	{ latitude: 90, longitude: 90 },
	{ latitude: 10, longitude: 10 },
	{ latitude: -10, longitude: 33 },
	{ latitude: -70, longitude: -40 },
	{ latitude: 37.227, longitude: -80.421 },
	{ latitude: 37.227, longitude: -77.421 },
	{ latitude: 37.227, longitude: -78.421 },
	{ latitude: 38.227, longitude: -79 },
];

const MapPage = () => {
	const mapRef = useRef(null);
	const [urgency, setUrgency] = useState(["low", "medium", "high"]);
	const [markers, setMarkers] = useState(tempMarkers);
	const [currentJob, setCurrentJob] = useState(tempJob);
	const [searchBox, setSearchBox] = useState("");

	const urgencyValues = ["low", "medium", "high"];

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
                if(json.length != 0){
				mapRef.current.fitBounds([
					[json[0].boundingbox[2], json[0].boundingbox[0]],
					[json[0].boundingbox[3], json[0].boundingbox[1]],
				]);
            }
				// mapRef.current.flyTo({center:[json[0].lon,json[0].lat]})
			});
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
						<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
							<IconButton sx={{ p: "10px" }} aria-label="menu">
								<MenuIcon />
							</IconButton>
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
						// mapStyle="mapbox://styles/pierretranva/clomgll9q006u01qndjaoa9w8" //monochrome
						mapStyle="mapbox://styles/pierretranva/clonwj13o00a101qq9abf5vye" //street
						// mapStyle="mapbox://styles/pierretranva/clonwkk3o009o01qo1nolcv7z" //outdoors
					>
						{/* <Popup longitude={-80.41339397242855} latitude={37.22727240884507}>
							<Box> You are here</Box>
						</Popup> */}
						{markers.map((e, index) => {
							return (
								<Marker
									onClick={() => {
										console.log("HI");
									}}
									key={index}
									latitude={e.latitude}
									longitude={e.longitude}
									anchor="bottom"
								>
									<img height="30" src="./pin1.png" />
								</Marker>
							);
						})}
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
							Details
						</Typography>
					</Paper>

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
						<Box sx={{ display: "flex", justifyContent: "space-evenly", width: 1 }}>
							<Box>
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
						<Box sx={{ padding: "1rem" }}>
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
				</Paper>
			</Box>
		</>
	);
};
export default MapPage;
