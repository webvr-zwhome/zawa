export function positionUp(pos) {
    return {
        type: 'UP',
        payload: pos,
    }
}

export function positionDown(pos) {
    return {
        type: 'DOWN',
        payload: pos,
    }
}

export function positionLeft(pos) {
    return {
        type: 'LEFT',
        payload: pos,
    }
}

export function positionRIGHT(pos) {
    return {
        type: 'RIGHT',
        payload: pos,
    }
}