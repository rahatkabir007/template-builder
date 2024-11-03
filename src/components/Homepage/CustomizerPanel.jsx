import React, { useState, useEffect } from 'react';

const CustomizerPanel = ({ component }) => {
    const [style, setStyle] = useState(component ? component.style : {});

    useEffect(() => {
        if (component) {
            setStyle(component.style);
        }
    }, [component]);

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        setStyle((prevStyle) => ({ ...prevStyle, [name]: value }));
    };

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-lg font-semibold">Customizer</h2>
            {component ? (
                <div>
                    <label className="block mt-2">Font Size</label>
                    <input
                        type="number"
                        name="fontSize"
                        // value={style.fontSize || ''}
                        onChange={handleStyleChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    <label className="block mt-2">Color</label>
                    <input
                        type="color"
                        name="color"
                        // value={style.color || ''}
                        onChange={handleStyleChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                </div>
            ) : (
                <p>Select a component to customize</p>
            )}
        </div>
    );
};

export default CustomizerPanel;
