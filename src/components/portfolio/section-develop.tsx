import React from "react";
import { Bubble } from "./bubble";
import { devConsiderations, devPullRequests, topics } from "@/utils/data";
import { Github } from "./icons/socials-icons";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CodeWindow } from "./code-window";
import { Window } from "./window-tab";
import { moons } from "@/utils/ui";

export const SectionDevelop = () => {
  const sectionIcons = moons["develop"];

  return (
    <section className="h-full p-2 relative text-sm">
      {React.cloneElement(sectionIcons, {
        className:
          "absolute -top-32 right-1/2  translate-x-1/2 lg:-left-5 lg:top-5 lg:-translate-y-1/2 w-20 aspect-square scale-75 sm:scale-75 ",
        displayName: false,
      })}
      <h2 className=" m-auto text-gradient-title tracking-tighter text-2xl text-center lg:px-28 lg:text-4xl ">
        using security best practices...
      </h2>
      <p className="m-auto px-1 my-2 leading-5 text-secondary-content text-center lg:px-12">
        {"/*"} <span className="font-semibold text-primary">@dev:</span> Crafting a highly technical process that
        demands a tailored approach to meet the unique needs and specifications, while aligning with security standards
        and scalability requirements for a robust solution.
      </p>
      <div className="mx-auto w-full md:w-9/12 my-4">
        <p className=" mb-16 text-center md:text-xl">
          Continuous Integration <br />
          on every{" "}
          <span className="text-[#6CFE89] font-semibold">
            {" "}
            {"{"}Pull Request{"}"}
          </span>
        </p>
        <div className="relative      ">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-spot shadow-[#f06479b0] "></div>

          <Bubble
            id={`develop-border-gradient-github`}
            className="absolute top-3 md:-top-[7px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 aspect-square scale-75 lg:scale-100 flash-light-to-b2 before:w-[2px] before:to-[#6CFE89] before:z-10"
            bColor="#6CFE89"
            bgColor="#6CFE897f"
          >
            <span className="absolute w-12 aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <Github className="fill-white" />
            </span>
          </Bubble>

          <div className="grid grid-cols-2 gap-x-8 items-start gap-y-2 md:gap-y-4 pt-20">
            {devPullRequests.map((pr) =>
              pr.success && !!!pr.ci ? (
                <PullRequest key={pr.text} success={pr.success} text={pr.text} pulse={false} />
              ) : (
                <Tooltip key={pr.text} delayDuration={0} disableHoverableContent>
                  <TooltipTrigger>
                    <PullRequest success={pr.success} text={pr.text} pulse />
                  </TooltipTrigger>
                  <TooltipContent className="bg-transparent">
                    <CodeWindow code={pr.ci!} codeClassName="text-[13px]" />
                  </TooltipContent>
                </Tooltip>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-around my-8">
        {devConsiderations.map((con) => (
          <Tooltip key={con.title} delayDuration={0}>
            <TooltipTrigger>
              <h3 className="text-[#F0647A] text-sm hover:scale-125 transition">
                {"{"} <span className="text-[#77a3f7]">{con.title}</span> {"}"}
              </h3>
            </TooltipTrigger>
            <TooltipContent className="w-[300px] bg-transparent" sideOffset={14}>
              <Window>
                <p className="m-0 leading-5 text-sm text-secondary-content font-light ">
                  {"/*"}
                  <span className="font-semibold text-primary">@notice:</span> {con.description}
                  {"*/"}
                </p>
              </Window>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </section>
  );
};

const PullRequest = ({ text, success, pulse }: { text: string; success: boolean; pulse: boolean }) => {
  return (
    <div className="relative pl-[10px] px-2 rounded-lg bg-[#F2F3FF] drop-shadow-white">
      {success ? (
        pulse ? (
          <span className="absolute flex h-3 w-3 top-1/2 -translate-y-1/2 left-2 ">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#29C031] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#29C031] "></span>
          </span>
        ) : (
          <CheckCircleIcon width={21} height={21} fill="#3BAE53" className="absolute top-1/2 -translate-y-1/2 left-1" />
        )
      ) : pulse ? (
        <span className="absolute flex h-3 w-3 top-1/2 -translate-y-1/2 left-2 ">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FD4646] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FD4646] "></span>
        </span>
      ) : (
        <div className="absolute top-1/2 -translate-y-1/2 left-1">
          <svg width="21" height="21" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="#FD4646"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      <p className="pl-3 py-2 text-sm text-start text-secondary font-semibold tracking-tighter m-[6px] leading-5">
        {text}
      </p>
    </div>
  );
};
