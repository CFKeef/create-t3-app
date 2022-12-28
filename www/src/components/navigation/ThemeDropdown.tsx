import { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

type Theme = "dark" | "light" | "system";

const Option = ({ value }: { value: Theme }) => {
  return (
    <Listbox.Option
      className={({ selected, active }) =>
        `focus-none relative cursor-pointer bg-t3-purple-200/50 py-2 px-4 text-slate-900 outline-none hover:bg-t3-purple-300/75 dark:bg-t3-purple-200/10 dark:text-t3-purple-100 dark:hover:bg-t3-purple-200/20 ${
          selected && "bg-t3-purple-400/75 dark:bg-t3-purple-400/20"
        }
          ${active && "bg-t3-purple-300/75 dark:bg-t3-purple-200/20"}`
      }
      value={value}
    >
      {({ selected }) => (
        <span
          className={clsx(
            "truncate capitalize",
            selected && "font-medium",
            !selected && "font-normal",
          )}
        >
          {value}
        </span>
      )}
    </Listbox.Option>
  );
};

export default function ThemeDropdown() {
  const [value, setValue] = useState<Theme>("system");

  useEffect(() => {
    const selected = localStorage.getItem("theme");

    setValue((selected as Theme) ?? "system");
  }, []);

  const handleSelect = (val: Theme) => {
    const updateDocument = (prefersDark: boolean) => {
      const html = document.documentElement;

      html.classList.add(prefersDark ? "dark" : "light");
      html.classList.remove(prefersDark ? "light" : "dark");
    };

    if (val === "system") {
      localStorage.removeItem("theme");
      setValue("system");
      updateDocument(window.matchMedia("(prefers-color-scheme: dark)").matches);
    } else {
      localStorage.setItem("theme", val);
      setValue(val);
      updateDocument(val === "dark");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Listbox value={value} onChange={handleSelect}>
        <div className="relative">
          <Listbox.Button className="mx-auto flex w-fit gap-3 rounded-lg border bg-t3-purple-200/50 p-2 hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50">
            {value === "dark" ? (
              <label className="cursor-pointer text-t3-purple-500 dark:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current stroke-current transition-colors duration-300"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </label>
            ) : null}
            {value === "light" ? (
              <label className="cursor-pointer text-t3-purple-500 dark:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current stroke-current stroke-2 transition-colors duration-300"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  ></path>
                </svg>
              </label>
            ) : null}
            {value === "system" ? (
              <label className="cursor-pointer text-t3-purple-500 dark:text-slate-50">
                <svg
                  className="h-6 w-6 fill-current stroke-current stroke-2 transition-colors duration-300"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M10 3.5a6.5 6.5 0 1 1 0 13v-13ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Z"
                  />
                </svg>
              </label>
            ) : null}
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter={"transition ease-out duration-100"}
            enterFrom={"transform opacity-0 -translate-y-1"}
            enterTo={"transform opacity-100 -translate-y-0"}
          >
            <Listbox.Options className="focus-none shadow-l t3-scrollbar absolute right-0 mt-1 max-h-60 w-fit overflow-auto rounded-lg border bg-default text-base focus:outline-none focus-visible:outline-none dark:border-t3-purple-200/20 sm:text-sm">
              <Option value={"dark"} />
              <Option value={"light"} />
              <Option value={"system"} />
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
