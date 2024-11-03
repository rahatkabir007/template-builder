import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentStyle } from '../../redux/canvasSlice';

const CustomizerPanel = () => {
    const selectedComponent = useSelector(state => state.canvas.selectedComponent);
    const dispatch = useDispatch();
    const [style, setStyle] = useState({});
    const [contentValue, setContentValue] = useState('');

    useEffect(() => {
        // Populate customizer with default styles when a new component is selected
        if (selectedComponent) {
            setStyle(selectedComponent?.componentInfo?.attributes?.style || {});
            setContentValue(selectedComponent?.componentInfo?.value || '');
        }
    }, [selectedComponent]);

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        const updatedStyle = { ...style, [name]: value };
        setStyle(updatedStyle);

        if (selectedComponent) {
            dispatch(updateComponentStyle({
                instanceId: selectedComponent.instanceId,
                id: selectedComponent.pk,
                style: updatedStyle,
            }));
        }
    };

    const handleContentChange = (e) => {
        const newValue = e.target.value;
        setContentValue(newValue);

        if (selectedComponent) {
            dispatch(updateComponentStyle({
                instanceId: selectedComponent.instanceId,
                id: selectedComponent.pk,
                style,
                content: newValue,
            }));
        }
    };


    const renderCustomizationFields = () => {
        if (!selectedComponent) return null;

        const { type } = selectedComponent.componentInfo;

        switch (type) {
            case 'image':
                return (
                    <>
                        <label className="block mt-2">Width</label>
                        <input
                            type="text"
                            name="width"
                            value={style.width || ''}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <label className="block mt-2">Height</label>
                        <input
                            type="text"
                            name="height"
                            value={style.height || ''}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <label className="block mt-2">Object Fit</label>
                        <select
                            name="objectFit"
                            value={style.objectFit || ''}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="cover">Cover</option>
                            <option value="contain">Contain</option>
                            <option value="fill">Fill</option>
                            <option value="none">None</option>
                        </select>
                    </>
                );
            case 'text':
            case 'heading':
                return (
                    <>
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
                        <label className="block mt-2">Alignment</label>
                        <select
                            name="textAlign"
                            value={style.textAlign || 'left'}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                        <label className="block mt-2">Text Content</label>
                        <input
                            type="text"
                            value={contentValue} // Use the state for content
                            onChange={handleContentChange} // Update content on change
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </>
                );
            case 'button':
                return (
                    <>
                        <label className="block mt-2">Button Text</label>
                        <input
                            type="text"
                            value={contentValue} // Use the state for content
                            onChange={handleContentChange} // Update content on change
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <label className="block mt-2">Background Color</label>
                        <input
                            type="color"
                            name="backgroundColor"
                            value={style.backgroundColor || ''}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <label className="block mt-2">Text Color</label>
                        <input
                            type="color"
                            name="color"
                            value={style.color || ''}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <label className="block mt-2">Alignment</label>
                        <select
                            name="textAlign"
                            value={style.textAlign || 'center'}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold">Customizer - {selectedComponent?.componentInfo.label}</h2>
            {selectedComponent ? (
                <div>
                    {renderCustomizationFields()}
                </div>
            ) : (
                <p>Select a component to customize</p>
            )}
        </div>
    );
};

export default CustomizerPanel;
