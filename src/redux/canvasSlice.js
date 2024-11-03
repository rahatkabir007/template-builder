import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    initialData: [],
    components: [],
    selectedComponent: null,
};

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setInitialData(state, action) {
            state.initialData = action.payload;
        },
        setComponents(state, action) {
            state.components = action.payload;
        },
        setSelectedComponent(state, action) {
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
                    return sub;
                });

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

export const { setInitialData, setComponents, setSelectedComponent, updateComponentStyle } = canvasSlice.actions;
export default canvasSlice.reducer;
