const lastId = {id: 0};

export function nextId() {
    lastId.id++;
    return `${lastId.id}`;
}