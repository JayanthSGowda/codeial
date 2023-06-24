module.exports.home = function (req, res){
    return res.end('<h1>app express is running</h1> <a href="/about">about</a>')
}