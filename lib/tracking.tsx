import React from "react";

export const Context = React.createContext<undefined | any>(undefined);

class EventComponent extends React.PureComponent<TrackingProps & { tracking: any }> {
  componentDidMount() {
    console.log(this.props);
    this.props.tracking.event(this.props.name, this.props.category);
  }

  render() {
    return null;
  }
}

type TrackingProps = {
  name: string;
  category?: string;
};

const TrackingComponent: React.SFC<TrackingProps> = props => (
  <Context.Consumer>
    {tracking => <EventComponent {...props} tracking={tracking} />}
  </Context.Consumer>
);

export default TrackingComponent;
