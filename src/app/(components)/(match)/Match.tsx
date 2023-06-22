"use client";

import {
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
  useContext,
  Fragment,
} from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowClockwise } from "@phosphor-icons/react";
import { generateChoices, Choices } from "./generateChoices";
import { Question, CircleNotch, Check } from "@phosphor-icons/react";
import { AppContext } from "@/context";
import { HoneypotField } from "./HoneypotField";
import { ChoiceButton } from "./ChoiceButton";
import Link from "next/link";

export type MatchLifecycle =
  | "pending-turnstile-pass"
  | "ready"
  | "processing-turnstile-reset"
  | "api-processing";

export const Match = () => {
  // TODO: HOOK 1
  // returns: resetChoices, choiceOne, choiceTwo (maybe turn choice 1 & two into array)
  const [choices, setChoices] = useState<Choices | null>(null);
  // set / reset choices
  const resetChoices = () => setChoices(generateChoices());
  useEffect(() => setChoices(generateChoices()), []);
  const { choiceOne, choiceTwo } = choices || {};

  const [lastChoice, setLastChoice] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>("");
  const [turnstilePassed, setTurnstilePassed] = useState(false);
  const [isResetPending, setIsResetPending] = useState(false);
  const [hpOne, setHpOne] = useState<string>("");
  const [hpTwo, setHpTwo] = useState<string>("");

  let lifecycleStep: MatchLifecycle = "api-processing";

  if (!turnstilePassed) {
    // TODO: this could also be turnstile fail so maybe refactor
    lifecycleStep = "pending-turnstile-pass";
  } else if (turnstilePassed && !isProcessing && !isResetPending) {
    lifecycleStep = "ready";
  } else if (isResetPending) {
    lifecycleStep = "processing-turnstile-reset";
  }

  const { setIsDialogOpen } = useContext(AppContext);

  // refs
  const formRef = useRef<HTMLFormElement | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  // submit
  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    const winner = e.nativeEvent.submitter!.getAttribute("data-choice");
    const winnerPosition = parseInt(
      e.nativeEvent.submitter!.getAttribute("data-choice-position") as string
    );
    setLastChoice(winnerPosition);

    // reset choices
    if (!winner) {
      resetChoices();
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    // honeypot
    if (hpOne || hpTwo) {
      try {
        await fetch("/api/narnia", {
          method: "POST",
          body: JSON.stringify({
            choice_1: choiceOne?.id,
            choice_2: choiceTwo?.id,
            winner: parseInt(winner!),
          }),
        });

        resetChoices();
      } catch (e) {
        setErrorMessage(`🤖 Error Unknown: Please try again in a few minutes.`);
      }

      setIsProcessing(false);
      return;
    }

    const formData = new FormData(
      formRef.current as unknown as HTMLFormElement
    );
    const token = formData.get("cf-turnstile-response");

    try {
      setIsResetPending(true);
      turnstileRef.current?.reset();

      const res = await fetch("/api/match", {
        method: "POST",
        body: JSON.stringify({
          choice_1: choiceOne?.id,
          choice_2: choiceTwo?.id,
          winner: parseInt(winner!),
          token,
        }),
      });

      if (!res.ok) {
        setErrorMessage(
          <>
            Error {res.status}: Please try again in a few minutes. If this
            problem persists please{" "}
            <Link href="/contact" className="link">
              get in touch
            </Link>
            .
          </>
        );
        setIsProcessing(false);
        return;
      }

      resetChoices();
    } catch (e) {
      setErrorMessage(
        <>
          Error unknown: Please try again in a few minutes. If this problem
          persists please{" "}
          <Link href="/contact" className="link">
            get in touch
          </Link>
          .
        </>
      );
    }

    setIsProcessing(false);
  };

  const disableButtons = lifecycleStep !== "ready";
  // const disableButtons = isProcessing || !turnstilePassed || isResetPending;

  return (
    <div className="flex flex-col items-center text-center">
      <form onSubmit={handleSubmit} ref={formRef}>
        {/* 
          HONEYPOTS
        */}
        <HoneypotField
          label="Hello 👋🤖"
          name="name"
          value={hpOne}
          setState={setHpOne}
        />
        <HoneypotField
          label="Hello again 👋🤖"
          name="message"
          value={hpTwo}
          setState={setHpTwo}
        />

        <div className="relative flex flex-col items-start">
          <div className="flex flex-col-reverse items-center">
            {/* 
                RESET 
              */}
            <button
              type="submit"
              value="reset choices"
              // TODO: add some link styles to global
              className="link mt-4 flex items-center text-2xl"
              disabled={disableButtons}
            >
              <ArrowClockwise
                className="mr-2 inline-block"
                aria-hidden={true}
              />{" "}
              skip
            </button>

            {/* 
                QUESTION
              */}
            <fieldset className="flex flex-col items-center space-y-4">
              <legend className="flex items-center text-2xl sm:text-4xl">
                <span>
                  Which swear word is more offensive?
                  <button
                    type="button"
                    value="help"
                    // TODO: add some link styles to global
                    className="ml-2 inline-flex items-center"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Question size={24} className="inline" />
                  </button>
                </span>
              </legend>

              {/* 
             ERRORS
            */}
              {(errorMessage || hpOne || hpTwo) && (
                <div className="error-msg max-w-sm space-y-4 text-base md:max-w-2xl">
                  {(hpOne || hpTwo) && (
                    <p className="">{`🙁 You shouldn't see this message, your votes aren't being counted.`}</p>
                  )}
                  {/* <p className="">
                  {
                    "Est nostrud voluptate proident in magna quis officia et culpa enim sit. Deserunt aute culpa in velit ut exercitation occaecat incididunt ipsum do qui."
                  }
                </p> */}
                  {errorMessage && <p className="">{errorMessage}</p>}
                </div>
              )}

              <div className="relative">
                {/* 
                TURNSTILE
              */}
                <div
                  className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+1rem)] ${
                    turnstilePassed && !isResetPending ? "-z-10 opacity-0" : ""
                  }`}
                >
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
                    options={{
                      theme: "light",
                      appearance: "interaction-only",
                      action: "match",
                    }}
                    onSuccess={() => {
                      setTurnstilePassed(true);
                      setIsResetPending(false);
                    }}
                    onExpire={() => setTurnstilePassed(false)}
                    onError={() => setTurnstilePassed(false)}
                    ref={turnstileRef}
                  />
                </div>
                {/* 
                CHOICES
              */}
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                  {/* <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-center md:space-x-4 md:space-y-0"> */}
                  {choiceOne && (
                    <ChoiceButton
                      lifecycleStep={lifecycleStep}
                      choice={choiceOne}
                      position={1}
                      wasSelectedChoice={lastChoice === 1}
                    />
                  )}
                  <div className="flex justify-center md:items-center">
                    <span>vs.</span>
                  </div>
                  {choiceTwo && (
                    <ChoiceButton
                      lifecycleStep={lifecycleStep}
                      choice={choiceTwo}
                      position={2}
                      wasSelectedChoice={lastChoice === 2}
                    />
                  )}
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};
