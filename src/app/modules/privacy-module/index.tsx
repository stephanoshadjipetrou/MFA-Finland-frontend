import React from "react";
import useTitle from "react-use/lib/useTitle";
import { LandingLayout } from "app/modules/landing-module/layout";
import { AppName } from "app/const/Path";
import { PrivacyModuleLayout } from "app/modules/privacy-module/layout";

const moduleName: string = "Privacy";

export function PrivacyModule() {
  useTitle(`${AppName} - ${moduleName}`);

  return <PrivacyModuleLayout />;
}
