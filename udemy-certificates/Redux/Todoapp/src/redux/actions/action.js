import * as actionTypes from "./actionTypes";

export const addTask = (task) => ({
    type: actionTypes.ADD_TASK,
    payload: { task }
});

export const removeTask = (id) => ({
    type: actionTypes.REMOVE_TASK,
    payload: { id }
});

export const completedTask = (id) => ({
    type: actionTypes.TASK_COMPLETED,
    payload: { id }
});

export const fetchTasks = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=1");
            const data = await response.json();
            dispatch({ type: actionTypes.FETCH_TASKS, payload: data });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
};