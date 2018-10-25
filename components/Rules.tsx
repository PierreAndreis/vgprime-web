import * as React from "react";
import { css, keyframes } from "react-emotion";
import Box from "./common/Box";
import { Transition, SpringConfig } from "react-spring";

const modal = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3;
  //padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const modalContent = css`
  ${Box};
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  max-height: 90%;
  max-width: 800px;
  z-index: 4;
  margin: 0 auto;
  padding-bottom: 20px;
  & > header {
    padding: 0px 40px;
    & > div {
      width: 180px;
      height: 60px;

      background: url("/static/images/logo.png") no-repeat;
      background-size: contain;
      margin: 0 auto;
      margin-top: 10px;
    }
    & > h1 {
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      text-transform: uppercase;
      padding-bottom: 20px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    }
    & > .closeButton {
      font-size: 42px;
      padding: 0;
      margin: 0;
      position: absolute;
      right: 10px;
      top: 0px;
      cursor: pointer;
    }
  }
  & > section {
    padding: 20px 60px;
    overflow: auto;
    text-align: justify;
  }
  @media screen and (max-width: 800px) {
    max-height: 100%;
    height: 100%;
    width: 100%;
    border-radius: 0px;
    & > header {
      padding: 0px;
    }
    & > section {
      padding: 20px;
    }
  }
`;

type Props = {
  opened: boolean;
  closeAction: () => void;
};
type State = {
  closing: boolean;
};
class Rules extends React.Component<Props, State> {
  state = {
    closing: false,
  };

  close = () => {
    this.props.closeAction();
  };

  componentWillReceiveProps() {
    if (this.props.opened === true) {
      console.log("closing: false");
      this.setState({ closing: false });
    }
  }

  render() {
    const { opened } = this.props;
    return (
      <Transition
        from={{ opacity: 0, transform: "scale(0.8)" }}
        enter={{ opacity: 1, transform: "scale(1)" }}
        leave={{ opacity: 0, transform: "scale(0.8)" }}
        config={{
          restDisplacementThreshold: 0.1,
          restSpeedThreshold: 0.1,
          duration: 300,
          tension: 100,
        }}
      >
        {opened &&
          (styles => (
            <div className={modal}>
              <div className={modalContent} style={styles}>
                <header>
                  <div />
                  <h1>Rules</h1>
                  <span className="closeButton" onClick={this.close}>
                    &times;
                  </span>
                </header>
                <section>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nulla
                    elit. Phasellus eget ipsum risus. Etiam convallis venenatis tellus,
                    vitae aliquet nulla ullamcorper et. Sed facilisis euismod sapien.
                    Mauris sit amet eros ut turpis tincidunt consectetur. Curabitur quis
                    volutpat purus. Nullam luctus lorem id scelerisque porttitor. Duis
                    porta vehicula consequat. Aliquam congue nisl in dui iaculis, sit amet
                    lacinia diam placerat. Nam vulputate magna in leo scelerisque, sit
                    amet iaculis mi ultrices. Donec condimentum massa odio, non tincidunt
                    mauris vehicula sed. Etiam vitae consequat elit. Quisque id semper
                    magna, at mollis enim. Sed euismod consectetur risus id commodo.
                    Aenean elementum luctus libero sed consectetur. Ut et pretium augue.
                    Sed dictum eget neque eu aliquam. Phasellus id turpis sit amet nibh
                    malesuada vestibulum. Morbi volutpat efficitur mi, sit amet gravida
                    orci finibus in. Vestibulum eu gravida ante, quis interdum nisl. Fusce
                    tincidunt justo ipsum, at auctor arcu feugiat sed. Quisque hendrerit
                    eleifend nisl eu aliquam. Nam vestibulum sed dolor quis sagittis.
                    Etiam mollis tortor eleifend nisl molestie viverra. Nam et convallis
                    tortor. Donec ac est tortor. Phasellus non rhoncus nulla, vitae varius
                    lacus. Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Maecenas vehicula, arcu a vestibulum
                    rutrum, quam justo tincidunt nisl, a laoreet quam nisi a metus. Etiam
                    placerat sapien ac quam mollis feugiat. Curabitur ullamcorper est
                    nunc. Aenean vitae tellus non nibh mollis rutrum mattis a dui.
                    Maecenas vitae nisi sodales, semper enim eu, bibendum dui. Morbi
                    sollicitudin finibus ipsum porta sollicitudin. Ut id sodales nulla.
                    Proin ut mauris elit. Cras euismod leo a lacus convallis, eget
                    sollicitudin lacus mollis. Sed scelerisque interdum magna, a aliquam
                    urna ultricies in. Donec sed orci eget erat suscipit suscipit at a
                    arcu. Aliquam quis elit tristique felis ornare vulputate fermentum
                    vitae diam. Mauris eu orci in massa lacinia euismod vel sit amet
                    lorem. Nullam rutrum elementum lobortis. Quisque nulla enim, pulvinar
                    vel maximus nec, ultricies vel sem. Ut dapibus orci a felis
                    sollicitudin, in interdum elit finibus. Mauris id sodales nibh. Aenean
                    rhoncus lectus quis nulla iaculis efficitur. Duis enim ipsum, mollis
                    ut imperdiet vitae, eleifend vel sem. Praesent pulvinar et erat vitae
                    interdum. Nullam aliquet urna vel arcu bibendum, quis convallis lorem
                    cursus. Nunc fringilla mollis leo, eget interdum urna blandit id.
                    Quisque porttitor eget lectus quis dignissim. Sed justo mauris,
                    pharetra ac mi nec, malesuada hendrerit dolor. Nam consequat commodo
                    nisi at commodo. Quisque ut malesuada lacus. Suspendisse hendrerit
                    eleifend faucibus. Donec cursus mi volutpat dolor ornare vulputate.
                    Aliquam luctus viverra est, in aliquet ipsum lacinia vel. In eleifend
                    elit eu tincidunt varius. Praesent eget enim tortor. Mauris in
                    dignissim justo, vel ornare nibh. Pellentesque dictum tristique justo,
                    sed dignissim mi egestas sed. Sed pulvinar lectus id nunc placerat
                    maximus.
                  </p>
                </section>
              </div>
            </div>
          ))}
      </Transition>
    );
  }
}

export default Rules;