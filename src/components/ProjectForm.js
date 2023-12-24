import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectsContext";

const ProjectForm = ({ project, isModalOpen, isOverlayOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectContext();

  const handelSubmit = async (e) => {
    e.preventDefault();

    // data
    const projectObj = { title, tech, budget, duration, manager, dev };

    // if there is no project
    if (!project) {
      // post req
      const res = await fetch("http://localhost:5000/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectObj),
      });
      const json = await res.json();

      // !res.ok , set error
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      // res.ok , reset
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDev("");
        setDuration("");
        setManager("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_PROJECT", payload: json });
      }
      return;
    }

    // if there is a project
    if (project) {
      // send patch req
      const res = await fetch(
        `http://localhost:5000/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectObj),
        }
      );
      const json = await res.json();

      // !res.ok
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      // res.ok
      if (res.ok) {
        setError(null);
        setEmptyFields([]);

        // dispatch
        dispatch({ type: "UPDATE_PROJECT", payload: json });

        // close overlay and modal
        isModalOpen(false);
        isOverlayOpen(false);
      }

      return;
    }
  };

  return (
    <form className="project-form flex flex-col gap-5">
      <h2 className="text-4xl font-medium text-sky-400 mb-10">
        {project ? "Update Project" : "Add a new project"}
      </h2>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="title"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300 "
        >
          Project title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g e-commerce website"
          id="title"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="tech"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="e.g node.js, react, redux etc."
          id="tech"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Budget (USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g 500 "
          id="budget"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="duration"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Duration (week)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g 5"
          id="duration"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="manager"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type="manager"
          placeholder="e.g Sami"
          id="manager"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="dev"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type="number"
          placeholder="e.g 5"
          id="dev"
          className={`bg-transparent border  py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields.includes("dev") ? "border-rose-500" : "border-slate-500"
          }`}
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300"
        onClick={handelSubmit}
      >
        {project ? "Confirm update" : "Add project"}
      </button>
      {error && (
        <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
