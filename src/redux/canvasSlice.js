import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    initialData: [],
    components: [],
    selectedComponent: null,
    undoStack: [],
    redoStack: []
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
        // updateComponentStyle(state, action) {
        //     const { instanceId, id, style, content } = action.payload;
        //     const componentToUpdate = state.components.find(comp => comp.instanceId === instanceId);

        //     if (componentToUpdate) {
        //         const updatedSubComponents = componentToUpdate.subComponents.map(sub => {
        //             if (sub.pk === id) {
        //                 return {
        //                     ...sub,
        //                     componentInfo: {
        //                         ...sub.componentInfo,
        //                         attributes: {
        //                             ...sub.componentInfo.attributes,
        //                             style: { ...sub.componentInfo.attributes.style, ...style }
        //                         },
        //                         value: content !== undefined ? content : sub.componentInfo.value,
        //                     }
        //                 };
        //             }
        //             return sub;
        //         });

        //         return {
        //             ...state,
        //             components: state.components.map(comp =>
        //                 comp.instanceId === instanceId ? { ...comp, subComponents: updatedSubComponents } : comp
        //             ),
        //         };
        //     }
        // },
        updateComponentStyle(state, action) {
            const { instanceId, id, style, content } = action.payload;
            const componentToUpdate = state.components.find(comp => comp.instanceId === instanceId);

            if (componentToUpdate) {
                // Push current state to undoStack before changing it
                state.undoStack.push({ instanceId, id, previousStyle: componentToUpdate.subComponents });
                state.redoStack = [];  // Clear redoStack whenever a new change is made

                // Update the style as usual
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

                state.components = state.components.map(comp =>
                    comp.instanceId === instanceId ? { ...comp, subComponents: updatedSubComponents } : comp
                );
            }
        },
        undo(state) {
            if (state.undoStack.length > 0) {
                const lastChange = state.undoStack.pop();
                state.redoStack.push(lastChange);

                const componentToRestore = state.components.find(comp => comp.instanceId === lastChange.instanceId);
                if (componentToRestore) {
                    componentToRestore.subComponents = lastChange.previousStyle;
                }
            }
        },
        redo(state) {
            if (state.redoStack.length > 0) {
                const redoChange = state.redoStack.pop();
                state.undoStack.push(redoChange);

                const componentToRestore = state.components.find(comp => comp.instanceId === redoChange.instanceId);
                if (componentToRestore) {
                    componentToRestore.subComponents = redoChange.previousStyle;
                }
            }
        }
    },
});

export const { setInitialData, setComponents, setSelectedComponent, updateComponentStyle, undo, redo } = canvasSlice.actions;
export default canvasSlice.reducer;
