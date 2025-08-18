import { Person } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";

interface FullNameComponentProps {
  firstName: string;
  lastName: string;
  profileImage: string;
}
const FullNameComponent = ({
  firstName,
  lastName,
  profileImage,
}: FullNameComponentProps) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Avatar sx={{ height: 28, width: 28 }}>
        {profileImage ? <img src={profileImage} alt="" /> : <Person />}
      </Avatar>
      <Typography>{firstName + " " + lastName}</Typography>
    </Box>
  );
};

export default FullNameComponent;
