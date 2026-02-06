import { useEffect } from 'react';
import { ChevronLeft, ChevronUp } from './ListIconSvg.jsx';
import useGame from '../stores/useGame.jsx';
import Product from '../data/product-shelf.json';

export default function Overlay({
    cartList,
    setCartList,
    addCharge,
    setAddCharge,
}) {
    return (
        <div>
            <Backbtn />
            <Configurator 
                cartList={cartList} 
                setCartList={setCartList}
                addCharge={addCharge} 
                setAddCharge={setAddCharge} 
            />
        </div>
    )
}

function Backbtn() {
    const { introToggle } = useGame((state) => (state));

    return (
        <div className="backbtn">
            <button 
                className="backbtn__btn"
                onClick={introToggle}
            >
                <ChevronLeft />
                <span>Go Back</span>
            </button>
        </div>
    )
}

function Drag() {
    return (
        <div className="move">
            <div className="move__arrow up"></div>
            <div className="move__arrow left"></div>
            <div className="move__arrow right"></div>
            <div className="move__arrow down"></div>
            <div className="move__cursor">
                <span className="move__text">Drag</span>
            </div>
        </div>
    )
}

function Configurator({
    cartList,
    setCartList,
    addCharge,
    setAddCharge,
}) {
    const gameState = useGame((state) => state);

    // Calc add charge
    const stageChangeFnc = (e) => {
        gameState.changeStage(parseFloat(e.target.value));
        calcAddCharge();
    }
    const columnChangeFnc = (e) => {
        gameState.changeColumn(parseFloat(e.target.value));
        calcAddCharge();
    }

    const calcAddCharge = () => {
        let shelfNum = gameState.column * gameState.stage;
        let cartValue = cartList[0].cost;
        setAddCharge(Number(cartValue) * shelfNum - Number(cartValue));
    }

    // Texture option btn click
    const textureWoodFnc = () => {
        gameState.textureWood();

        const removeItem = '0000003001';
        const updateItem = '0000003000';

        optionRemove(removeItem);
        optionAdd(updateItem);
    }
    const textureSimpleFnc = () => {
        gameState.textureSimple();

        const removeItem = '0000003000';
        const updateItem = '0000003001';

        optionRemove(removeItem);
        optionAdd(updateItem);
    }

    // Add option 
    const optionAdd = (updateItem) => {
        const updateData = Product.find(p => p.id === updateItem);
        setCartList(prevList => [...prevList, updateData]);
    }
    
    // Remove option
    const optionRemove = (removeItem) => {
        const updateList = cartList.filter(item => item.id !== removeItem);
        setCartList(updateList);
    }

    // Put back shelf count
    useEffect(() => {
        if (!gameState.putBack) {
            return;
        }

        gameState.changeColumn(1);
        gameState.changeStage(1);

        gameState.putBackToggle();
    }, [gameState.putBack]);

    return (
        <div className={`configurator${gameState.mobileConfig ? ' is-active' : ''}`}>
            <div 
                className="configurator__arrow"
                onClick={gameState.mbConfigToggle}
            >
                <ChevronUp color="#8d8d8d" />
            </div>
            <div className="configurator__wrapper">
                <div className="configurator__box">
                    <div className="configurator__titlebox">
                        <h2 className="configurator__title">Custom Shelf</h2>
                        <p className="configurator__price">${cartList[0].cost} {addCharge > 0 ? <span className="price-add">( +${(addCharge).toFixed(2)} )</span> : ''}</p>
                        <p className="configurator__info">Let's customize the shelf to your liking.</p>
                    </div>
                    <div className="configurator__inner">
                        <h3 className="configurator__label">- Texture</h3>
                        <div className="configurator__one">
                            <div className="configurator__tab col-2">
                                <div 
                                    className={`configurator__tab__label${gameState.texture === 'wood' ? ' is-active' : ''}`}
                                    onClick={textureWoodFnc} 
                                >
                                    <span>Wood</span>
                                </div>
                                <div 
                                    className={`configurator__tab__label${gameState.texture === 'simple' ? ' is-active' : ''}`}
                                    onClick={textureSimpleFnc} 
                                >
                                    <span>Simple</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {gameState.texture === 'simple' ?
                        <div className="configurator__inner">
                            <h3 className="configurator__label">- Color</h3>
                            <div className="configurator__one">
                                <div className="configurator__btnbox">
                                    {gameState.bodyColors.map((item) => (
                                        <div 
                                            key={item.color}
                                            className={`configurator__color${gameState.bodySelectedColor === item.color ? ' is-active' : ''}`}
                                            style={{
                                                borderColor: gameState.bodySelectedColor === item.color ? 
                                                item.color === '#f9f9f9' ? '#e6e6e6' : `${item.color}`
                                                : ''}}
                                            aria-label={item.name}
                                            onClick={()=> {gameState.setBodySelectedColor(item.color)}}
                                        >
                                            <span 
                                                className={`configurator__color__inner${item.color === '#f9f9f9' ? ' add-border' : ''}`}
                                                style={{backgroundColor: item.color}}
                                            ></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    : '' }
                    <div className="configurator__inner">
                        <h3 className="configurator__label">- Column ( Set: {gameState.column} )</h3>
                        <div className="configurator__one">
                            <input 
                                className="configurator__step" 
                                type="range" name="column" 
                                min="1" 
                                max="5" 
                                step="1" 
                                value={gameState.column} 
                                onChange={columnChangeFnc}
                            />
                        </div>
                    </div>
                    <div className="configurator__inner">
                        <h3 className="configurator__label">- Stage ( Set: {gameState.stage} )</h3>
                        <div className="configurator__one">
                            <input 
                                className="configurator__step" 
                                type="range" 
                                name="stage" 
                                min="1" 
                                max="5" 
                                step="1" 
                                value={gameState.stage}
                                onChange={stageChangeFnc}
                            />                        
                        </div>
                    </div>
                    <button 
                        className="configurator__done"
                        onClick={() => alert('Thanks for playing !\nThis is a dummy site so nothing will happen 👀')}
                    >
                        Add to cart ( ${
                            (+cartList[0].cost + addCharge).toFixed(2) + ' '
                        } )
                    </button>
                </div>
            </div>
            <Drag />
        </div>
    )
}