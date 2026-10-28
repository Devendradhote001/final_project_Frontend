import { useQuery } from "@tanstack/react-query";
import { getAllDepartmentsApi } from "../api/departmentApi";
import { useNavigate } from "react-router";

export const useDepartment = () => {
  let navigate = useNavigate();

  let { data, isPending } = useQuery({
    queryKey: ["department"],
    queryFn: getAllDepartmentsApi,
  });

  return {
    data,
    isPending,
    navigate,
  };
};
