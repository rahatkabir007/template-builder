// SubComponent.js
import React from 'react';

function SubComponent({ sub }) {
    const { type, value, src, alt, href, attributes } = sub.componentInfo;

    switch (type) {
        case "image":
            return <img src={src} alt={alt} style={attributes.style} />;

        case "text":
            return <p style={attributes.style}>{value}</p>;

        case "heading":
            return React.createElement(
                sub.componentInfo.as || 'h2',
                { style: attributes.style },
                value
            );

        case "button":
            return (
                <a href={href} style={attributes.style}>
                    {value}
                </a>
            );

        default:
            return null;
    }
}

export default SubComponent;
