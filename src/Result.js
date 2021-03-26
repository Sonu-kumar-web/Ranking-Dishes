import React from "react";
import { Card } from "primereact/card";
class Result extends React.Component {
  sortData = (arr) => {
    let newPoints = [];
    arr.map((data) => {
      return newPoints.push(data.totalPoints);
    });
    newPoints = newPoints.sort(function (a, b) {
      return b - a;
    });

    let newArr = [];
    for (let i = 0; i < newPoints.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (newPoints[i] === arr[j].totalPoints) {
          newArr.push(arr[j]);
          break;
        }
      }
    }
    return newArr;
  };

  render() {
    let arr = JSON.parse(localStorage.getItem("list"));
    let finalArr = [];
    if (arr != null) {
      finalArr = [...arr];
      finalArr = this.sortData(finalArr);
    }
    return (
      <Card style={{ backgroundColor: "whitesmoke" }}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "35%" }}>
            <h1>Sorted Poll</h1>
            {finalArr.length !== 0 &&
              finalArr.map((data, index) => {
                return (
                  <Card style={{ border: "2px solid black", marginTop: "1%" }}>
                    <div
                      className="p-col"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h1>{data.totalPoints}</h1>
                      <img
                        src={`data:image/*;base64,${data.image}`}
                        alt="images"
                      />
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      </Card>
    );
  }
}

export default Result;
