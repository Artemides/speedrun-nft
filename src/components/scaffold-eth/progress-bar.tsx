import React, { useEffect } from "react";
import Nprogress from "nprogress";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

export const ProgressBar = () => {
  const height = "3px";
  const color = "#2299dd";

  const styles = (
    <style>
      {`
          #nprogress {
            pointer-events: none;
          }
          #nprogress .bar {
            background: ${color};
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${typeof height === `string` ? height : `${height}px`};
          }
          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
            opacity: 1.0;
            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }
      `}
    </style>
  );

  useEffect(() => {
    Nprogress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        Nprogress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((a) =>
        a.addEventListener("click", handleAnchorClick)
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArr: PushStateInput) => {
        Nprogress.done();
        return target.apply(thisArg, argArr);
      },
    });
  });

  return styles;
};
