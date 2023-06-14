"use client";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchFormProps {
  onSearch: Function;
}

export default function SearchForm(props: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState<string[]>([
    "visual",
    "conversation",
    "text_in_video",
  ]);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSearchOptions;
    if (event.target.checked) {
      newSearchOptions = [...searchOptions, event.target.name];
      setSearchOptions(newSearchOptions);
    } else {
      newSearchOptions = searchOptions.filter(
        (option) => option !== event.target.name
      );
      if (newSearchOptions.length === 0) {
        alert("You need a least one search option checked");
        return;
      }
      setSearchOptions(newSearchOptions);
    }
    searchQuery &&
      props.onSearch({ searchQuery, searchOptions: newSearchOptions });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (!searchQuery) {
        alert("Please type search text");
        return;
      }

      props.onSearch({ searchQuery, searchOptions });
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onKeyDown={handleKeyPress}
        sx={{ marginTop: "10px" }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={searchOptions.includes("visual")}
            onChange={handleCheckboxChange}
            name="visual"
          />
        }
        label="Visual"
        sx={{ width: "100%", marginTop: "20px" }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={searchOptions.includes("conversation")}
            onChange={handleCheckboxChange}
            name="conversation"
          />
        }
        label="Conversation"
        sx={{ width: "100%" }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={searchOptions.includes("text_in_video")}
            onChange={handleCheckboxChange}
            name="text_in_video"
          />
        }
        label="Text in Video"
        sx={{ width: "100%" }}
      />
    </>
  );
}
