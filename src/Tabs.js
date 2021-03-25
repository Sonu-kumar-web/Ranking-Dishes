import React from "react";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";

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

  render() {
    console.log("Image", this.state.images[0]);
    return (
      <div>
        <div className="card">
          <TabView>
            <TabPanel header="Create a Poll">
              <div
                style={{
                  width: "18%",
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
                )}
              </div>
              <div
                style={{
                  width: "48%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={`data:image/*;base64,${this.state.images[0]}`}
                  alt="images"
                />
                <img
                  src={`data:image/*;base64,${this.state.images[1]}`}
                  alt="images"
                />
              </div>
            </TabPanel>
            <TabPanel header="Result">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </TabPanel>
          </TabView>
        </div>
      </div>
    );
  }
}

export default Tabs;
