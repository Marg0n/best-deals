// Function to save state to localStorage
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        // Save the state under 'cartState'
        localStorage.setItem('cartState', serializedState);
    } catch (e) {
        console.warn('Could not save state', e);
    }
};

// Function to load state from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            // If no state in localStorage, return undefined (so that Redux can use initial state)
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn('Could not load state', e);
        return undefined;
    }
};