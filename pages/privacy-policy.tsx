import * as React from "react";
import MarkdownVisualizer from "../components/MarkdownVisualizer";
import privacyPolicy from "../components/md/privacyPolicy";

const PrivacyPolicy: React.SFC = () => <MarkdownVisualizer markdown={privacyPolicy} />;

export default PrivacyPolicy;
