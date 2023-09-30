import { CiCoinInsert } from "react-icons/ci";

interface TotalValueOfTransitionsProps {
  amount: number | string;
  label: string;
}

export const TotalValueOfTransitions = ({
  amount,
  label,
}: TotalValueOfTransitionsProps) => {
  return (
    <div className="w-full h-full  bg-white rounded-xl px-3 py-2 shadow dark:bg-secondary-dark dark:text-white">
      <div className="flex flex-wrap gap-1 h-full">
        <div className="flex flex-col gap-3">
          <span className=" text-tertiary text-2xl font-extrabold">
            {amount}
          </span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="flex justify-end items-end  grow text-5xl dark:text-amber-200 text-amber-500">
          <CiCoinInsert />
        </div>
      </div>
    </div>
  );
};
