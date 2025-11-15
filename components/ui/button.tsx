"use client";

import Link, { type LinkProps } from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

const variantClasses = {
  solid:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600",
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:outline-blue-600",
  ghost: "text-blue-600 hover:bg-blue-50 focus-visible:outline-blue-600",
  subtle:
    "bg-blue-50 text-blue-700 hover:bg-blue-100 focus-visible:outline-blue-300",
  destructive:
    "bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline-red-600",
} as const;

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10",
} as const;

type Variant = keyof typeof variantClasses;
type Size = keyof typeof sizeClasses;

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: LinkProps["href"];
    prefetch?: LinkProps["prefetch"];
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (props, ref) => {
    if ("href" in props && props.href !== undefined) {
      const {
        href,
        prefetch,
        className,
        variant = "solid",
        size = "md",
        loading = false,
        leftIcon,
        rightIcon,
        children,
        onClick,
        ...anchorProps
      } = props;

      const { ["aria-disabled"]: ariaDisabled, ...cleanAnchorProps } = anchorProps;

      const isAriaDisabled =
        ariaDisabled === true || ariaDisabled === "true";

      const isDisabled = loading || isAriaDisabled;

      const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      };

      const content = renderContent({
        loading,
        leftIcon,
        rightIcon,
        children,
      });

      return (
        <Link
          {...cleanAnchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          prefetch={prefetch}
          className={cn(
            baseClasses({ className, variant, size }),
            (isDisabled || loading) && "pointer-events-none opacity-50",
          )}
          onClick={handleClick}
          aria-disabled={isDisabled || loading || undefined}
        >
          {content}
        </Link>
      );
    }

    const {
      className,
      variant = "solid",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      type,
      disabled,
      ...buttonProps
    } = props as ButtonAsButton;

    const buttonType = type ?? "button";

    const content = renderContent({
      loading,
      leftIcon,
      rightIcon,
      children,
    });

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonType}
        className={baseClasses({ className, variant, size })}
        disabled={disabled ?? loading}
        {...buttonProps}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

function renderContent({
  loading,
  leftIcon,
  rightIcon,
  children,
}: {
  loading: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {loading && (
        <span
          aria-hidden
          className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}
      {!loading && leftIcon}
      <span className="flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
      {!loading && rightIcon}
    </>
  );
}

function baseClasses({
  className,
  variant,
  size,
}: {
  className?: string;
  variant: Variant;
  size: Size;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
