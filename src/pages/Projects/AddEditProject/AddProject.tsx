import type { AddProps } from "../../../constants/types";
import AddEditProjectForm from "./AddEditProjectForm";

const AddProject = ({ setAddModalOpen, onSuccess }: AddProps) => {
  return (
    <>
      <AddEditProjectForm
        onSuccess={() => {
          setAddModalOpen(false);
          onSuccess();
        }}
      />
    </>
  );
};

export default AddProject;
