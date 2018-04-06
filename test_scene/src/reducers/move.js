const initState = {
    cameraPosition: [0, 0, 0],  
}

export function move(state = initState, action) {
    switch(action.type) {
        case 'UP': return {
            cameraPosition: updatePosition('UP', action.payload.pos),
        }
        case 'DOWN': return {
            cameraPosition: updatePosition('DOWN', action.payload.pos),
        }
        case 'LEFT': return {
            cameraPosition: updatePosition('LEFT', action.payload.pos),
        }
        case 'DOWN': return {
            cameraPosition: updatePosition('LEFT', action.payload.pos),
        }
        default: return state
    }
}

function updatePosition(type, pos) {
    let x = pos[0];
    const y = pos[1];
    let z = pos[2];

    if(type === 'UP') {
        return [x, y, z - 1];
    } else if(type === 'DOWN') {
        return [x, y, z + 1];
    } else if(type === 'LEFT') {
        return [x - 1, y, z];
    } else {
        return [x + 1, y, z];
    }
}
