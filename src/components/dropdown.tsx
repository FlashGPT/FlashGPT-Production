import React, { useState, useRef } from "react";
import { Select, MenuItem } from "@mui/material";

type Props = {
  arr: any[];
  setArr: Function;
};

type Inputs = {
  categoryName: string;
  categoryDescription: string;
};

function Dropdown(props: Props) {
  const [color, setColor] = useState("");
  const primaryRef = useRef<HTMLSelectElement>(null);

  const handleChange = (event: any) => {
    event.preventDefault();
    setColor(event.target?.value);
    console.log(event.target?.value);
    props.setArr(event.target.value);
  };

  return (
    <Select
      value={color}
      ref={primaryRef}
      onChange={handleChange}
      defaultValue="all"
      sx={{
        marginTop: 0,
        width: 250,
        height: 50,
      }}
    >
      <MenuItem value="all">All</MenuItem>
      {props.arr.map((item, key) => {
        return (
          <MenuItem value={item} key={key}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default Dropdown;
