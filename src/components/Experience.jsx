// import { Perf } from 'r3f-perf';
import { Center, Stage, PresentationControls } from '@react-three/drei';
import Shelf from './Shelf.jsx';
import CameraRig from './CameraRig.jsx';

export default function Experience() {
    return <>
        <color args={['#f1f1f1']} attach="background" />

        {/* <Perf position="top-left" /> */}

        <CameraRig>
            <Center>
                <Stage 
                    adjustCamera={0} 
                    intensity={5} 
                    environment="city" 
                    shadows={ { type: 'contact', opacity: 0.3, blur: 3}}
                >
                    <PresentationControls
                        global
                        config={{ mass: 2, tension: 100 }}
                        snap={{ mass: 4, tension: 100 }}
                        rotation={[0, 0.3, 0]}
                        polar={[-Math.PI / 6, Math.PI / 6]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                    >
                        <Shelf />
                    </PresentationControls>
                </Stage>
            </Center>
        </CameraRig>
    </>
}