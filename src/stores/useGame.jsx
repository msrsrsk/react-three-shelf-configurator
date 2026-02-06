import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(subscribeWithSelector((set) => {
    return {
        putBack: true,
        loading: true,
        intro: true,
        texture: 'wood',
        column: 5,
        stage: 5,

        bodySelectedColor: '#12CBC4',
        bodyColors: [
            {
                color: '#12CBC4',
                name: 'Blue Martina',
            },
            {
                color: '#A3CB38',
                name: 'Android Green',
            },
            {
                color: '#FFC312',
                name: 'Sunflower',
            },
            {
                color: '#EE5A24',
                name: 'Puffins Bill',
            },
            {
                color: '#ED4C67',
                name: 'Bara Red',
            },
            {
                color: '#333',
                name: 'Dark Charcoal',
            },
            {
                color: '#6f360e',
                name: 'Darker Brown',
            },
            {
                color: '#f9f9f9',
                name: 'Light White Smoke',
            },
        ],
        setBodySelectedColor: (color) => set({ bodySelectedColor: color }),

        putBackToggle: () => {
            set((state) => ({ 
                ...state,
                putBack: false 
            }))
        },
        loadingToggle: () => {
            set((state) => ({ 
                ...state,
                loading: false 
            }))
        },
        introToggle: () => {
            set((state) => ({ intro: !state.intro }))
        },
        changeColumn: (setColumn) => {
            set((state) => ({ 
                ...state,
                column: setColumn 
            }))
        },
        changeStage: (setStage) => {
            set((state) => ({ 
                ...state,
                stage: setStage 
            }))
        },
        mbConfigToggle: () => {
            set((state) => ({ mobileConfig: !state.mobileConfig }))
        },
        textureSimple: () => {
            set((state) => {
                if (state.texture === 'wood') {
                    return {texture: 'simple'}
                }

                return {}
            })
        },
        textureWood: () => {
            set((state) => {
                if (state.texture === 'simple') {
                    return {texture: 'wood'}
                }

                return {}
            })
        },
    }
}))