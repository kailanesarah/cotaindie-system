"use client";

import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Icon } from "./icon";
import { ScrollArea } from "./scroll-area";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  );
}

function DialogOverlay({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "bg-black-default/75 fixed inset-0 z-50 grid place-items-center overflow-y-auto",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Overlay>
  );
}

type DialogContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
> & {
  size?: "xsmall" | "small" | "medium" | "large";
};

function DialogContent({
  className,
  children,
  size = "medium",
  ...props
}: DialogContentProps) {
  const sizeClasses = {
    xsmall: "max-w-[30rem]",
    small: "max-w-[33.75rem]",
    medium: "max-w-[40rem]",
    large: "max-w-[57.75rem]",
  };

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay>
        <div className="pointer-events-auto fixed inset-0 z-50">
          <ScrollArea className="h-dvh">
            <div
              className="flex min-h-dvh items-center justify-center py-6"
              style={
                {
                  // padding: "clamp(1.5rem, calc(50dvh - 19.25rem), 6rem) 0",
                }
              }
            >
              <DialogPrimitive.Content
                className={cn(
                  "rounded-default relative overflow-clip bg-white focus:outline-none",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                  "w-full gap-4 duration-200",
                  sizeClasses[size],
                  className,
                )}
                {...props}
              >
                <DialogClose asChild>
                  <button
                    className="text-black-default absolute top-2 right-4 cursor-pointer"
                    aria-label="Fechar modal"
                    type="button"
                  >
                    <Icon name="close" size={40} />
                  </button>
                </DialogClose>
                {children}
              </DialogPrimitive.Content>
            </div>
          </ScrollArea>
        </div>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "border-b-b-light flex items-center gap-4 border-b px-6 py-4 pr-16",
        className,
      )}
      {...props}
    />
  );
}

function DialogHeaderContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("border-b-light border-b p-6", className)}
      {...props}
    />
  );
}

function DialogIcon({
  name,
  className,
  size = 24,
}: Readonly<{ name: string; className?: string; size?: number }>) {
  return (
    <Icon
      name={name}
      size={size}
      className={cn("text-red-default", className)}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col px-6 py-4", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-[1.0625rem]", className)}
      {...props}
      asChild
    >
      <h6>{children}</h6>
    </DialogPrimitive.Title>
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
