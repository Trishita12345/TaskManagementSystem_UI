import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ViewDetailsPage from "../../../components/ViewDetailsPage";
import { priviledges } from "../../../constants/priviledges";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";
import AddEditProjectForm from "./AddEditProjectForm";
import { fetchProjectDetails } from "../../../utils/services/projectService";
import {
  getTheme,
  loading,
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import type { AxiosError } from "axios";
import type {
  AddEditProjectInputProps,
  EmployeeSummaryType,
  ProjectDetails,
} from "../../../constants/types";
import Loader from "../../../components/Loader";
import ProjectMetadata from "./ProjectMetadata";
import ProjectBreadcrumbs from "../../../components/ProjectBreadcrumbs";
import { routes } from "../../../constants/routes";
import { Link } from "@mui/material";

const ViewEditProject = () => {
  const theme = useSelector(getTheme);
  const isLoading = useSelector(loading);
  const { permissions } = useSelector(userDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>();
  const [formResponse, setFormResponse] = useState<AddEditProjectInputProps>();
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

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate(routes.projectList)}
    >
      Projects
    </Link>,
    <Link
      underline="none"
      key="2"
      color={theme.secondaryContrast}
      sx={{ cursor: "default" }}
    >
      {projectDetails?.name}
    </Link>,
  ];

  return (
    <>
      {isLoading && <Loader />}
      <ProjectBreadcrumbs breadcrumbs={breadcrumbs} />
      <ViewDetailsPage
        header="Project Details"
        isEditPermission={isEditPermission}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      >
        <AddEditProjectForm
          onSuccess={getProjectDetails}
          disabled={!(isEditMode && isEditPermission)}
          setIsEditMode={setIsEditMode}
          pageResponse={formResponse}
        />
        {projectDetails && (
          <ProjectMetadata
            createdBy={`${projectDetails.createdBy.firstName} ${projectDetails.createdBy.lastName}`}
            createdAt={projectDetails.createdAt}
            updatedBy={`${projectDetails.updatedBy.firstName} ${projectDetails.updatedBy.lastName}`}
            updatedAt={projectDetails.updatedAt}
          />
        )}
      </ViewDetailsPage>
    </>
  );
};

export default ViewEditProject;
