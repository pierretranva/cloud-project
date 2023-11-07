import React, { useRef, useState, useEffect } from "react";
import { Map, FullscreenControl, Popup, Marker } from "react-map-gl";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { TextField, Typography } from "@mui/material";

const tempJob = {
	image: "/firefighter.jpg",
	title: "Power Plant Explosion",
	location: "Richmond",
	dangerLevel: "HIGH",
	description: "This place is very dangerous i need alot of firefighters now",
};

const MapPage = () => {
	const mapRef = useRef(null);
	const [urgency, setUrgency] = useState(["low", "medium", "high"]);
	const [markers, setMarkers] = useState();
	const [currentJob, setCurrentJob] = useState(tempJob);
	const [showPopup, setShowPopup] = useState(true);

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
	function getGeocode() {
		fetch("https://geocode.maps.co/search?q={address}")
			.then((res) => res.json())
			.then((json) => {
				// myMap.flyTo({center:[FILL,LATER]})
				// mapRef.current?.flyTo({ center: [83, 23] })
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
					minHeight: window.innerHeight * 0.85,
					marginTop: "2%",
				}}
			>
				<Paper elevation={4} sx={{ width: "60%", marginLeft: "10" }}>
					<Box sx={{ position: "absolute", zIndex: 1, marginTop: 2, marginLeft: 2 }}>
						<TextField
							id="outlined-uncontrolled"
							label="Search CrisLine.org"
							defaultValue="foo"
							InputLabelProps={{
								style: { fontSize: 13 },
							}}
							sx={{ backgroundColor: "white", borderRadius: 4, "& fieldset": { border: "none" } }}
						/>
						<Select
							multiple
							value={urgency}
							onChange={handleChange}
							input={<OutlinedInput sx={{ "& fieldset": { border: "none" } }} />}
							renderValue={(urgency) => {
								return (
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
										{urgency.length !== 0 ? (
											urgency.map((value) => <Chip sx={{ color: "black" }} key={value} label={value} />)
										) : (
											<Chip key="urgency" label={"asdfsdf"} />
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
							zoom: 14,
						}}
						mapStyle="mapbox://styles/pierretranva/clomgll9q006u01qndjaoa9w8"
					>
						{/* <Popup longitude={-80.41339397242855} latitude={37.22727240884507}>
							<Box> You are here</Box>
						</Popup> */}
						<Marker longitude={-80.421} latitude={37.227} anchor="bottom">
							<img height="25" src="./pin.png" />
						</Marker>
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
							component="a"
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
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<img style={{ borderRadius: "1rem", margin: "1rem" }} src={currentJob.image} height={300}></img>
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
						<Box>
							<Typography variant="body1">{currentJob.description}</Typography>
						</Box>
					</Box>
				</Paper>
			</Box>
		</>
	);
};
export default MapPage;
