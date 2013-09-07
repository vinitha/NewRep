var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        
    },
/*homefn: function(){
	$.ajaxSetup({ cache: false });
	$('#home-data').html("wlcome");
		$.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
	$.jsonp({
		 url: 'http://dynmsales.com/api/get_page/?id=133',
		callbackParameter: 'callback',
		success: function(data, status) {
			var s=data.page;
			$('#home-data').html(s.title);
			},
		error: function(){
			$('#home-data').html('There was an error loading the feed');
		}
	});

}, */
  homefn: function(){
		//$('#home-data').html("helloo"); 
            var dfd = $.Deferred();
  
      
			 $.ajaxSetup({ cache: false });

      $.ajax({
    url: 'http://dynmsales.com/api/get_page/?id=133',
    type: 'GET',
	  dataType: "jsonp",
    success: function(res) {
		                          
		 var headline = res;
		  //alert(headline.title);
			 // $('#home-data').html(headline.title); 
			 //var obj = $.parseJSON(res.page);
//console.log( headline.page);
                    var source   = $("#home-template").html();
                    var template = Handlebars.compile(source);

                    var homeData = template(headline);
										//console.log("hello");
                    $('#home-data').html(homeData);
                    $('#home-data').trigger('create');
                    dfd.resolve(res);

                
       
		
      // console.log(res);
    }
});
			
            return dfd.promise();
       

      

        
    },
    single: function() {
        
            var postDataStorage = localStorage.getItem('postData');
            var source   = $("#single-template").html();
            var template = Handlebars.compile(source);
            var postData = template(JSON.parse(postDataStorage));    
            $('#single-data').html(postData);

    },

    portfolio: function(){
        $.ajax({
            url: 'http://alexbachuk.com/?json=get_recent_posts&post_type=portfolio',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#portfolio-template").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#portfolio-data').html(portfolioData);
                $('#portfolio-data').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });
    }

};

