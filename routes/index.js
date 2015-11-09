var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/lookup', function(req, res){
	cname = (req.body.cname);
	url = 'https://www.zaubacorp.com/companysearchresults/' + JSON.stringify(cname);
	console.log(url);
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var title;

    //var json = { title : "", release : "", rating : ""};

	    if($('#results').length != 0){
    	console.log("inif");
    	$('#results').filter(function(){
    	var data = $(this);
    	console.log("here");
    	url = data.find("a").first().attr("href");
    	console.log("hahf");
    	console.log(url);
    	request(url, function(error, response, html){
    		if(!error){
    			var $ = cheerio.load(html);
    			var table;
    			$('html').filter(function(){
    				var html = $(this);
    				title = html.find('title').first().html();
    				table = (html.find('table').first().html());
    			})

    			res.render('data', {title: title, table: table});
    		}            
    	})
       // json.title = title;
       // json.release = release;
   })
    }
    else
    	res.status(404).send('Company Not Found!');

    }
})
});

	module.exports = router;