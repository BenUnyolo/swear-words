"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { SyntheticEvent, useRef, useState } from "react";
import { SelectField } from "./Select";
import { Check, Warning } from "@phosphor-icons/react";

export const metadata = {
  title: "Contact",
};

const typeOptions = [
  { label: "General enquiry", value: "General enquiry" },
  { label: "Report an issue", value: "Report an issue" },
  { label: "Give feedback", value: "Give feedback" },
  { label: "Other", value: "Other" },
];

export default function Contact() {
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldEmail, setFieldEmail] = useState<string>("");
  const [fieldType, setFieldType] = useState(typeOptions[0]);
  const [fieldMessage, setFieldMessage] = useState<string>("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [hpOne, setHpOne] = useState<string>("");
  // const [hpTwo, setHpTwo] = useState<string>("");

  const formRef = useRef<HTMLFormElement | null>(null);

  // submit
  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();

    setIsProcessing(true);
    setErrorMessage("");

    // // honeypot
    // if (hpOne || hpTwo) {
    //   try {
    //     await fetch("/api/narnia", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         choice_1: choiceOne?.id,
    //         choice_2: choiceTwo?.id,
    //         winner: parseInt(winner!),
    //       }),
    //     });

    //     resetChoices();
    //   } catch (e) {
    //     setErrorMessage(
    //       `🤖 Error Unknown: Please try again in a few minutes . If this problem persists please email XXX.`
    //     );
    //   }

    //   setIsProcessing(false);
    //   return;
    // }

    const formData = new FormData(
      formRef.current as unknown as HTMLFormElement
    );
    const token = formData.get("cf-turnstile-response");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: fieldName,
          email: fieldEmail,
          type: fieldType.value,
          message: fieldMessage,
          token,
        }),
      });

      if (!res.ok) {
        const resJson = await res.json();
        // console.log(resJson);
        setErrorMessage(
          `Error ${res.status}: Please try again in a few minutes.`
        );
        setIsProcessing(false);
        return;
      }
      setIsFormSubmitted(true);
    } catch (e) {
      setErrorMessage(`Error Unknown: Please try again in a few minutes.`);
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex-1">
      <h1 className="mb-1 text-3xl md:text-4xl">Contact</h1>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit} ref={formRef}>
          {/* TODO: set up honeypot */}

          {/* NAME */}
          <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="mt-1 block w-full rounded-lg px-3 py-2"
              minLength={2}
              maxLength={100}
              disabled={isProcessing}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="mt-4">
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={fieldEmail}
              onChange={(e) => setFieldEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg px-3 py-2"
              disabled={isProcessing}
              required
            />
          </div>

          {/* TYPE */}
          <div className="mt-4">
            <SelectField
              label="Message Type"
              options={typeOptions}
              option={fieldType}
              setState={setFieldType}
              isDisabled={isProcessing}
            />
          </div>

          {/* MESSAGE */}
          <div className="mt-4">
            <label htmlFor="message" className="block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={fieldMessage}
              onChange={(e) => setFieldMessage(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-lg px-3 py-2"
              minLength={25}
              maxLength={1500}
              disabled={isProcessing}
              required
            ></textarea>
          </div>

          {/* TURNSTILE */}
          <div className="mt-4">
            <div aria-labelledby="turnstileDiv">Are you a human?</div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
              options={{
                theme: "light",
                appearance: "always",
                action: "contact",
              }}
              className="mt-1"
              id="turnstileDiv"
            />
          </div>

          {errorMessage && (
            <p className="error-msg mt-4 flex">{errorMessage}</p>
          )}

          <button
            type="submit"
            value="reset choices"
            className="btn btn-sm mt-4"
            disabled={isProcessing}
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="flex align-middle">
          <Check size={24} aria-hidden="true" className="mr-2 inline-block" />
          Thanks, your message has been sent!
        </div>
      )}
    </div>
  );
}
