import {
  UserDropdownPlaceholders,
  UserDropdownTexts,
} from "@/types/UserDropdown";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
//import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isRtl: boolean;
  userPlaceholder: UserDropdownPlaceholders;
  texts: UserDropdownTexts;
  header: string;
}) => {
  /*   const placeholders = [
    "Search For Modem ID",
    "Search For LAT & LONG",
    "e.g. 29295002123",
    "Find Your Modem Here",
    "quick search for your modem",
  ]; */

  /*   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (value: string) => {
    console.log("Submitted value:", value);
  }; */

  return (
    <header className="sticky top-0 z-20 flex w-full border-b border-stroke bg-white dark:border-stroke border-secondary-lightuser dark:border-tertiary-darkuser dark:bg-primary-darkuser">
      <div className="flex flex-grow items-center justify-between py-5 shadow-2 md:px-5 2xl px-10">
        <div className="flex items-center gap-2 sm:gap-4 ">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm p-1.5  "
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-tertiary-darkuser delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-tertiary-darkuser delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-tertiary-darkuser delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-tertiary-darkuser delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-tertiary-darkuser duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>{" "}
          <div className="hidden xl:block">
            <h1 className="text-3xl font-bold text-primary-darkuser dark:text-white">
              {props.header ?? "Beauty Clinic"}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div className="md:block">
              {/*          <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              /> */}
            </div>
            <div className="hidden sm:block">
              <DarkModeSwitcher />
            </div>
          </ul>

          <DropdownUser
            isRtl={props.isRtl}
            userPlaceholder={props.userPlaceholder}
            texts={props.texts}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
