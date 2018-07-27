import React from "react";
import styled, { keyframes } from "react-emotion";

const cardLoading = keyframes`
  0%, to {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%
  }
`;

const StyletonCSS = styled.div`
  display: inline-block;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(102, 107, 109, 0.192),
    rgba(184, 193, 197, 0.4),
    rgba(186, 194, 197, 0.2)
  );
  animation: ${cardLoading} 2s ease infinite;
  animation-delay: ${() => Math.floor(Math.random() * 3) + 1}s;
  background-size: 600% 600%;
  margin-bottom: 1px;

  ${"" /* .skeletonDiv:nth-child(odd) .loadingSkeleton {
  animation-delay: 0.4s;
} */};
`;

const Skeleton = ({ width, height, borderRadius }) => {
  const style = {
    width,
    height,
    borderRadius
  };

  return <StyletonCSS style={style} />;
};

Skeleton.defaultProps = {
  width: 100,
  height: 20,
  borderRadius: "5px"
};

class SkeletonWrapper extends React.PureComponent {
  render() {
    const { children, status, render, ...props } = this.props;

    if (typeof render === "function") {
      return (
        <SkeletonContext.Consumer>
          {value => render(value || status, Skeleton)}
        </SkeletonContext.Consumer>
      );
    }

    return (
      <SkeletonContext.Consumer>
        {value => {
          let providedStatus = status || value;
          if (providedStatus === "loading") return <Skeleton {...props} />;
          else return children();
        }}
      </SkeletonContext.Consumer>
    );
  }
}

const SkeletonContext = new React.createContext();

export {
  Skeleton,
  SkeletonWrapper,
  SkeletonContainer,
  SkeletonPayload,
  SkeletonContext
};
