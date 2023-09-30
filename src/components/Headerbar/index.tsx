import { ThemeSwitcher } from "../ThemeSwitcher";
export const Headerbar = () => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center px-4 h-full bg-tertiary dark:bg-secondary-dark">
        <img
          src="/logo_va.png"
          alt="Logo"
          className="w-auto h-20 invert-[1] max-w-[200px] object-contain opacity-80"
        />
        <ThemeSwitcher />
      </div>
    </div>
  );
};
