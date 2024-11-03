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
            const { id, style } = action.payload;
            const component = state.components.find(comp => comp.id === id);
            if (component) {
                component.style = { ...component.style, ...style };
            }
        },
    },
});

export const { setComponents, selectComponent, updateComponentStyle } = canvasSlice.actions;
export default canvasSlice.reducer;
