import React from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import { ArrowBack, ClearOutlined, Done } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box display={"flex"} alignItems={"center"} gap={0.5} mb={1}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        {/* Page Title */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Terms & Conditions
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />

      {/* Section 1 */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to our application. By accessing or using our service, you
          agree to comply with and be bound by the following terms and
          conditions. Please read them carefully.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 2 */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          2. User Responsibilities
        </Typography>
        <List>
          {[
            "You must provide accurate information when creating an account.",
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "You agree not to misuse or exploit the platform for unauthorized activities.",
          ].map((point, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemIcon>
                <Done color="success" />
              </ListItemIcon>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 3 */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          3. Limitations of Liability
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We are not liable for any damages resulting from:
        </Typography>
        <List>
          {[
            "Errors or interruptions in the service.",
            "Unauthorized access to your data.",
            "Any issues arising from third-party integrations.",
          ].map((point, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemIcon>
                <ClearOutlined color="error" />
              </ListItemIcon>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 4 */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          4. Changes to Terms
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We may update these terms from time to time. You will be notified of
          significant changes, and continued use of the service implies
          acceptance of the updated terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section 5 */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          5. Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          If you have any questions about these Terms & Conditions, please
          contact us at{" "}
          <Link component="span" fontWeight="bold" underline="hover">
            support@taskverse.com
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
