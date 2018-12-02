import * as React from "react";
import Markdown from "../components/common/MarkdownContent";
import userTerms from "../components/Markdowns/userTerms";
import privacyPolicy from "../components/Markdowns/privacyPolicy";

const MdTestPage: React.SFC = () => {
  return (
    <article>
      <Markdown source={userTerms} />;
    </article>
  );
};

export default MdTestPage;
