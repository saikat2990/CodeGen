import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Canvas: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      {/* <TransformWrapper
        initialScale={0.5}
        // maxScale={0.8}
        // initialPositionX={0}
        // initialPositionY={0}
      >
        <TransformComponent wrapperStyle={{
          width: '100vw',
          height: '100vh',
        }}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Sample HTML Content</h1>
              <p>This is a sample HTML page in the middle of the canvas.</p>
              <ul className="list-disc ml-6 mt-2">
                <li>You can zoom in and out</li>
                <li>You can pan around</li>
                <li>The content stays centered</li>
              </ul>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper> */}
    </div>
  );
};

export default Canvas;