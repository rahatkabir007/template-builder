import React from 'react';


const SvgIconRenderer = (props) => {

    const { width, height, path, style, fill, pathFill, className, viewBox } = props;

    return <svg className={className} style={{ width: width, height: height, ...style }} fill={fill} viewBox={viewBox}>
        <path fill={pathFill ?? "#FFF"}
            d={path} />
    </svg>
};

export default SvgIconRenderer;
