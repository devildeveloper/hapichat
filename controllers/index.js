var Path = require('path');
var controllers = {
	home : function(req,res){
		if(req.auth.isAuthenticated){
			//console.log(req.auth.credentials);
			res.view('home',{user:req.auth.credentials});
		}else{
			res('<a href="/login">login</a>')
		}
	},
	login:function(req,res){
		var t = req.auth.credentials;
		//console.log(t);
		var profile ={
			displayName:t.profile.displayName,
			email:t.profile.email,
			photo:'https://graph.facebook.com/'+t.profile.id+'/picture?width=140&height=140',
			url:t.profile.raw.link
		}
		//console.log(profile)
		req.auth.session.clear();
		req.auth.session.set(profile);
		res.redirect('/');
	},
	logout:function(req,res){
		req.auth.session.clear();
		res.redirect('/login');
	}
}
module.exports = controllers;
