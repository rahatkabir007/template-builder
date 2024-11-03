import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentStyle } from '../../redux/canvasSlice';


const CustomizerPanel = () => {
    const selectedComponent = useSelector(state => state.canvas.selectedComponent);
    const dispatch = useDispatch();
    const [style, setStyle] = useState(selectedComponent?.style || {});

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        const updatedStyle = { ...style, [name]: value };
        setStyle(updatedStyle);

        if (selectedComponent) {
            dispatch(updateComponentStyle({ id: selectedComponent.id, style: updatedStyle }));
        }
    };

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold">Customizer</h2>
            {selectedComponent ? (
                <div>
                    <label className="block mt-2">Font Size</label>
                    <input
                        type="number"
                        name="fontSize"
                        value={style.fontSize || ''}
                        onChange={handleStyleChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    <label className="block mt-2">Color</label>
                    <input
                        type="color"
                        name="color"
                        value={style.color || ''}
                        onChange={handleStyleChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    {/* Add more customizations as needed */}
                </div>
            ) : (
                <p>Select a component to customize</p>
            )}
        </div>
    );
};

export default CustomizerPanel;
