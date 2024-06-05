"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

export default function ExcalidrawBoard({ elements }: { elements: any[] | undefined }) {
    let convertedElements: any[] = [];
    if(elements) {
        convertedElements = convertToExcalidrawElements(elements);
    }
  return (
    <div className="w-full h-[750px]">
      <Excalidraw
        theme="dark"
        initialData={{
          elements: convertedElements,
          appState: {
            //   viewModeEnabled: true,
          },
          scrollToContent: true,
        }}
      />
    </div>
  );
}
