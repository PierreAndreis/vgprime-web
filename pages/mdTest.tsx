import * as React from "react";
import MarkdownContent from "../components/common/MarkdownContent";
import userTerms from "../components/md/userTerms";
import privacyPolicy from "../components/md/privacyPolicy";

const MdTestPage: React.SFC = () => {
  return <MarkdownContent source={userTerms} />;
};

export default MdTestPage;
