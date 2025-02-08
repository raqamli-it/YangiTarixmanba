import 'aframe';
import { Entity, Scene } from 'aframe-react';

const Model3d = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">A-Frame va React</h1>
      <Scene>
        <Entity light={{ type: 'ambient', color: '#888' }} />
        <Entity
          light={{ type: 'directional', color: '#fff', intensity: 0.5 }}
          position="1 1 1"
        />

        <Entity primitive="a-camera" position="0 1.6 0">
          <Entity primitive="a-cursor" />
        </Entity>

        <a-assets>
          <a-asset-item
            id="sampleModel"
            src="/models/sample-model.gltf"
          ></a-asset-item>
        </a-assets>

        <Entity
          gltf-model="#sampleModel"
          scale="0.5 0.5 0.5"
          position="0 0 -5"
          animation-mixer
        />

        <Entity
          primitive="a-plane"
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
        />

        <Entity primitive="a-sky" color="#ECECEC" />
      </Scene>
    </div>
  );
};

export default Model3d;
