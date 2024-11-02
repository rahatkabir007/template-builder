// CustomizerPanel.js
import React from 'react';

function CustomizerPanel({ component, onCustomize }) {
    if (!component) return null;

    const handleChange = (field, value) => {
        onCustomize(component.id, field, value);
    };

    return (
        <div className="customizer-panel">
            <h3>Customize {component.componentInfo.name}</h3>
            {component.subComponents.map((sub, index) => (
                <div key={index}>
                    <label>{sub.componentInfo.label}</label>
                    {sub.componentInfo.type === "text" && (
                        <input
                            type="text"
                            value={sub.componentInfo.value}
                            onChange={(e) => handleChange("value", e.target.value)}
                        />
                    )}
                    {sub.componentInfo.type === "image" && (
                        <input
                            type="text"
                            value={sub.componentInfo.src}
                            onChange={(e) => handleChange("src", e.target.value)}
                        />
                    )}
                    {/* Add more fields for customization as needed */}
                </div>
            ))}
        </div>
    );
}

export default CustomizerPanel;
