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

        console.log('Received Event: ' + id);
    }
};

var buscaDados = {
    
    
    centrosTrabalho: function(){
        
        var url = localStorage.getItem("url_sistema") + "APIMobile.do?metodo=listarCentrosTrabalho&token="+ localStorage.getItem("token_sistema");
        
        $.ajax({ 
          cache : false,    
          type: 'GET',
          url: url,
          dataType: 'jsonp', 
          jsonp: false,
          jsonpCallback: "resposta",
          success: function(data) {
            if(data.sucesso == "true"){
                buscaDados.preencherCentros(data);    
            }else{
                alert(data.causa);
            }
            
          }
        });
    },

    preencherCentros: function(data){
        $('#centros_trabalho').append("<ul id='ul-centros-trabalho' class='nav nav-pills nav-stacked text-center'></ul>");
        $.each(data, function( index, value ) {
            $('#ul-centros-trabalho').append("<li class='linha-centro-trabalho'>" +            
              "<a href='#'>" +                    
                value.nome +
              "</a>" + 
              "</li>"); 
        });
    }
};
