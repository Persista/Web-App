"use client";

import { Box, Button, Container, IconButton, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { post } from "@/utils/API/request";
import API from "@/utils/API";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  let queryClient = useQueryClient();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [chatEndpoint, setChatEndpoint] = useState("");

  let newProjectMutation = useMutation({
    mutationFn: async () => {
      let res = await post(API.NEW_PROJECT, {
        title,
        description,
        chatEndpoint,
      });
      queryClient.setQueryData(["projects"], (old: any) => [...old, res.data.message]);
      onClose();
    },
  });

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setChatEndpoint("");
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} aria-label="new-project-modal">
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.default",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "500" }}>
            New Project
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            required
            disabled={newProjectMutation.isLoading}
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />
          <TextField
            required
            disabled={newProjectMutation.isLoading}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
          <TextField
            required
            disabled={newProjectMutation.isLoading}
            size="small"
            label="Chat Endpoint"
            value={chatEndpoint}
            onChange={(e) => setChatEndpoint(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 4,
            p: 1,
            gap: 2,
          }}
        >
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => newProjectMutation.mutate()} size="small" variant="contained" color="primary">
            Create Project
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
