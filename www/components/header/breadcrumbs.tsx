"use client";

import React, { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

type Props = Readonly<{
  pathToSwap?: Record<string, string | undefined>;
}>;

export function Breadcrumbs({ pathToSwap = {} }: Props) {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      return [];
    }

    return pathSegments.reduce<{ element: React.ReactNode; href: string }[]>(
      (acc, segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const displayText = pathToSwap[segment] || capitalize(segment);

        const element = (
          <React.Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === pathSegments.length - 1 ? (
                <BreadcrumbPage>{displayText}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        );

        acc.push({ element, href });
        return acc;
      },
      []
    );
  }, [pathname, pathToSwap]);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map(({ element }) => element)}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
