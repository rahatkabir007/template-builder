import React from 'react';
import { objectCover, textAlign, units } from '../datas/componentData';


export const renderCustomizationFields = (selectedComponent, style, styleUnits, handleStyleChange, handleUnitChange, handleContentChange, contentValue) => {
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
                                {
                                    units?.map((unit) => (
                                        <option key={unit?.value} value={unit?.value}>
                                            {unit?.label}
                                        </option>
                                    ))
                                }
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
                            {
                                textAlign.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                );
                break;
            case 'objectFit':
                fields.push(
                    <div key={property}>
                        <label className="block mt-2">Object Fit</label>
                        <select
                            name="objectFit"
                            value={style.objectFit || 'cover'}
                            onChange={handleStyleChange}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            {
                                objectCover.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
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