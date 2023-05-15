import React from "react";

import Header from "@/client/ui/atoms/Header";

import Email, { Props as EmailProps } from "./ui/Email";
import Lightning, { Props as LightningProps } from "./ui/Lightning";

export type Props = {
  lnurl: LightningProps["lnurl"];
  onSubmitEmail: EmailProps["onSubmit"];
  onSubmitLightning: LightningProps["onSubmit"];
};

const SigninScreen = ({ lnurl, onSubmitEmail, onSubmitLightning }: Props) => {
  return (
    <div className="w-full">
      <Header tag="h2">Sign in</Header>

      <Email onSubmit={onSubmitEmail} />
      <hr className="mx-auto bg-white" />
      <Lightning onSubmit={onSubmitLightning} lnurl={lnurl} />
    </div>
  );
};

export default SigninScreen;
