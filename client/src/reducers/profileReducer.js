import { GET_PROFILE } from "../actions/constants";

const initialState = {
    profile: null,
    loading: true,
    error: {}
};

const profile = ( state=initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default profile;