import React from "react";
import { Typography, Box, IconButton, ListItem, Divider } from "@mui/joy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useWordLogic } from "../utils/useWordLogic";
import Sheet from "@mui/joy/Sheet";
import CardContent from "@mui/joy/CardContent";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import { AnimatePresence, motion } from "framer-motion";

export default function Word({ definition }) {
  const {
    selectedPartOfSpeech,
    setSelectedPartOfSpeech,
    partOfSpeechButtons,
    currentMeanings,
    phoneticText,
    audioUrl,
  } = useWordLogic(definition);

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Sheet>
        <CardContent>
          <Typography
            level="h1"
            noWrap={false}
            textAlign="center"
            sx={{
              fontSize: {
                xs: "32px",
                sm: "64px",
              },
            }}
          >
            {definition[0]?.word}
          </Typography>

          {phoneticText && (
            <Typography
              level="title-lg"
              noWrap={false}
              textAlign="center"
              sx={{ mt: 1 }}
            >
              {" "}
              {phoneticText}
            </Typography>
          )}

          {audioUrl && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                onClick={() => new Audio(audioUrl).play()}
                sx={{ mx: 1 }}
              >
                <PlayArrowIcon />
              </IconButton>
            </Box>
          )}

          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 6, mb: -2 }}
          >
            <List
              orientation="horizontal"
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {partOfSpeechButtons.map((partOfSpeech, index) => (
                <ListItem key={partOfSpeech} sx={{ pr: 0.5 }}>
                  <ListItemButton
                    variant={
                      partOfSpeech === selectedPartOfSpeech ? "plain" : "plain"
                    }
                    onClick={() => setSelectedPartOfSpeech(partOfSpeech)}
                  >
                    <ListItemContent> {partOfSpeech}</ListItemContent>
                  </ListItemButton>
                  {index < partOfSpeechButtons.length - 1 && (
                    <Divider orientation="vertical" />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 0, mb: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPartOfSpeech}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                style={{ width: "100%" }}
              >
                <List
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    "--List-radius": "50px",
                  }}
                  marker="disc"
                >
                  {currentMeanings
                    .flatMap((meaning) => meaning.definitions)
                    .map((definition, index) => (
                      <ListItem key={index} sx={{ mt: 4 }}>
                        <ListItemContent>
                          <Typography level="body-md">
                            {definition.definition}
                          </Typography>
                          {definition.example && (
                            <Typography
                              level="body-md"
                              sx={{
                                mt: 1,
                                color: "text.secondary",
                                fontStyle: "italic",
                              }}
                            >
                              Example: {definition.example}
                            </Typography>
                          )}
                          <Divider orientation="horizontal" />
                        </ListItemContent>
                      </ListItem>
                    ))}
                </List>
              </motion.div>
            </AnimatePresence>
          </Box>
        </CardContent>
      </Sheet>
    </Box>
  );
}
