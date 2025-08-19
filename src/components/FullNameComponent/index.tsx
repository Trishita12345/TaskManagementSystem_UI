import { Box, Typography } from "@mui/material";
import CustomAvatar from "../CustomAvatar";

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
      <CustomAvatar avatarImage={profileImage} height={28} width={28} />
      <Typography>{firstName + " " + lastName}</Typography>
    </Box>
  );
};

export default FullNameComponent;
