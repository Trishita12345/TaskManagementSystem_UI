import {
  Card,
  Box,
  Avatar,
  Typography,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { getNameInitials } from "../../utils/helperFunctions/commonHelperFunctions";
import { Edit, Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";

const EmployeeTooltipContent = ({
  firstName,
  lastName,
  email,
  role,
  profileImage,
  onTooltipClick,
  showInitial = true,
}: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage: string;
  onTooltipClick?: () => void;
  showInitial?: boolean;
}) => {
  const theme = useSelector(getTheme);
  return (
    <Card sx={{ width: 400, minHeight: "200px" }}>
      <Box
        sx={{
          backgroundColor: theme.primary,
          color: "white",
          position: "relative",
          height: "90px",
        }}
      >
        <Avatar
          sx={{
            width: 130,
            height: 130,
            position: "absolute",
            top: 25,
            left: 20,
            bgcolor: "#CE93D8",
          }}
          src={profileImage}
        >
          {showInitial ? (
            <Typography variant="h3">
              {getNameInitials(firstName, lastName)}
            </Typography>
          ) : (
            <Person sx={{ fontSize: "100px" }} />
          )}
        </Avatar>
        <Box
          sx={{
            position: "absolute",
            top: firstName !== "Unassigned" ? 40 : 60,
            left: 160,
            pl: "8px",
          }}
        >
          <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">{email}</Typography>
        </Box>
      </Box>
      <CardContent sx={{ position: "relative", pt: 1 }}>
        {role && (
          <Chip
            sx={{
              position: "absolute",
              left: 160,
              pl: "8px",
              borderRadius: 0,
              px: 0,
              color: theme.primary,
            }}
            label={<Typography variant="body1">{role}</Typography>}
          ></Chip>
        )}
        {onTooltipClick && (
          <Button
            sx={{ position: "absolute", left: 160, top: 50, pl: "8px" }}
            variant="outlined"
            startIcon={<Edit />}
            onClick={onTooltipClick}
          >
            Edit Profile
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeTooltipContent;
