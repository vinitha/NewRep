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


    homefn: function(){
		
            var dfd = $.Deferred();
  
       
			 $.ajaxSetup({ cache: false });

      $.ajax({
    url: 'http://dynmsales.com/api/get_page/?id=133',
    type: 'GET',
	  dataType: "jsonp",
    success: function(res) {
		                          
		 var headline = res.page;
		  
			  $('#home-data').html(headline.title); 
                    var source   = $("#home-template").html();
                    var template = Handlebars.compile(source);
                    var homeData = template(headline);
                    $('#home-template').html(homeData);
                    $('#home-data').trigger('create');
                    dfd.resolve(data);

                
       
		
       console.log(res);
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
$( document ).bind( "mobileinit", function() {
  // Make your jQuery Mobile framework configuration changes here!
$.support.cors = true;.
  $.mobile.allowCrossDomainPages = true;
});
