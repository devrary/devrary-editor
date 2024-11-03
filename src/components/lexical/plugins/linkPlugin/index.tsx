import React from "react";
import { validateUrl } from "@/shared/utils/url";
import { LinkPlugin as LexicalLinkPlugin } from "@lexical/react/LexicalLinkPlugin";

const LinkPlugin = () => {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
};

export default LinkPlugin;
