import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ date, title, image, description }) {
  return (
    <CardActionArea
      sx={{
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minWidth: 300,
        maxWidth: 300,
        minHeight: 300,
        maxHeight: 300,
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        margin: ".5rem",
        padding: 0,
      }}
    >
      <CardMedia
        component="img"
        zindex={1}
        image={image}
        alt="doggo"
        sx={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          objectFit: "cover", // Adjusted to maintain aspect ratio and cover the area
          overflow: "hidden", // Hide any content that exceeds the specified height
          minHeight: "13rem",
          maxHeight: "13rem",
        }}
      />
      <CardContent
        sx={{
          minHeight: "5rem",
          maxHeight: "5rem",
          marginTop: "0rem",
          paddingTop: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            wordWrap: "break-word",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginRight: "10px" }}
          >
            <div style={{ display: "block" }}>
              <h5 style={{ color: "#3D37F1", margin: 0 }}>{date}</h5>
              {/* <h3 style={{ margin: 0 }}>04</h3> */}
            </div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <h4
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "250px",
                marginRight: "10px",
              }}
            >
              {title}
            </h4>
            <div
              style={{
                overflow: "ellipsis",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "250px",
              }}
            >
              <h6
                style={{
                  display: "flex",
                  marginRight: "10px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxHeight: "1rem", // This limits the height to one line
                  minHeight: "1rem", // This ensures at least one line is always visible
                }}
              >
                {description}
              </h6>
            </div>
          </Typography>
        </div>
      </CardContent>
    </CardActionArea>
  );
}
