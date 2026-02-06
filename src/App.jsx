import { useEffect, useState } from 'react'; 
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import useGame from './stores/useGame.jsx';
import Experience from './components/Experience.jsx';
import Intro from './components/Intro.jsx';
import Overlay from './components/Overlay.jsx';

export default function App() {
    const [addCharge, setAddCharge] = useState(0);
    const [cartList, setCartList] = useState([
        {
            id: '0000003000',
            name: 'wood_shelf',
            cost:'33.00',
        },
    ]);

    const { intro, loadingToggle }  = useGame((state) => ({ 
        intro: state.intro,
        loadingToggle: state.loadingToggle
    }));

    const { progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            loadingToggle();
        }
    }, [progress]);

    return <>
        <Canvas
            flat
            shadows
            camera={ {
                fov: 50,
                near: 0.1,
                position: [ 0, 0.5, 2 ]
            } }
        >
            <Experience />
        </Canvas>
        {intro ? <Intro /> : 
            <Overlay 
                cartList={cartList} 
                setCartList={setCartList} 
                addCharge={addCharge} 
                setAddCharge={setAddCharge} 
            />
        }
    </>
}