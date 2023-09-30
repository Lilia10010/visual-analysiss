import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

interface CardStatusProps {
  percentage: string;
  status: "approved" | "pending" | "denied";
}

const getTypeComponent = (status: string) => {
  switch (status) {
    case "approved":
      return {
        colorClass: "bg-green-500 text-green-500",
        icon: <IoCheckmarkCircleOutline />,
        title: "Aprovada",
      };
    case "denied":
      return {
        colorClass: "bg-danger text-danger",
        icon: <AiOutlineCloseCircle />,
        title: "Negada",
      };
    case "pending":
      return {
        colorClass: "bg-warning text-warning",
        icon: <RiErrorWarningLine />,
        title: "Pendente",
      };
    default:
      return {
        colorClass: "bg-green-500 text-white",
        icon: <IoCheckmarkCircleOutline />,
        title: "Aprovada",
      };
  }
};

export const CardStatus = ({ percentage, status }: CardStatusProps) => {
  const { colorClass, icon, title } = getTypeComponent(status);
  return (
    <div className="min-w-[300px] mt-5 md:mt-0">
      <div
        className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-200 rounded-xl"
        style={{
          boxShadow:
            "rgba(7, 7, 8, 0.25) 0px 50px 100px -20px, rgba(180, 177, 177, 0.3) 0px 30px 60px -30px",
        }}
      >
        <div className="flex w-full justify-center -mt-10 ">
          <div
            className={`shadow-slate-100 text-4xl flex justify-center items-center w-24 h-20 !bg-secondary dark:bg-secondary-dark rounded-xl p-2 ${colorClass}`}
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
          >
            {icon}
          </div>
        </div>
        <div className="flex flex-col items-center pt-3">
          <span className="text-xs text-gray-500">Transação</span>
          <span className="text-tertiary font-semibold text-xl">{title}</span>
        </div>
        <div>
          <div className="flex justify-between text-secondary font-semibold">
            <span>progresso</span>
            <span>{percentage === "" ? "0%" : percentage + "%"}</span>
          </div>
        </div>
        <div className="w-full pt-2">
          <div className="w-full h-4 bg-gray-400 rounded-full">
            <div
              className={`h-full rounded-full shadow-md ${colorClass}`}
              style={{
                width: percentage === "" ? 0 : percentage + "%",
                color: colorClass,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
