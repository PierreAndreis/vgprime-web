import * as React from "react";
import MarkdownVisualizer from "../components/common/MarkdownVisualizer";
import userTerms from "../components/md/userTerms";

const UserTerms: React.SFC = () => <MarkdownVisualizer markdown={userTerms} />;

export default UserTerms;
