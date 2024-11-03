// redux/canvasSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    components: [],
    selectedComponent: null,
};

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setComponents(state, action) {
            state.components = action.payload;
        },
        selectComponent(state, action) {
            state.selectedComponent = action.payload;
        },
        updateComponentStyle(state, action) {
            const { instanceId, id, style, content } = action.payload;
            const componentToUpdate = state.components.find(comp => comp.instanceId === instanceId);

            if (componentToUpdate) {
                const updatedSubComponents = componentToUpdate.subComponents.map(sub => {
                    if (sub.pk === id) {
                        return {
                            ...sub,
                            componentInfo: {
                                ...sub.componentInfo,
                                attributes: {
                                    ...sub.componentInfo.attributes,
                                    style: { ...sub.componentInfo.attributes.style, ...style }
                                },
                                value: content !== undefined ? content : sub.componentInfo.value,
                            }
                        };
                    }
                    return sub; // Return unchanged subcomponents
                });

                // Return a new state array with the updated component
                return {
                    ...state,
                    components: state.components.map(comp =>
                        comp.instanceId === instanceId ? { ...comp, subComponents: updatedSubComponents } : comp
                    ),
                };
            }
        },
    },
});

export const { setComponents, selectComponent, updateComponentStyle } = canvasSlice.actions;
export default canvasSlice.reducer;
