import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentStyle } from '../../redux/canvasSlice';

const CustomizerPanel = () => {
    const selectedComponent = useSelector(state => state.canvas.selectedComponent);
    const dispatch = useDispatch();
    const [style, setStyle] = useState({});
    const [styleUnits, setStyleUnits] = useState({});
    const [contentValue, setContentValue] = useState('');

    useEffect(() => {
        if (selectedComponent) {
            const initialStyle = selectedComponent?.componentInfo?.attributes?.style || {};
            setStyle(initialStyle);
            setContentValue(selectedComponent?.componentInfo?.value || '');

            // Initialize units to 'px' for each relevant style field, if not already set
            const initialUnits = {};
            Object.keys(initialStyle).forEach(key => {
                if (['fontSize', 'width', 'height', 'marginTop'].includes(key)) {
                    const value = initialStyle[key];
                    if (typeof value === 'string') {
                        // Extract the numeric part and unit (if any)
                        initialUnits[key] = value.replace(/[\d.]+/, '');
                    } else {
                        // Default unit as 'px' for non-string values
                        initialUnits[key] = 'px';
                    }
                }
            });
            setStyleUnits(initialUnits);
        }
    }, [selectedComponent]);

    const handleStyleChange = (e, unit) => {
        const { name, value } = e.target;
        const updatedStyle = { ...style, [name]: `${value}${unit || styleUnits[name] || ''}` };
        setStyle(updatedStyle);

        if (selectedComponent) {
            dispatch(updateComponentStyle({
                instanceId: selectedComponent.instanceId,
                id: selectedComponent.pk,
                style: updatedStyle,
            }));
        }
    };

    const handleUnitChange = (e, property) => {
        const { value } = e.target;
        const updatedUnits = { ...styleUnits, [property]: value };
        setStyleUnits(updatedUnits);

        // Apply the selected unit to the current style value
        handleStyleChange({ target: { name: property, value: parseFloat(style[property]) || '' } }, value);
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

        const fields = [];
        for (const property in style) {
            switch (property) {
                case 'fontSize':
                case 'width':
                case 'height':
                case 'marginTop':
                case 'marginBottom':
                case 'paddingTop':
                case 'paddingBottom':
                case 'paddingLeft':
                case 'paddingRight':
                case 'borderRadius':
                    fields.push(
                        <div key={property}>
                            <label className="block mt-2 capitalize">{property}</label>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="number"
                                    name={property}
                                    value={parseFloat(style[property]) || ''}
                                    onChange={(e) => handleStyleChange(e)}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                <select
                                    value={styleUnits[property] || 'px'}
                                    onChange={(e) => handleUnitChange(e, property)}
                                    className="p-2 border border-gray-300 rounded"
                                >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                    <option value="em">em</option>
                                    <option value="rem">rem</option>
                                </select>
                            </div>
                        </div>
                    );
                    break;
                case 'color':
                case 'backgroundColor':
                    fields.push(
                        <div key={property}>
                            <label className="block mt-2 capitalize">{property}</label>
                            <input
                                type="color"
                                name={property}
                                value={style[property] || '#000000'}
                                onChange={handleStyleChange}
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                        </div>
                    );
                    break;
                case 'textAlign':
                    fields.push(
                        <div key={property}>
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
                        </div>
                    );
                    break;
                default:
                    break;
            }
        }

        return (
            <>
                {fields}
                {(selectedComponent.componentInfo.type === 'text' || selectedComponent.componentInfo.type === 'heading' || selectedComponent.componentInfo.type === 'button') && (
                    <div>
                        <label className="block mt-2">Text Content</label>
                        <input
                            type="text"
                            value={contentValue}
                            onChange={handleContentChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold">Customizer - {selectedComponent?.componentInfo.label}</h2>
            {selectedComponent ? (
                <div>{renderCustomizationFields()}</div>
            ) : (
                <p>Select a component to customize</p>
            )}
        </div>
    );
};

export default CustomizerPanel;
