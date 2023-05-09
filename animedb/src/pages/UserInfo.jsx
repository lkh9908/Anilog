import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";

export const UserInfo = () => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users`, user);
        setUser(res.data[0]);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFieldChange = (event, fieldName) => {
    const value = event.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleClearField = (fieldName) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: "",
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const date = new Date(user.birth_date);
      const isoDate = date.toISOString().slice(0, 10);
      console.log(user.gender, user.location, isoDate, user.email);
      console.log(
        await axios.put(
          `/users/updateInfo/${user.gender}/${user.location}/${isoDate}/${user.email}`
        )
      );
      console.log("Changes saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const fieldNames = Object.keys(user).filter(
    (fieldName) =>
      ![
        "user_id",
        "password",
        "user_watching",
        "user_completed",
        "user_on_hold",
        "user_dropped",
        "user_plan_to_watch",
        "join_date",
      ].includes(fieldName)
  );

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        style={{
          margin: "20px",
          maxWidth: "600px",
          backgroundColor: "#E0E5FE",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{
              color: "#8C9EFF",
              marginBottom: "10px",
              fontSize: "36px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            User Profile
          </Typography>
          {fieldNames.map((fieldName) => {
            let label;
            if (fieldName === "username") {
              label = "User Name";
            } else if (fieldName === "birth_date") {
              label = "Birthday";
              const date = new Date(user[fieldName]);
              const isoDate = date.toISOString().slice(0, 10);
              return (
                <Typography
                  key={fieldName}
                  variant="subtitle1"
                  gutterBottom
                  style={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#A2B2FF",
                    fontSize: "24px",
                    fontFamily: "Arial, sans-serif",
                    borderBottom: "1px solid white",
                    paddingBottom: "10px",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>{label}:</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isSmallScreen ? "column" : "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      type="date"
                      variant="standard"
                      size="small"
                      value={isoDate}
                      onChange={(event) => handleFieldChange(event, fieldName)}
                      style={{ width: "15rem", textAlign: "center" }}
                    />
                    <Button onClick={() => handleClearField(fieldName)}>
                      Clear
                    </Button>
                  </div>
                </Typography>
              );
            } else if (fieldName === "gender") {
              label = "Gender";
              return (
                <Typography
                  key={fieldName}
                  variant="subtitle1"
                  gutterBottom
                  style={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#A2B2FF",
                    fontSize: "24px",
                    fontFamily: "Arial, sans-serif",
                    borderBottom: "1px solid white",
                    paddingBottom: "10px",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>{label}:</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isSmallScreen ? "column" : "row",
                      alignItems: "center",
                    }}
                  >
                    <Select
                      variant="standard"
                      size="small"
                      value={user[fieldName]}
                      onChange={(event) => handleFieldChange(event, fieldName)}
                      style={{ width: "15rem", textAlign: "left" }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <Button onClick={() => handleClearField(fieldName)}>
                      Clear
                    </Button>
                  </div>
                </Typography>
              );
            } else {
              label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
              return (
                <Typography
                  key={fieldName}
                  variant="subtitle1"
                  gutterBottom
                  style={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#A2B2FF",
                    fontSize: "24px",
                    fontFamily: "Arial, sans-serif",
                    borderBottom: "1px solid white",
                    paddingBottom: "10px",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>{label}:</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isSmallScreen ? "column" : "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      variant="standard"
                      size="small"
                      value={user[fieldName]}
                      onChange={(event) => handleFieldChange(event, fieldName)}
                      style={{ width: "15rem", textAlign: "center" }}
                    />
                    <Button onClick={() => handleClearField(fieldName)}>
                      Clear
                    </Button>
                  </div>
                </Typography>
              );
            }
          })}

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
