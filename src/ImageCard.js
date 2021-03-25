import React from "react";

class ImageCard extends React.Component {
  state = { border: "" };

  onSelectImage = (e) => {
    // console.log(this.props.index);
    let arr = JSON.parse(localStorage.getItem("list"));
    if (this.props.count < 3) {
      this.setState({ border: "8px solid #4baaf5" });
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (i === this.props.index) {
          let newPointToAdd = 0;
          if (this.props.count === 0) {
            newPointToAdd = 30;
          } else if (this.props.count === 1) {
            newPointToAdd = 20;
          } else if (this.props.count === 2) {
            newPointToAdd = 10;
          }
          let newData = {
            totalPoints: arr[i].totalPoints + newPointToAdd,
            image: arr[i].image,
          };
          newArr.push(newData);
          this.props.onClickImage();
        } else {
          newArr.push(arr[i]);
        }
      }
      arr = [...newArr];
    }
    // console.log("Arr", arr);
    localStorage.setItem("list", JSON.stringify(arr));
  };

  render() {
    console.log("Count", JSON.parse(localStorage.getItem("list")));
    return (
      <div className="p-col">
        <img
          src={`data:image/*;base64,${this.props.data.image}`}
          alt="images"
          onClick={(e) => this.onSelectImage(e)}
          style={{ border: this.state.border }}
        />
      </div>
    );
  }
}

export default ImageCard;
