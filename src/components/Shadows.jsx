import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

export default function Shadows() {

    return (
        <AccumulativeShadows 
            temporal 
            frames={100} 
            alphaTest={0.9} 
            scale={15}
        >
            <RandomizedLight 
                amount={4} 
                radius={9} 
                intensity={2.2}
                ambient={1}
                position={[1, 1, -10]}
            />
            <RandomizedLight 
                amount={4}
                radius={1}
                intensity={1}
                ambient={2.2}
                position={[-1, 1, -9]}
            />
        </AccumulativeShadows>
    )
}