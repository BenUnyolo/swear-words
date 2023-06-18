import { SetStateAction } from "react";

interface IHoneypotField {
  label: string;
  name: string;
  value: string;
  setState: SetStateAction<any>;
}

export const HoneypotField: React.FC<IHoneypotField> = (props) => {
  const { label, name, value, setState } = props;

  return (
    <div className="sr-only">
      <label htmlFor={name} aria-hidden="true">
        {label}
        <input
          type="text"
          name={name}
          id={name}
          tabIndex={-1}
          autoComplete="nope"
          value={value}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
    </div>
  );
};
