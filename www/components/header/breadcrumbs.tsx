"use client";

import React, { ReactElement, useMemo } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useBreadcrumbsContext } from "@/context/breadcrumbs/use-breadcrumbs-context";

type Props = Readonly<{
  trailingPath?: string;
}>;

export function Breadcrumbs({ trailingPath }: Props) {
  const routes = usePathname();
  let fullHref: string | undefined = undefined;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;
  const pathSegments = routes.split("/").filter((segment) => segment !== "");
  const { trailingPath: contextTrailingPath } = useBreadcrumbsContext();

  useMemo(() => {
    for (let i = 0; i < pathSegments.length; i++) {
      const route = pathSegments[i];
      let href;

      href = fullHref ? `${fullHref}/${route}` : `/${route}`;
      fullHref = href;

      if (i === pathSegments.length - 1) {
        if (trailingPath || contextTrailingPath) {
          breadcrumbPage = (
            <BreadcrumbItem>
              <BreadcrumbPage>
                {trailingPath || contextTrailingPath}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        } else {
          breadcrumbPage = (
            <BreadcrumbItem>
              <BreadcrumbPage>
                {route.slice(0, 1).toUpperCase() + route.slice(1)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        }
      } else {
        breadcrumbItems.push(
          <React.Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={href}>
                {route.slice(0, 1).toUpperCase() + route.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        );
      }
    }
  }, [pathSegments, fullHref]);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
