"use client";

import * as React from "react";
import ReactPlayer from "react-player";

export interface IAppProps {
  url: string;
}

export default function VideoPlayer(props: IAppProps) {
  return (
    <div>
      <ReactPlayer url={props.url} controls />
    </div>
  );
}
