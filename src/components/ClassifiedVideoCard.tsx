"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import { SearchedVideo, Video } from "@/types";
import Loading from "@/app/loading";

interface SearchedVideoProps {
  video_id: string;
  score: number;
}

export default function ClassifiedVideoCard(props: SearchedVideoProps) {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const playerRef = useRef<ReactPlayer>(null);
  const { video_id, score } = props;

  useEffect(() => {
    const fetchMediaData = async () => {
      await fetchVideoInfo();
    };

    fetchMediaData();
  }, []);

  async function fetchVideoInfo() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${video_id}`,
      { cache: "no-store" }
    );
    const videoData = await response.json();
    setVideoUrl(videoData.result.video_url);
    setThumbnailUrl(videoData.result.thumbnail_urls[0]);
  }

  const handleOpen = () => {
    fetchVideoInfo();
    setOpen(true);
  };

  const handleClose = () => {
    setVideoUrl("");
    setOpen(false);
  };

  useEffect(() => {
    if (!open && playerRef.current) {
      playerRef.current.seekTo(0);
    }
  }, [open]);

  return (
    <div>
      <Card onClick={handleOpen}>
        <CardActionArea>
          <Box sx={{ position: "relative", paddingTop: "90%" }}>
            {thumbnailUrl ? (
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
                image={thumbnailUrl}
                title={`Updated at`}
              />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: "35%",
                  bottom: 0,
                  left: "45%",
                  right: 0,
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
          <Box sx={{ position: "absolute", bottom: 10, left: 10 }}>
            <Typography variant="body1" color="black">
              Score: {score}
            </Typography>
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
          <ReactPlayer url={videoUrl} controls playing={open} ref={playerRef} />
        </Box>
      </Modal>
    </div>
  );
}
