var gitcmd = require('git-command-line');

var path = "..";
var Git = new gitcmd(path);
Git.status().then(function(res) {
	console.log("git status on '", path, "': ", res, "\n---\n"); 
}).then(function() {
   return Git.pull("--dry-run").then(function(res) {
   //return Git.status("-uno").then(function(res) {
       console.log("git pull on '", path, "': ", res, "\n---\n"); 
}).fail(function(err) {
    console.error(err);
})
});
