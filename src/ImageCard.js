import React from "react";

class ImageCard extends React.Component {
  state = { login: true };

  login = (val) => {
    this.setState({ login: val });
  };

  render() {
    // console.log("Card", this.props.data);
    return (
      <div className="p-col">
        <img
          src={`data:image/*;base64,${this.props.data.image}`}
          alt="images"
        />
      </div>
    );
  }
}

export default ImageCard;
