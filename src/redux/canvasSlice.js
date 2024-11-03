// redux/slice.js
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
            const { id, style, content } = action.payload;
            const componentToUpdate = state.components.find(comp =>
                comp.subComponents.some(sub => sub.pk === id)
            );

            if (componentToUpdate) {
                const subComponentToUpdate = componentToUpdate.subComponents.find(sub => sub.pk === id);
                if (subComponentToUpdate) {
                    // Update style and content in the selected subcomponent
                    subComponentToUpdate.componentInfo.attributes.style = { ...subComponentToUpdate.componentInfo.attributes.style, ...style };
                    if (content !== undefined) {
                        subComponentToUpdate.componentInfo.value = content;
                    }
                }
            }
        },
    },
});

export const { setComponents, selectComponent, updateComponentStyle } = canvasSlice.actions;
export default canvasSlice.reducer;
