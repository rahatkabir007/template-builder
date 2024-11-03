export const renderSubComponents = (subComponents, handleSelectComponent) => {
    return subComponents?.map((subComp, index) => {
        const { type, src, alt, value, as, attributes } = subComp.componentInfo;
        const style = attributes?.style || {};

        const handleClick = () => handleSelectComponent(subComp);

        switch (type) {
            case 'image':
                return (
                    <img
                        key={index}
                        src={src}
                        alt={alt}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    />
                );
            case 'text':
                return (
                    <p
                        key={index}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {value}
                    </p>
                );
            case 'heading':
                const HeadingTag = as || 'h1';
                return (
                    <HeadingTag
                        key={index}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {value}
                    </HeadingTag>
                );
            case 'button':
                return (
                    <span
                        key={index}
                        // href={href}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {value}
                    </span>
                );
            default:
                return null;
        }
    });
};