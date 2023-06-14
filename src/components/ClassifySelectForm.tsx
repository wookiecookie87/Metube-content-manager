import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
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
    console.log(selectedOptions, "Dfdf");
  };

  const options: string[] = videoClassGroups.map((group) => group.name);
  const handleSubmit = () => {
    props.onClassify(selectedOptions);
    console.log("Submitted", selectedOptions);
  };

  return (
    <>
      <FormControl fullWidth>
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
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}
