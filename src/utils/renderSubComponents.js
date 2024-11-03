export const renderSubComponents = (subComponents, handleSelectedComponent, selectedComponent) => {

    return subComponents?.map((subComp, index) => {
        const { type, src, alt, value, as, attributes } = subComp.componentInfo;
        const style = attributes?.style || {};

        const handleClick = () => {
            handleSelectedComponent(subComp)
        };


        const className = `hover:border hover:border-psclightblack hover:border-dashed duration-300 transition-all p-2 rounded-md ${selectedComponent?.instanceId === subComp.instanceId && selectedComponent?.pk === subComp?.pk ? 'border border-psclightblack border-dashed' : ''}`
        switch (type) {
            case 'image':
                return (
                    <div className={className}>
                        <img
                            key={index}
                            src={src}
                            alt={alt}
                            style={style}
                            onClick={handleClick}
                            className="cursor-pointer"
                        />
                    </div>
                );
            case 'text':
                return (
                    <div className={className}>
                        <p
                            key={index}
                            style={style}
                            onClick={handleClick}
                            className="cursor-pointer"
                        >
                            {value}
                        </p>
                    </div>
                );
            case 'heading':
                const HeadingTag = as || 'h1' || 'h2' || 'h3' || 'h4' || 'h5' || 'h6';
                return (
                    <div className={className}>
                        <HeadingTag
                            key={index}
                            style={style}
                            onClick={handleClick}
                            className="cursor-pointer"
                        >
                            {value}
                        </HeadingTag>
                    </div>
                );
            case 'button':
                return (
                    <div className={className}>
                        <div
                            key={index}
                            onClick={handleClick}
                            className="cursor-pointer"
                            style={style}
                        >
                            <span>
                                {value}
                            </span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    });
};