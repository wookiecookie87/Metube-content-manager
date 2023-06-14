import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { classGroup } from "@/utils/classGroup";
import { ClassGroup } from "@/types";

interface classSelectProps {
  onClassify: Function;
}

const videoClassGroups: ClassGroup[] = classGroup;

export default function ClassifySelectForm(props: classSelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<ClassGroup[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedNames = event.target.value as string[];
    const selectedGroups = videoClassGroups.filter((group) =>
      selectedNames.includes(group.name)
    );
    setSelectedOptions(selectedGroups);
  };

  const options: string[] = videoClassGroups.map((group) => group.name);

  const handleSubmit = () => {
    props.onClassify(selectedOptions);
  };

  return (
    <>
      <FormControl fullWidth sx={{ marginTop: "20px" }}>
        <InputLabel id="demo-multiple-chip-label">Choose Classes</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          label="Select classes"
          multiple
          value={selectedOptions.map((option) => option.name)}
          onChange={handleChange}
          renderValue={(selected) => (
            <div>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
          sx={{ width: "100%" }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: "15px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
}
