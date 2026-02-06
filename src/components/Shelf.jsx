import { Clone, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import useGame from '../stores/useGame.jsx';
import { easing } from 'maath';

export default function Bicycle() {
    const { nodes, materials } = useGLTF('./model/shelf.glb');

    const { texture, bodySelectedColor, column, stage }  = useGame((state) => ({ 
        texture: state.texture,
        bodySelectedColor: state.bodySelectedColor,
        column: state.column,
        stage: state.stage
    }));

    const woodLightTextureProps = useTexture ({
        map: './textures/wood_light/plywood_diff_4k.jpg',
        normalMap: './textures/wood_light/plywood_nor_gl_4k.jpg',
        roughnessMap: './textures/wood_light/plywood_rough_4k.jpg',
        aoMap: './textures/wood_light/plywood_ao_4k.jpg',
    });

    useFrame((_, delta) => {
        easing.dampC(
            materials.Shelf.color,
            bodySelectedColor,
            0.25,
            delta
        );
    });

    return (
        <group 
            castShadow
            receiveShadow
            dispose={null}
            position={[0, 0, 0]}
        >
            {/* Top duplicate */}
            {Array.from({ length: stage }, (_, stageIndex) => (
                <Clone 
                    key={stageIndex}
                    object={nodes.Board_bottom001} 
                    scale={[column, 1, 1]}
                    position-y={nodes.Board_bottom001.position.y + stageIndex * 2}
                    visible={texture === 'simple'}
                />
            ))}
            {Array.from({ length: stage }, (_, stageIndex) => (
                <Clone 
                    key={stageIndex}
                    object={nodes.Board_bottom001} 
                    inject={<meshStandardMaterial {...woodLightTextureProps} />}
                    scale={[column, 1, 1]}
                    position-y={nodes.Board_bottom001.position.y + stageIndex * 2}
                    visible={texture === 'wood'}
                />
            ))}

            {/* Left (fixed) */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Board_side001.geometry}
                position-x={nodes.Board_side001.position.x - (column - 1 ) - (0.059 * (column - 1))}
                material={materials.Shelf}
                visible={texture === 'simple'}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Board_side001.geometry}
                position-x={nodes.Board_side001.position.x - (column - 1 ) - (0.059 * (column - 1))}
                visible={texture === 'wood'}
            >
                <meshStandardMaterial {...woodLightTextureProps} />
            </mesh>

            {/* Left duplicate */}
            {stage >= 2 ?
                Array.from({ length: stage }, (_, stageIndex) => (
                    <Clone 
                        key={stageIndex}
                        object={nodes.Board_side001} 
                        position={[nodes.Board_side001.position.x - (column - 1) - (0.059 * (column - 1)), nodes.Board_side001.position.y + stageIndex * 2, nodes.Board_side001.position.z]}
                        visible={texture === 'simple'}
                    />
                ))
                : ''
            }
            {stage >= 2 ?
                Array.from({ length: stage }, (_, stageIndex) => (
                    <Clone 
                        key={stageIndex}
                        object={nodes.Board_side001} 
                        inject={<meshStandardMaterial {...woodLightTextureProps} />}
                        position={[nodes.Board_side001.position.x - (column - 1) - (0.059 * (column - 1)), nodes.Board_side001.position.y + stageIndex * 2, nodes.Board_side001.position.z]}
                        visible={texture === 'wood'}
                    />
                ))
                : ''
            }

            {/* Bottom (fixed) */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Board_bottom.geometry}
                material={materials.Shelf}
                scale={[column, 1, 1]}
                visible={texture === 'simple'}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Board_bottom.geometry}
                scale={[column, 1, 1]}
                visible={texture === 'wood'}
            >
                <meshStandardMaterial {...woodLightTextureProps} />
            </mesh>

            {/* Right duplicate */}
            {Array.from({ length: stage }, (_, stageIndex) => (
                <group key={stageIndex}>
                    {Array.from({ length: column }, (_, columnIndex) => {
                        const stageOffset = stageIndex >= 1 ? stageIndex : 0;
                        const positionX = (
                            column === 1 ?
                            (nodes.Board_side001.position.x + columnIndex + 1) * 2
                            : nodes.Board_side001.position.x - (column - 1) - (0.05 * (column - 1)) + (column * 0.03) + (columnIndex * 2.1) + 2
                            + (columnIndex === 1 ? columnIndex * -0.05
                                : columnIndex === 2 ? columnIndex * -0.033
                                : columnIndex === 3 ? columnIndex * -0.028
                                : columnIndex === 4 ? columnIndex * -0.024
                                : '' )
                        );
                        const positionY = nodes.Board_side001.position.y + stageOffset * 2;

                        return (
                            <Clone 
                                key={columnIndex}
                                object={nodes.Board_side001} 
                                position-x={positionX}
                                position-y={positionY}
                                visible={texture === 'simple'}
                            />
                        );
                    })}
                </group>
            ))}

            {Array.from({ length: stage }, (_, stageIndex) => (
                <group key={stageIndex}>
                    {Array.from({ length: column }, (_, columnIndex) => {
                        const stageOffset = stageIndex >= 1 ? stageIndex : 0;
                        const positionX = (
                            column === 1 ?
                            (nodes.Board_side001.position.x + columnIndex + 1) * 2
                            : nodes.Board_side001.position.x - (column - 1) - (0.05 * (column - 1)) + (column * 0.03) + (columnIndex * 2.1) + 2
                            + (columnIndex === 1 ? columnIndex * -0.05
                                : columnIndex === 2 ? columnIndex * -0.033
                                : columnIndex === 3 ? columnIndex * -0.028
                                : columnIndex === 4 ? columnIndex * -0.024
                                : '' )
                        );
                        const positionY = nodes.Board_side001.position.y + stageOffset * 2;

                        return (
                            <Clone 
                                key={columnIndex}
                                object={nodes.Board_side001} 
                                inject={<meshStandardMaterial {...woodLightTextureProps} />}
                                position-x={positionX}
                                position-y={positionY}
                                visible={texture === 'wood'}
                            />
                        );
                    })}
                </group>
            ))}
        </group>
    )
}
useGLTF.preload('./model/shelf.glb');