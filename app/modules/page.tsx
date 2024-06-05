"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

// import "@excalidraw/excalidraw/index.css";

export default function Page() {
  const elements = convertToExcalidrawElements([
    // {
    //   type: "rectangle",
    //   id: "rect-1",
    //   x: 625,
    //   y: 400,
    //   width: 250,
    //   height: 100,
    //   label: {
    //     text: "What are stocks?",
    //   },
    // },
    // {
    //   type: "ellipse",
    //   id: "ellipse-1",
    //   x: 550,
    //   y: 0,
    //   width: 400,
    //   height: 200,
    //   strokeWidth: 2,
    //   label: {
    //     text: "Stocks are shares of ownership in a company."
    //   }
    // },
    // {
    //   type: "ellipse",
    //   id: "ellipse-2",
    //   x: 1150,
    //   y: 350,
    //   width: 400,
    //   height: 200,
    //   strokeWidth: 2,
    //   label: {
    //     text: "When you buy stock, you are essentially buying a small piece of the company."
    //   },
    // },
    // {
    //   type: "ellipse",
    //   id: "ellipse-3",
    //   x: 0,
    //   y: 350,
    //   width: 400,
    //   height: 200,
    //   strokeWidth: 2,
    //   label: {
    //     text: "Stockholders may receive dividends if the company distributes profits to its shareholders."
    //   },
    // },
    // {
    //   type: "ellipse",
    //   id: "ellipse-4",
    //   x: 550,
    //   y: 650,
    //   width: 400,
    //   height: 200,
    //   strokeWidth: 2,
    //   label: {
    //     text: "Investors buy stocks with the expectation that their value will increase over time, allowing them to sell for a profit."
    //   },
    // },
    // {
    //   type: "arrow",
    //   x: 625, 
    //   y: 400,
    //   points: [
    //     [625, 400],
    //     [0, 350],
    //   ],
    //   start: {
    //     id: "rect-1",
    //   },
    //   end: {
    //     id: "ellipse-1",
    //   },
    // },
    {
      "id": "ztON81lXq3605S7PXdrtR",
      "type": "ellipse",
      "x": 6820,
      "y": 580,
      "width": 540.0000000000001,
      "height": 220.00000000000003,
      "roundness": {
        "type": 2
      }, 
      label :{
        text: "types of shares"
      }
    },
    {
      "id": "fDExrdsAM863iiJ46CbZJ",
      "type": "ellipse",
      "x": 6400,
      "y": 1080,
      "width": 480,
      "height": 220,
      "roundness": {
        "type": 2
      },
      label: {
        text: "common shares"
      }
    },
    {
      "id": "XFZlXcEQ6BxXelX9WCvR4",
      "type": "ellipse",
      "x": 7240,
      "y": 1080,
      "width": 480,
      "height": 220,
      "roundness": {
        "type": 2
      },
      label: {
        text: "preferred shares",
      }
    },
    {
      "id": "S4Chh4lYRDoKvny882UFN",
      "type": "arrow",
      "x": 6949.319739747565,
      "y": 784.8721650542241,
      "width": 288.7370021143488,
      "height": 294.53339885170726,
      "roundness": {
        "type": 2
      },
      "points": [
        [
          0,
          0
        ],
        [
          -288.7370021143488,
          294.53339885170726
        ]
      ],
      "startBinding": {
        "focus": 0.16397999514683734,
        "gap": 1,
        "elementId": "ztON81lXq3605S7PXdrtR"
      },
      "endBinding": {
        "focus": -0.33383078591045273,
        "gap": 1,
        "elementId": "fDExrdsAM863iiJ46CbZJ"
      },
    },
    {
      "id": "JyBY9eGPaXY0UlZEQ0M2F",
      "type": "arrow",
      "x": 7220,
      "y": 780,
      "width": 260.07481028525217,
      "height": 299.0000053478784,
      "roundness": {
        "type": 2
      },
      "points": [
        [
          0,
          0
        ],
        [
          260.07481028525217,
          299.0000053478784
        ]
      ],
      "startBinding": {
        "elementId": "ztON81lXq3605S7PXdrtR",
        "focus": -0.1805421473420026,
        "gap": 1
      },
      "endBinding": {
        "elementId": "XFZlXcEQ6BxXelX9WCvR4",
        "focus": 0.3739777963900989,
        "gap": 1
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    }
  ] as any);
  return (
    <div className="w-full h-[750px]">
      <Excalidraw
        theme="dark"
        initialData={{
          elements,
          appState: {
            viewModeEnabled: true,
          },
          scrollToContent: true,
        }}
      />
    </div>
  );
}
