export const  UPDATE = 'UPDATE';
export const  UPDATEHEIGHT = 'UPDATEHEIGHT';
export const  UPDATEWIDTH = 'UPDATEWIDTH';
export const  CALLINFO = 'CALLINFO';
export function updateLogin(login) {
    return {
        type: UPDATE,
        payload: {
            login
        }
    }
}
export function updateHeight(height) {
    return {
        type: UPDATEHEIGHT,
        payload: {
            height
        }
    }
}
export function updateWidth(width) {
    return {
        type: UPDATEWIDTH,
        payload: {
            width
        }
    }
}
export function updateCallInfo(number) {
    return {
        type: CALLINFO,
        payload: {
            number:number?number:''
        }
    }
}