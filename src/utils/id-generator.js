const lastId = {id: 0};

export function nextId() {
    lastId.id+=Math.random();
    return `${lastId.id}`;
}