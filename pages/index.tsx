import * as React from "react";
import Button from "../components/common/Button";

type Props = {
  playerName: string | null;
};

class PlayerPage extends React.Component<Props> {
  render() {
    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          background: "#ECEEF1",
          color: "#4a90e2",
          fontSize: 35,
          flexDirection: "column",
        }}
      >
        <img src="/static/images/logo.png" style={{ marginBottom: 10 }} />
        <p>will be back in February 2019</p>
        <a href="https://vgpro.gg">
          <Button>Go back to VGPRO.gg</Button>
        </a>
      </div>
    );
  }
}

export default PlayerPage;
