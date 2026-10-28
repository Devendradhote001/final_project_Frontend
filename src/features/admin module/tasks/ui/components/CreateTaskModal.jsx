import { useForm } from "react-hook-form";
import { ChevronDown, Plus, RotateCcw } from "lucide-react";
import TaskModal from "./TaskModal";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  inputClass,
  labelClass,
} from "../../constants/taskConstants";
import { getErrorMessage } from "../../utils/taskHelpers";

const defaultValues = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
};

const SelectField = ({ register, name, rules, children }) => (
  <div className="relative">
    <select
      {...register(name, rules)}
      className={`${inputClass} appearance-none pr-10`}
    >
      {children}
    </select>
    <ChevronDown
      size={18}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
    />
  </div>
);

const CreateTaskModal = ({ employees, isLoadingEmployees, createTask, onClose, onCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  let today = new Date().toISOString().split("T")[0];
  let description = watch("description") || "";

  const onSubmit = (data) => {
    createTask.mutate(data, {
      onSuccess: (task) => {
        reset(defaultValues);
        onCreated(task);
      },
    });
  };

  return (
    <TaskModal
      title="Create Task"
      subtitle="Fill in the details and assign it to a team member."
      icon={<Plus size={24} />}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-5 sm:p-6">
        {/* TITLE */}
        <div>
          <label className={labelClass}>
            Task Title
            <span className="ml-1 text-[var(--danger)]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Prepare Q3 sales report"
            {...register("title", {
              required: "Task title is required",
              validate: (value) => value.trim().length > 0 || "Task title is required",
            })}
            className={inputClass}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-[var(--danger)]">{errors.title.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows={4}
            maxLength={500}
            placeholder="Add more context about this task..."
            {...register("description")}
            className={`${inputClass} resize-y`}
          />
          <p className="mt-2 text-right text-xs text-[var(--text-muted)]">
            {description.length}/500
          </p>
        </div>

        {/* ASSIGNEE */}
        <div>
          <label className={labelClass}>
            Assign To
            <span className="ml-1 text-[var(--danger)]">*</span>
          </label>
          <SelectField
            register={register}
            name="assignedTo"
            rules={{ required: "Please choose an employee" }}
          >
            <option value="">
              {isLoadingEmployees ? "Loading employees..." : "Choose an employee"}
            </option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} — {employee.email}
              </option>
            ))}
          </SelectField>
          {errors.assignedTo && (
            <p className="mt-2 text-sm text-[var(--danger)]">
              {errors.assignedTo.message}
            </p>
          )}
        </div>

        {/* PRIORITY / STATUS / DUE DATE */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Priority</label>
            <SelectField register={register} name="priority">
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </SelectField>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <SelectField register={register} name="status">
              {TASK_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </SelectField>
          </div>

          <div>
            <label className={labelClass}>Due Date</label>
            <input
              type="date"
              min={today}
              {...register("dueDate")}
              className={inputClass}
            />
          </div>
        </div>

        {createTask.isError && (
          <p className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]">
            {getErrorMessage(createTask.error)}
          </p>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col-reverse gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              reset(defaultValues);
              createTask.reset();
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] px-5 py-3 text-sm font-medium transition hover:bg-[var(--bg-hover)]"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="submit"
            disabled={createTask.isPending}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--tertiary)] px-6 py-3 text-sm font-semibold text-[var(--bg-surface)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          >
            <Plus size={18} />
            {createTask.isPending ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </TaskModal>
  );
};

export default CreateTaskModal;
