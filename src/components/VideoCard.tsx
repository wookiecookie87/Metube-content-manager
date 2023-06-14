"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Card, CardActionArea, CardMedia, Modal } from "@mui/material";
import ReactPlayer from "react-player";
import { Video } from "@/types";

interface videoProps extends Video {}

export default function VideoCard(props: videoProps) {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!open && playerRef.current) {
      playerRef.current.seekTo(0);
    }
  }, [open]);

  return (
    <div>
      <Card onClick={handleOpen}>
        <CardActionArea>
          <Box sx={{ position: "relative", paddingTop: "60%" }}>
            <CardMedia
              component="img"
              alt="Thumbnail"
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              image={props.thumbnail_urls[0]}
              title={`Updated at`}
            />
          </Box>
        </CardActionArea>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="video-player"
        aria-describedby="play-video-in-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <ReactPlayer
            url={props.video_url}
            controls
            playing={open}
            ref={playerRef}
          />
        </Box>
      </Modal>
    </div>
  );
}
