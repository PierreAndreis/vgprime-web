import React from "react";
import styled from "react-emotion";
import { Box } from "../common/Box";

const RulesBox = styled(Box)`
  background-image: linear-gradient(-135deg, #78a6ef 0%, #63c0c9 100%);
  color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 180px;
`;

export default class extends React.Component {
  render() {
    return <RulesBox>Rules aasdasdaadasdasdadadadassdadads</RulesBox>;
  }
}
