import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

interface MetadataProps {
  createdBy: string;
  createdAt: string; // ISO string
  updatedBy?: string;
  updatedAt?: string;
}

const ProjectMetadata: React.FC<MetadataProps> = ({
  createdBy,
  createdAt,
  updatedBy,
  updatedAt,
}) => {
  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box mt={3} borderTop="1px solid #e0e0e0" pt={1}>
      <List dense disablePadding>
        <ListItem sx={{ py: 0 }}>
          <ListItemText
            primary={
              <Typography variant="caption" color="text.secondary">
                • Created by <b style={{ fontSize: "10px" }}>{createdBy}</b> on{" "}
                {formatDate(createdAt)}
              </Typography>
            }
          />
        </ListItem>

        {updatedBy && updatedAt && (
          <ListItem sx={{ py: 0 }}>
            <ListItemText
              primary={
                <Typography variant="caption" color="text.secondary">
                  • Last updated by{" "}
                  <b style={{ fontSize: "10px" }}>{updatedBy}</b> on{" "}
                  {formatDate(updatedAt)}
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ProjectMetadata;
