import { ClearOutlined } from "@mui/icons-material";
import { Modal, Box, Typography, Divider } from "@mui/material";
import type { addConfigProps } from "../../constants/types";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import useScreenSize from "../../utils/customHooks/useScreenSize";

const AddModal = ({
  addConfig,
  getList,
}: {
  addConfig: addConfigProps | undefined;
  getList: (query: string) => void;
}) => {
  const theme = useSelector(getTheme);
  const { width } = useScreenSize();
  const getModalWidth = () => {
    if (width < 700) return "65vw";
    if (width < 900) return "80vw";
    if (width < 1200) return "75vw";
    else return "40vw";
  };
  return (
    <>
      {addConfig && (
        <Modal open={addConfig.addModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: getModalWidth(),
              bgcolor: theme.secondaryColor2,
              boxShadow: 24,
              p: "24px 20px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={1}
              >
                <Typography variant="h5" fontWeight={600}>
                  {addConfig.headerText}
                </Typography>
                <ClearOutlined
                  onClick={() => addConfig.setAddModalOpen(false)}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
              <Divider sx={{ marginBottom: "20px" }} />
            </Box>
            <addConfig.AddComponent
              setAddModalOpen={addConfig.setAddModalOpen}
              onSuccess={getList}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddModal;
