import * as actionTypes from "../actions/actionTypes";

const initialState = {
    tasks: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            return { ...state, tasks: [...state.tasks, { id: Date.now(), title: action.payload.task, completed: false }] };
        case actionTypes.REMOVE_TASK:
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload.id) };
        case actionTypes.TASK_COMPLETED:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, completed: true } : task)
            };
        case actionTypes.FETCH_TASKS:
            return { ...state, tasks: action.payload };
        default:
            return state;
    }
};

export default todoReducer;
