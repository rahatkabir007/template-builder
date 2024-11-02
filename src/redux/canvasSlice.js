// redux/canvasSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    components: JSON.parse(localStorage.getItem('canvasData')) || [],
    history: [],
    future: [],
};

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        addComponent(state, action) {
            state.history.push([...state.components]);
            state.future = [];
            state.components.push(action.payload);
            saveToLocalStorage(state.components);
        },
        updateComponent(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.components.findIndex(comp => comp.id === id);
            if (index !== -1) {
                state.history.push([...state.components]);
                state.future = [];
                state.components[index] = { ...state.components[index], ...updatedData };
                saveToLocalStorage(state.components);
            }
        },
        removeComponent(state, action) {
            state.history.push([...state.components]);
            state.future = [];
            state.components = state.components.filter(comp => comp.id !== action.payload);
            saveToLocalStorage(state.components);
        },
        undo(state) {
            if (state.history.length > 0) {
                const previous = state.history.pop();
                state.future.push([...state.components]);
                state.components = previous;
                saveToLocalStorage(state.components);
            }
        },
        redo(state) {
            if (state.future.length > 0) {
                const next = state.future.pop();
                state.history.push([...state.components]);
                state.components = next;
                saveToLocalStorage(state.components);
            }
        },
    },
});

const saveToLocalStorage = (components) => {
    localStorage.setItem('canvasData', JSON.stringify(components));
};

export const { addComponent, updateComponent, removeComponent, undo, redo } = canvasSlice.actions;
export default canvasSlice.reducer;
