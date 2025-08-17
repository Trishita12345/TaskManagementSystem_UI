import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ViewDetailsPage from "../../../components/ViewDetailsPage";
import { priviledges } from "../../../constants/priviledges";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";
import AddEditProjectForm from "./AddEditProjectForm";
import { fetchProjectDetails } from "../../../utils/services/projectService";
import {
  loading,
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import type { AxiosError } from "axios";
import type {
  AddEditProjectInputProps,
  EmployeeSummaryType,
} from "../../../constants/types";
import Loader from "../../../components/Loader";

const ViewEditProject = () => {
  const isLoading = useSelector(loading);
  const { permissions } = useSelector(userDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState<any>({});
  const [formResponse, setFormResponse] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const isEditPermission = permissions.includes(priviledges.edit_project);

  const getProjectDetails = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await fetchProjectDetails(id as string);
      setProjectDetails(data);
      setFormResponse({
        name: data.name,
        details: data.details,
        managerId: data.manager.employeeId,
        employeeIds: data.employees.map(
          (emp: EmployeeSummaryType) => emp.employeeId
        ),
      });
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: getErrorMessage(err),
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      <ViewDetailsPage
        header="Project Details"
        isEditPermission={isEditPermission}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      >
        <AddEditProjectForm
          onSuccess={() => {}}
          disabled={!(isEditMode && isEditPermission)}
          setIsEditMode={setIsEditMode}
          pageResponse={formResponse}
        />
      </ViewDetailsPage>
    </>
  );
};

export default ViewEditProject;
