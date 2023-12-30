import { currencyFormatter } from "../utils/currenctFormatter";
import { useProjectContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

const ProjectCard = ({ project }) => {
  const { dispatch } = useProjectContext();
  const { user } = useAuthContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handelDeleat = async () => {
    if (!user) {
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  const updataHaldeler = () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const handelOverlay = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
  };

  return (
    <div className="project w-[28rem] bg-slate-800 p-5 rounded-xl shadow-xl border border-slate-700 flex flex-col gap-5">
      <div className="top">
        <span className="text-sky-400">ID: {project._id}</span>
        <h3 className="text-3xl font-medium truncate text-slate-300">
          {project.title}
        </h3>
        <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">
          {project.tech}
        </span>
      </div>
      <div className="mid text-slate-300 flex gap-10">
        <div className="left flex flex-col ">
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Added: {moment(project.createdAt).format("MMM DD, hh:mm A")}
          </span>
          <span>
            Updated: {moment(project.updatedAt).format("MMM DD, hh:mm A")}
          </span>
        </div>
        <div className="right flex flex-col">
          <span>Mamager: {project.manager}</span>
          <span>Developer: {project.dev}</span>
          <span>
            Duration:{" "}
            {`${project.duration} week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button
          onClick={updataHaldeler}
          className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300"
        >
          Updata
        </button>
        <button
          onClick={handelDeleat}
          className="text-rose-500 hover:underline"
        >
          Deleat
        </button>
      </div>
      <div
        onClick={handelOverlay}
        className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 bottom-0 left-0 right-0 ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>

      <div
        className={`updata-modal w-[35rem] fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-20 rounded-xl shadow-xl border border-slate-700 z-[2] ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <ProjectForm
          project={project}
          isModalOpen={setIsModalOpen}
          isOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
