import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";

const moduleName: string = "Home";

export function LandingModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <LandingLayout />;
}
