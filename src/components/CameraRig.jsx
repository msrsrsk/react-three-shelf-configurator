import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useGame from '../stores/useGame.jsx';
import { easing } from 'maath';

export default function CameraRig({children}) {
    const { intro } = useGame((state) => ({ intro: state.intro }));
    const group = useRef();

    const mqlWidth = window.matchMedia('(min-width: 900px)');

    useFrame((state, delta) => {
        const handleMediaQuery = function(mqlWidth) {
            if (!mqlWidth.matches) {
                easing.damp3(state.camera.position,
                    intro ? [0, 6, 25] : [0, 1.5, 35], 
                    0.25, 
                    delta
                )
            } else if (mqlWidth.matches) {
                easing.damp3(state.camera.position,
                    intro ? [0, 6, 25] : [4.5, 6, 25], 
                    0.25, 
                    delta
                )
            }
        };
        
        mqlWidth.addListener(() => handleMediaQuery(mqlWidth));
        handleMediaQuery(mqlWidth);
    });

    return (
        <group ref={group}>
            {children}
        </group>
    )

}