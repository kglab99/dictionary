import React, { useState, useRef } from "react";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import Word from "./word";
import { Typography } from "@mui/joy";
import { handleChange, handleKeyDown } from "../utils/handlers"; // Import the handle functions
import { useInitialFetch } from "../utils/useInitialFetch"; // Import the custom hook

export default function Dictionary() {
  const [inputValue, setInputValue] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null); // Ref for the input field

  const setRef = (element) => {
    if (element) {
      inputRef.current = element.querySelector("input"); // Adjust to get the correct input element
    }
  };

  // Use the custom hook for fetching the initial definition
  useInitialFetch(setDefinition, setError);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "",
      }}
    >
      <Box
        component="div"
        maxWidth={"900px"}
        width={"100%"}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          ref={setRef} // Use the callback ref
          startDecorator={<SearchIcon />}
          placeholder="Search"
          variant="outlined"
          fullWidth={true}
          value={inputValue}
          onChange={handleChange(setInputValue)} // Use the imported handler
          onKeyDown={handleKeyDown(
            inputValue,
            setDefinition,
            setInputValue,
            setError,
            inputRef
          )} // Use the imported handler
        />
        {error && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <Typography level="h1" noWrap={false} textAlign="center">
              {error}
            </Typography>
          </Box>
        )}
        {definition && <Word definition={definition} />}
      </Box>
    </Box>
  );
}
