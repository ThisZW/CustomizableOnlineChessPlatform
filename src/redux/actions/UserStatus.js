import {
    GUEST_ID_GENERATED,
    FETCH_ONLINE_USER_LIST
} from '../../constants/ActionTypes'

export const setGuestId = guestId => dispatch => {
    console.log(guestId)
    dispatch({
        type: GUEST_ID_GENERATED,
        guestId
    })
}

export const setUserList= onlineUsers => dispatch =>{
    dispatch({
        type:FETCH_ONLINE_USER_LIST,
        onlineUsers
    })
    
}