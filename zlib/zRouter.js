// define zRouter
const zRouter = (function () {
    
})();
function Router(root,content,beforeFunc,successFunc,errorFunc) {
    //路由注册
    root = '/'+fixPath(root)+'/';
    content = $(content);
    currentPath = "";
    
    //加载内容
    function loadContent(path = hashPath(),redirect = false) {
        let params = getParams(path);
        path = fixPath(path);
        beforeFunc && beforeFunc(path);
        if (currentPath != path){
            $.ajax({
                type: "get",
                url: location.origin + root + path + '.html', //需要获取的页面内容
                async: true,
                success: function(data){
                    html = $(data);
                    // content.html(html); //将获取到的内容放到当前页面的.content中
                    successFunc && successFunc(path,html);
                },
                error: function(err){
                    html = "404 Not Found";
                    // content.html(html);
                    errorFunc && errorFunc(err,html);
                }
            });
            addHistory(path,redirect);
            currentPath = path;
        }
    }
    //挂载内容
    function mountContent(html) {
        content.html(html);
    }
    
    //路径历史
    function addHistory(path,replace) {
        if (replace){
            history.replaceState(null, "", location.origin+'/#/'+path);
        }
        else{
            history.pushState(null, "", location.origin+'/#/'+path);
        }
    }
    
    function redirect() {
        loadContent(undefined, true);
    }
    redirect();

    window.onhashchange = function(event){
        loadContent(undefined, true);
    }
    

    function fixPath(path) {
        let param = path.split('?');
        path = param[0] || "";
        path = path.split('/').filter((s)=>{return s && s.trim();});
        path = path.join('/');
        return path;
    }

    function hashPath(hash = location.hash) {
        if (hash[0]==='#')
            hash = hash.slice(1);
        return fixPath(hash) || "home";
    }

    function getParams(path) {
        let param = path.split('?');
        param = param[1] || "";
        return param.split('&')
            .filter((s)=>{return s && s.trim();})
            .filter((s)=>{
                let map = s.split('=');
                return {
                    key: map[0],
                    value: map[1]
                };
            });
    }

    this.loadContent = loadContent;
    this.mountContent = mountContent;
    this.addHistory = addHistory;
    this.redirect = redirect;
}