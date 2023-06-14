"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import moment from "moment";
import { SearchedVideo, Video } from "@/types";

interface SearchedVideoProps {
  video: SearchedVideo;
}

export default function SearchedVideoCard(props: SearchedVideoProps) {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFileName, setVideoFileName] = useState("");
  const playerRef = useRef<ReactPlayer>(null);
  const { video } = props;

  const fetchVideoInfo = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${video.video_id}`,
      { cache: "no-store" }
    );
    const videoData = await response.json();
    console.log(videoData);
    setVideoUrl(videoData.result.video_url);
    setVideoFileName(videoData.result.file_name);
    console.log(moment.duration(video.start, "seconds"));
    console.log(moment.duration(video.end, "seconds"));
  };

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

  const onReady = React.useCallback(() => {
    if (open && playerRef.current) {
      const timeToStart = video.start;
      playerRef.current.seekTo(timeToStart, "seconds");
    }
  }, [open]);

  return (
    <div>
      <Card onClick={handleOpen}>
        <CardActionArea>
          <Box sx={{ position: "relative", paddingTop: "100%" }}>
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
              image={video.thumbnail_url}
              title={`Updated at`}
            />
          </Box>
          <Box sx={{ position: "absolute", bottom: 10, left: 10 }}>
            <Typography variant="body1" color="black">
              confidence: {video.confidence}
            </Typography>
            <Typography variant="body1" color="black">
              score: {video.score}
            </Typography>
            <Typography variant="body1" color="black">
              type:{" "}
              {video.metadata
                .map((data: { type: string }) => data.type)
                .join(", ")}
            </Typography>
            {/* <Typography key={index} variant="body2" color="white">
                Type: {module.type}
              </Typography> */}
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
            url={videoUrl}
            controls
            playing={open}
            ref={playerRef}
            onReady={onReady}
          />
          <Typography variant="body1" color="black" sx={{ marginTop: "10px" }}>
            {videoFileName}
          </Typography>
          <Typography variant="body1" color="black">
            starts : {moment.utc(video.start * 1000).format("HH:mm:ss")}
          </Typography>
          <Typography variant="body1" color="black">
            ends : {moment.utc(video.end * 1000).format("HH:mm:ss")}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
