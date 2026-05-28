// ========================================
// UPDATED AddEmployee.jsx
// WITH REACT HOOK FORM
// ========================================

import { useForm } from "react-hook-form";

import AddEmployeeHeader from "../components/addEmployee/AddEmployeeHeader";
import EmploymentDetailsForm from "../components/addEmployee/EmploymentDetailsForm";
import FormActions from "../components/addEmployee/FormActions";
import PersonalInfoForm from "../components/addEmployee/PersonalInfoForm";
import { createEmployee } from "../../api/employeeApis";

const AddEmployee = () => {
  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      department: "",
      role: "",
      joiningDate: "",
      status: "active",
      avatar: "",
      password: "12345678",
    },
  });

  // SUBMIT
  const onSubmit = async (data) => {
    // console.log("FORM DATA =>", data);
    try {
      let res = await createEmployee(data);
      console.log(res, "in ui");
      alert("employee created");
      reset();
    } catch (error) {
      console.log("error in api", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] p-8">
      <div className="mx-auto">
        {/* HEADER */}
        <AddEmployeeHeader />

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* PERSONAL INFO */}
          <PersonalInfoForm
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          {/* EMPLOYMENT DETAILS */}
          <EmploymentDetailsForm register={register} errors={errors} />

          {/* ACTIONS */}
          <FormActions />
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
