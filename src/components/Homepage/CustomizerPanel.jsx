import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComponentStyle } from '../../redux/canvasSlice';
import { renderCustomizationFields } from '../../utils/renderCustomizationFields';


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

            const initialUnits = {};
            Object.keys(initialStyle).forEach(key => {
                if (['fontSize', 'width', 'height', 'marginTop'].includes(key)) {
                    const value = initialStyle[key];
                    if (typeof value === 'string') {
                        initialUnits[key] = value.replace(/[\d.]+/, '');
                    } else {
                        initialUnits[key] = 'px';
                    }
                }
            });
            setStyleUnits(initialUnits);
        }
    }, [selectedComponent]);

    const handleStyleChange = (e, unit) => {
        e.stopPropagation()
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
        e.stopPropagation()
        const { value } = e.target;
        const updatedUnits = { ...styleUnits, [property]: value };
        setStyleUnits(updatedUnits);
        handleStyleChange({ target: { name: property, value: parseFloat(style[property]) || '' } }, value);
    };

    const handleContentChange = (e) => {
        e.stopPropagation()
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



    return (
        <div className="bg-gray-100 p-4" >
            <h2 className="text-lg font-semibold">Customizer </h2>
            <p> {selectedComponent?.componentInfo.label ? `Component - ${selectedComponent?.componentInfo.label}` : ``}</p>
            {selectedComponent ? (
                <div onClick={(e) => e.stopPropagation()}>{renderCustomizationFields(selectedComponent, style, styleUnits, handleStyleChange, handleUnitChange, handleContentChange, contentValue)}</div>
            ) : (
                <p>No component selected</p>
            )}
        </div>
    );
};

export default CustomizerPanel;