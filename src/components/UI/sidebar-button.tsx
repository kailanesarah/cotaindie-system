import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import Link, { type LinkProps } from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./icon";

type TSidebarButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export const SidebarButton = ({
  children,
  className,
  asChild = false,
  ...props
}: TSidebarButton) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "rounded-default hover:bg-black-light/75 flex w-full cursor-pointer items-center gap-4 px-4 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

type SidebarLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  isCurrent?: boolean;
};

export const SidebarLink = ({
  children,
  href,
  className,
  isCurrent = false,
  ...props
}: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-default hover:bg-black-light/75 flex w-full items-center gap-4 px-4 py-3",
        isCurrent && "bg-black-light hover:bg-black-light",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export const SidebarLinkIcon = ({ name }: { name: string }) => {
  return <Icon name={name} size={20} className="mt-0.5" />;
};

export const SidebarLinkContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>{children}</div>
  );
};

export const SidebarLinkTitle = ({ children }: { children: ReactNode }) => {
  return <span>{children}</span>;
};

export const SidebarLinkDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("text-body-darker/80 text-[0.8125rem]", className)}>
      {children}
    </span>
  );
};
