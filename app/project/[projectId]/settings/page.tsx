"use client";

import React from "react";
import {
	TextField,
	Button,
	Box,
	InputLabel,
	MenuItem,
	FormControl,
	Typography,
	Paper,
} from "@mui/material";

import Select from "@mui/material/Select";
import TextArea from "../components/TextArea/index";
import { useQuery } from "react-query";
import { get, post } from "@/utils/API/request";
import { useState } from "react";
import Loader from "@/app/components/Loader";

interface ProjectProps {
  params: {
    projectId: string;
  }; 
};

interface Details {
	title: string;
	description: string;
	chatEndpoint: string;
	primaryApiKey: string;
}

export default function Settings({params: {projectId}}: ProjectProps) {
  const [details, setDetails] = useState<Details>({
		title: "",
		description: "",
		chatEndpoint: "",
		primaryApiKey: "",
	});

  const getProject = async () => {
      const res = await get(`/admin/${projectId}`);
      setDetails({
				title: res.data.message.title,
				description: res.data.message.description,
				chatEndpoint: res.data.message.chatEndpoint,
				primaryApiKey: res.data.message.primaryApiKey,
			});
	  console.log(res.data.message);
  };

  let project = useQuery("project", getProject);

  const handleClick = async () => {
     const res = await post(`/admin/${projectId}/edit`, details);
	 return res.data.message;
  }

  const generateKey = async () => {
    const res = await get(`/admin/${projectId}/regenerate`);
	setDetails({...details, primaryApiKey: res.data.message.primaryApiKey});
  }

  if(project.isLoading) return <Loader/>

	return (
		<>
			<>
				<Box
					sx={{
						marginTop: "4rem",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						padding: "1rem",
					}}
				>
					<Paper
						sx={{
							width: "80%",
							padding: "1rem",
						}}
					>
						<Box>
							<Typography
								variant="h4"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									paddingTop: "1rem",
									fontWeight: "800",
								}}
							>
								Edit Project Settings
							</Typography>

							<Typography
								variant="body1"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
								}}
							>
								You can edit the project settings in this page
							</Typography>
						</Box>
						<Box>
							<Typography
								variant="body1"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									marginTop: "2rem",
									marginBottom: "1rem",
									fontWeight: "600",
								}}
							>
								Title
							</Typography>

							<TextField
								id="outlined-basic"
								label="Title"
								variant="outlined"
								value={details.title}
								onChange={(e) => {
									setDetails({ ...details, title: e.target.value });
								}}
								sx={{
									width: "95%",
									marginBottom: "1rem",
									marginLeft: "1rem",
								}}
							/>
						</Box>

						<Box>
							<Typography
								variant="body1"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									marginTop: "2rem",
									fontWeight: "600",
								}}
							>
								Project Description
							</Typography>

							<Typography
								variant="body2"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									paddingRight: "2rem",
									marginBottom: "1.5rem",
									fontWeight: "100",
								}}
							>
								Make sure that this text describes your project well. This is
								very crutial.
							</Typography>

							<TextField
								value={details.description}
								onChange={(e) => {
									setDetails({ ...details, description: e.target.value });
								}}
								label="Description"
								size="small"
								multiline
								maxRows={6}
								minRows={3}
								inputProps={{
									maxLength: 2000,
								}}
								
							/>
						</Box>

						<Box>
							<Typography
								variant="body1"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									marginTop: "2rem",
									marginBottom: "1rem",
									fontWeight: "600",
								}}
							>
								Chat End Point
							</Typography>

							<TextField
								id="outlined-basic"
								label="Title"
								variant="outlined"
								defaultValue={details.chatEndpoint}
								onChange={(e) => {
									setDetails({ ...details, chatEndpoint: e.target.value });
								}}
								sx={{
									width: "95%",
									marginBottom: "1rem",
									marginLeft: "1rem",
								}}
							/>
						</Box>

						<Box>
							<Button
								sx={{
									width: "20%",
									marginTop: "2rem",
									marginBottom: "1rem",
									marginLeft: "1rem",
									backgroundColor: "#1E3A8A",
									color: "white",
									fontWeight: 600,
									"&:hover": {
										backgroundColor: "rgba(30, 58, 138, 0.8)", // Change the color to your desired hover color
									},
								}}
								onClick={handleClick}
							>
								Save
							</Button>
						</Box>
					</Paper>
				</Box>

				<Box
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						padding: "1rem",
					}}
				>
					<Paper
						sx={{
							width: "80%",
							padding: "1rem",
						}}
					>
						<Box>
							<Typography
								variant="h4"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									paddingTop: "1rem",
									fontWeight: "800",
								}}
							>
								Generate API Key for Persista
							</Typography>

							<Typography
								variant="body1"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
								}}
							>
								Click on the generate button below to get a new API key for your
								project.
							</Typography>
						</Box>

						<Box>
							<Typography
								variant="body1"
								gutterBottom
								sx={{
									paddingLeft: "1rem",
									marginTop: "2rem",
									fontWeight: "600",
								}}
							>
								Your Current API Key
							</Typography>

							<TextField
								id="outlined-basic"
								label="Title"
								variant="outlined"
								value={details.primaryApiKey}
								disabled
								sx={{
									width: "95%",
									marginBottom: "1rem",
									marginLeft: "1rem",
								}}
							/>
						</Box>

						<Box>
							<Button
								sx={{
									width: "20%",
									marginTop: "2rem",
									marginBottom: "1rem",
									marginLeft: "1rem",
									backgroundColor: "#1E3A8A",
									color: "white",
									fontWeight: 600,
									"&:hover": {
										backgroundColor: "rgba(30, 58, 138, 0.8)", // Change the color to your desired hover color
									},
								}}
								onClick={generateKey}
							>
								Generate Key
							</Button>
						</Box>
					</Paper>
				</Box>
			</>
		</>
	);
}
