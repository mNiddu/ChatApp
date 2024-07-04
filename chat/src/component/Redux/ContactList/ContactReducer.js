// reducers.js
const initialstate = {
    contacts: []
};

const ContactReducer = (state = initialstate, action) => {
    console.log(action.payload, 'action.payload');
    switch (action.type) {
        case 'ContactList':
            return {
                ...state,
                contacts: action.payload
            };
        default:
            return state;
    }
};

export default ContactReducer;
