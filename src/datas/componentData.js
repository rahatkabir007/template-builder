export const COMPONENTS = [
    {
        id: "OneProduct",
        componentInfo: {
            name: "One Product",
            attributes: {
                height: 320,
                style: {
                    width: "100%",
                    borderRadius: 12,
                    objectFit: "cover",
                },
            },
        },
        subComponents: [
            {
                "pk": "sub_component_1",
                "sk": "sub_component_1",
                "componentInfo": {
                    "for": "oneProduct.section1.img",
                    "label": "Product Image",
                    "type": "image",
                    "src": "https://react.email/static/braun-collection.jpg",
                    "alt": "Braun Collection",
                    "attributes": {
                        "height": 320,
                        "style": {
                            "width": "100%",
                            "borderRadius": 12,
                            "objectFit": "cover"
                        }
                    }
                }
            },
            {
                "pk": "sub_component_2",
                "sk": "sub_component_2",
                "componentInfo": {
                    "for": "oneProduct.section2.text1",
                    "label": "Sub Title",
                    "type": "text",
                    "value": "Classic Watches",
                    "attributes": {
                        "style": {
                            "marginTop": 16,
                            "fontSize": 18,
                            "lineHeight": "28px",
                            "fontWeight": 600,
                            "color": "rgb(79,70,229)"
                        }
                    }
                }
            },
            {
                "pk": "sub_component_3",
                "sk": "sub_component_3",
                "componentInfo": {
                    "for": "oneProduct.section2.heading1",
                    "label": "Product Title",
                    "type": "heading",
                    "as": "h1",
                    "attributes": {
                        "style": {
                            "fontSize": 36,
                            "lineHeight": "40px",
                            "fontWeight": 600,
                            "letterSpacing": 0.4,
                            "color": "rgb(17,24,39)"
                        }
                    },
                    "value": "Elegant Comfort"
                }
            },
            {
                "pk": "sub_component_4",
                "sk": "sub_component_4",
                "componentInfo": {
                    "for": "oneProduct.section2.text2",
                    "label": "Product Description",
                    "type": "text",
                    "attributes": {
                        "style": {
                            "marginTop": 8,
                            "fontSize": 16,
                            "lineHeight": "24px",
                            "color": "rgb(107,114,128)"
                        }
                    },
                    "value": "Dieter Rams' work has an outstanding quality which distinguishes it from the vast majority of industrial design of the entire 20th Century."
                }
            },
            {
                "pk": "sub_component_5",
                "sk": "sub_component_5",
                "componentInfo": {
                    "for": "oneProduct.section2.text3",
                    "label": "Product Price",
                    "type": "text",
                    "attributes": {
                        "style": {
                            "fontSize": 16,
                            "lineHeight": "24px",
                            "fontWeight": 600,
                            "color": "rgb(17,24,39)"
                        }
                    },
                    "value": "$210.00"
                }
            },
            {
                "pk": "sub_component_6",
                "sk": "sub_component_6",
                "componentInfo": {
                    "for": "oneProduct.section2.button1",
                    "label": "Buy Button",
                    "type": "button",
                    "href": "https://react.email",
                    "attributes": {
                        "style": {
                            "marginTop": 16,
                            "borderRadius": 8,
                            "backgroundColor": "rgb(79,70,229)",
                            "paddingLeft": 24,
                            "paddingRight": 24,
                            "paddingTop": 12,
                            "paddingBottom": 12,
                            "fontWeight": 600,
                            "color": "rgb(255,255,255)"
                        }
                    },
                    "value": "Buy now"
                }
            }
        ],
    },
];

export const textAlign = [
    {
        value: "left",
        label: "Left",
    },
    {
        value: "center",
        label: "Center",
    },
    {
        value: "right",
        label: "Right",
    }
]

export const objectCover = [
    {
        value: "cover",
        label: "Cover",
    },
    {
        value: "contain",
        label: "Contain",
    },
    {
        value: "none",
        label: "None",
    },
    {
        value: "fill",
        label: "Fill",
    },

]

export const units = [
    {
        value: "px",
        label: "px",
    },
    {
        value: "%",
        label: "%",
    },
    {
        value: "em",
        label: "em",
    },
    {
        value: "rem",
        label: "rem",
    },
    {
        value: "vw",
        label: "vw",
    },
    {
        value: "vh",
        label: "vh",
    },
    {
        value: "vmin",
        label: "vmin",
    },
    {
        value: "vmax",
        label: "vmax",
    },
]
