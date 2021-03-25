import React from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ImageCard from "./ImageCard";
import "primeflex/primeflex.css";

class Tabs extends React.Component {
  state = { activityIndex: 1, images: [], clickImg: false };

  // To access webcam
  camera = (function () {
    let width = 0;
    let height = 0;

    const createObjects = function () {
      const video = document.createElement("video");
      video.id = "video";
      video.width = width;
      video.height = height;
      video.autoplay = true;
      document.body.appendChild(video);

      const canvas = document.createElement("canvas");
      canvas.id = "canvas";
      canvas.width = width;
      canvas.height = height;
      document.body.appendChild(canvas);
    };
    return {
      video: null,
      context: null,
      canvas: null,

      // On webcam
      startCamera: function (w = 300, h = 200) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          width = w;
          height = h;

          createObjects();

          this.video = document.getElementById("video");
          this.canvas = document.getElementById("canvas");
          this.context = this.canvas.getContext("2d");

          (function (video) {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(function (stream) {
                video.srcObject = stream;
                video.play();
              });
          })(this.video);
        }
      },

      // To take a pic
      takeSnapshot: function () {
        this.context.drawImage(this.video, 0, 0, width, height);
        let image = this.canvas
          .toDataURL("image/png")
          .replace(/^data:image\/(png|jpg);base64,/, "");
        return image;
      },
    };
  })();

  // To save Image of single users
  onClickSaveImage = (e) => {
    e.preventDefault();
    let imageArray = [
      {
        totalPoints: 0,
        image: this.state.images[0],
      },
      {
        totalPoints: 0,
        image: this.state.images[1],
      },
    ];
    if (localStorage.getItem("list") != null) {
      let list = localStorage.getItem("list");
      let newList = [...list, imageArray];
      localStorage.setItem("list", JSON.stringify(newList));
    } else if (localStorage.getItem("list") == null) {
      localStorage.setItem("list", JSON.stringify(imageArray));
    }
  };

  render() {
    let arr = localStorage.getItem("list");
    let finalArr = JSON.parse(arr);
    console.log("Images", finalArr);

    return (
      <div>
        <div className="card">
          <TabView>
            <TabPanel header="Create a Poll">
              <div
                style={{
                  width: "35%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1%",
                }}
              >
                <Button
                  onClick={() => {
                    this.camera.startCamera();
                    this.setState({ clickImg: true });
                  }}
                >
                  On Camera
                </Button>
                {this.state.clickImg && (
                  <div
                    style={{
                      width: "60%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      className="p-button-warning"
                      onClick={() => {
                        let image = this.camera.takeSnapshot();
                        let newImage = image;
                        this.setState({
                          images: [...this.state.images, newImage],
                        });
                      }}
                    >
                      Click pic
                    </Button>
                    <Button
                      label="Save Images"
                      className="p-button-success"
                      onClick={(e) => this.onClickSaveImage(e)}
                    />
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {this.state.images[0] !== undefined && (
                  <img
                    src={`data:image/*;base64,${this.state.images[0]}`}
                    alt="images"
                  />
                )}
                {this.state.images[1] !== undefined && (
                  <img
                    src={`data:image/*;base64,${this.state.images[1]}`}
                    alt="images"
                  />
                )}
              </div>
            </TabPanel>
            <TabPanel header="Select 3 Dishes">
              <Card>
                <div className="p-grid">
                  {finalArr.map((data, index) => {
                    return <ImageCard data={data} key={index} />;
                  })}
                </div>
              </Card>
            </TabPanel>
          </TabView>
        </div>
      </div>
    );
  }
}

export default Tabs;
