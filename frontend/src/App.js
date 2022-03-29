import React from "react";
import { useReducer, useEffect, useState, useContext } from "react";
import apiClient from "./requests/client";
import { useQuery } from "react-query";
import { queryContext } from "./contexts/context";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const App = () => {
  const {changeTags, state, changeAcceptance, changeDifficulty, changePaid, clearAll} = useContext(queryContext);
  const [tags, setTags] = useState(null);
  const [items, setItems] = useState(null);
  console.log(state);
  console.log(items);
  const { refetch: refetchQuery, data } = useQuery(
    ["leetcode", state],
    async () => {
      return await apiClient.get("/questions?page=23");
    },
    {
      onSuccess: (res) => {
        setItems(res.data);
      },
      onError: (err) => {
        const error = err.response?.data || err;
        console.log(error);
      },
    }
  );
  const tagQuery = useQuery('tags', 
    async () => {
      return await apiClient.get("/tags");
    }, {
      onSuccess: (res) => {
        setTags(res.data.tags.sort((a, b) => a < b ? -1 : a > b ? 1 : 0));
      }
    })
  const handleChangeTags = (event) => {
    changeTags(event.target.value)
  };
  const handleChangeAcceptance = (event) => {
    changeAcceptance(event.target.value)
  };
  const handleChangeDifficulty = (event) => {
    changeDifficulty(event.target.value)
  };
  const handleChangePaid = (event) => {
    changePaid(event.target.value)
  };
  if (!tags) {
    return (<div></div>)
  }
  return (
    <div>
     <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={state.tags}
          onChange={handleChangeTags}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {tags.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={state.tags.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography gutterBottom>Acceptance</Typography>
      <Box sx={{ width: 300 }}>
        <Slider
            aria-label="Always visible"
            defaultValue={0}
            step={1}
            onChange={handleChangeAcceptance}
            valueLabelDisplay="auto"
          />
      </Box>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state.difficulty}
          label="Difficulty"
          onChange={handleChangeDifficulty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Easy"}>Easy</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hard"}>Hard</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Paid</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state.paid}
          label="Paid"
          onChange={handleChangePaid}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={"true"}>Free</MenuItem>
          <MenuItem value={"false"}>Premium</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={() => clearAll()}>Clear</Button>
    </div>
  )
}
export default App;
