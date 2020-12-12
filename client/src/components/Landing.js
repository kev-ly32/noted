import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

const LandingCarousel = () => {
  const items = [
    {
      name: "Keep track of your tasks.",
      description: "Anything you want, we'll have it Noted.",
      image:
        "https://res.cloudinary.com/de5gzocha/image/upload/v1607811423/Noted/MindMap_jal332.svg",
    },
    {
      name: "Slick dashboard for ease of use.",
      description: "Spend less time planning, more time doing.",
      image:
        "https://res.cloudinary.com/de5gzocha/image/upload/v1607811423/Noted/RemoteWorking_on88yi.svg",
    },
  ];
  return (
    <Carousel interval={10000}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <Paper elevation={5}>
      <Grid container style={{ paddingTop: "5%" }}>
        <Box display="flex" alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <h2>{props.item.name}</h2>
              <p>{props.item.description}</p>
              <Button
                color="primary"
                variant="contained"
                className="CheckButton"
              >
                Get Started
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center">
              <img
                style={{ width: "60%", height: "300px" }}
                src={props.item.image}
                alt="Landing Checklist"
              />
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

function Landing(props) {
  return (
    <Container maxWidth="lg">
      <Typography component="div" style={{ height: "80vh" }}>
        <LandingCarousel />
      </Typography>
    </Container>
  );
}

export default Landing;
