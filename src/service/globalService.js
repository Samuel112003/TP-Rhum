async function search(req, res, Model, errorMessage){
    let query = {};
    for(let key in req.query){
        if(req.query[key]){
            query[key] = req.query[key];
        }
    }

    try {
        const results = await Model.find(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: errorMessage, error });
    }
}

module.exports = {
    search
}