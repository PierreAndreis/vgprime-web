import * as React from "react";
import { css } from "emotion";

const container = css`
  user-select: none;
  & > .dropdown {
    text-align: center;
    cursor: pointer;
    border: 2px solid dodgerblue;
    padding: 5px 10px;
    background: #fff;
  }
  & > .items {
    margin-top: -2px;
    position: absolute;
    z-index: 9999;
    border: 2px solid dodgerblue;
    background: #fff;
    min-width: 160px;
    & > .item {
      background: #fff;
      cursor: pointer;
      padding: 5px 10px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &.selected {
        background: dodgerblue;
        color: #fff;
        font-weight: 600;
      }
    }
  }
`;

type Props = {
  selectedIndex?: number;
  onChange: (index: number, value: string) => void;
  children: React.ReactNode;
};
type State = {
  selectedIndex: number;
  opened: boolean;
};

type ItemProps = {
  value: string;
};

class DropDown extends React.Component<Props, State> {
  static Item: React.SFC<ItemProps> = () => null;

  initialState: State = {
    selectedIndex: this.props.selectedIndex || 0,
    opened: false,
  };
  state = this.initialState;

  selectItem = (value: string, index: number) => {
    this.setState(
      {
        selectedIndex: index,
        opened: false,
      },
      () => this.props.onChange(index, value)
    );
  };

  toggleOpened = () => {
    this.setState(({ opened }) => ({ opened: !opened }));
  };

  componentDidMount() {
    const items = React.Children.map(this.props.children, el =>
      React.isValidElement(el) && (el as React.ReactElement<any>).type === DropDown.Item
        ? (el as React.ReactElement<any>).props.value
        : null
    );
    const selectedItem = items[this.state.selectedIndex];
    this.props.onChange(this.state.selectedIndex, selectedItem);
  }

  render() {
    const items = React.Children.map(this.props.children, el =>
      React.isValidElement(el) && (el as React.ReactElement<any>).type === DropDown.Item
        ? {
            value: (el as React.ReactElement<any>).props.value,
            content: (el as React.ReactElement<any>).props.children,
          }
        : null
    ).filter(x => x !== null);
    const selectedItem = items[this.state.selectedIndex];
    return (
      <div className={container}>
        <div className="dropdown" onClick={this.toggleOpened}>
          {selectedItem!.content} {this.state.opened ? "▲" : "▼"}
        </div>
        {this.state.opened && (
          <div className="items">
            {items.map((item, index) => (
              <div
                className={`item${index === this.state.selectedIndex ? " selected" : ""}`}
                onClick={() => this.selectItem(item!.value, index)}
              >
                {item!.content}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default DropDown;
