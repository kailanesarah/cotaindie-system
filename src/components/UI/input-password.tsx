"use client";

import { useState } from "react";
import { Icon } from "./icon";
import { Input } from "./input";

export function InputPassword(props: React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex w-full items-center">
      <Input type={show ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-0 z-[1] flex h-full items-center px-3"
      >
        <Icon name={show ? "visibility_off" : "visibility"} />
      </button>
    </div>
  );
}
