const parse = (requestQuery) => {
    const option = {
        page: 1,
        limit: 100,
    };
    const query = {

    };
    for (let [key, val] of Object.entries(requestQuery)) {
        if (key==="tags") {
            query[key] = Array.isArray(val) ? { $all : val} : { $all : [val] }
        } else if (key==="acceptance") {
            query[key] = { $gt : Number(val)};
        } else if (key==="page" || key==="limit") {
            option[key] = parseInt(val);
        } else if (key==="paid") {
            query[key] = val==="true";
        } else if (key==="difficulty") {
            query[key] = val;
        }
    }
    return {option, query};
}

export default parse;