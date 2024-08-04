
function logs_req(table, req) {
console.log(`${table}.get()`);
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
}



export {
    logs_req
}