module.exports.posts = function(req,res){
    return res.render('posts',{
        user_name: "karl",
        img_link: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRaHRzt0RdW2STKmq0caLN62qoLdZavoGMcD81B4pamyfyRUYxiwyX9DGGJKWsOKlmwLKarIGoZi3J4FPU",
    });
}