import { m } from "framer-motion";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TbSunLow, TbMoon } from "react-icons/tb";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-5 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-20";

type ToggleOptionsType = "light" | "dark";

const Toggle = () => {
  const { resolvedTheme } = useTheme();
  const [selected, setSelected] = useState<ToggleOptionsType>("dark");

  useEffect(() => {
    setSelected(resolvedTheme === "light" ? "light" : "dark");
  }, [resolvedTheme]);
  return (
    <div className="grid place-content-center px-4 transition-colors">
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

const SliderToggle = ({
  selected,
  setSelected,
}: {
  selected: ToggleOptionsType;
  setSelected: Dispatch<SetStateAction<ToggleOptionsType>>;
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light");
          setTheme("light");
        }}
      >
        <TbSunLow className="relative z-10 text-lg md:text-xl" />
        <span className="sr-only">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-400"
        }`}
        onClick={() => {
          setSelected("dark");
          setTheme("dark");
        }}
      >
        <TbMoon className="relative z-10 text-lg md:text-xl" />
        <span className="sr-only">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <m.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-zinc-900 to-gray-700"
        />
      </div>
    </div>
  );
};

export default Toggle;
