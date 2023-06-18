import { Transition } from "@headlessui/react";
import { MatchLifecycle } from "./Match";
import { Choice } from "./generateChoices";
import { Check, CircleNotch } from "@phosphor-icons/react";

interface IChoiceButton {
  lifecycleStep: MatchLifecycle;
  choice: Choice;
  position: number;
  wasSelectedChoice: boolean;
}

export const ChoiceButton: React.FC<IChoiceButton> = (props) => {
  const { lifecycleStep, choice, position, wasSelectedChoice } = props;

  const transitionProps = {
    enter: "transition-opacity duration-500",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity duration-500",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
    className: "absolute px-4 py-2",
  };

  return (
    <button
      type="submit"
      value={choice?.word}
      data-choice={choice?.id}
      data-choice-position={position}
      className={`btn h-32 w-64 rounded-2xl bg-blue-500 px-4 py-2 text-2xl font-bold text-blue-50 transition duration-200 hover:scale-[1.03] disabled:scale-100 sm:h-40 sm:w-80 sm:text-4xl
      ${lifecycleStep === "pending-turnstile-pass" ? "bg-slate-500" : ""}
      `}
      disabled={lifecycleStep !== "ready"}
    >
      <Transition
        show={lifecycleStep === "processing-turnstile-reset"}
        {...transitionProps}
      >
        <span>{wasSelectedChoice ? <Check size={40} /> : ""}</span>
      </Transition>
      <Transition show={lifecycleStep === "ready"} {...transitionProps}>
        <span>{choice?.word}</span>
      </Transition>
      <Transition
        show={
          lifecycleStep !== "processing-turnstile-reset" &&
          lifecycleStep !== "ready"
        }
        {...transitionProps}
      >
        <span>{<CircleNotch size={40} className="animate-spin" />}</span>
      </Transition>
    </button>
  );
};
