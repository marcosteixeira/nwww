var recurso = {
    
    
    recursos: function(){
        
        var url = localStorage.getItem("url_sistema") + "APIMobile.do?metodo=listarApontamentos&token="+ localStorage.getItem("token_sistema") + "&idRecurso=" + localStorage.getItem("idRecurso");
        
        $.ajax({ 
          cache : false,    
          type: 'GET',
          url: url,
          dataType: 'jsonp', 
          jsonp: false,
          jsonpCallback: "resposta",
          success: function(data) {
            recurso.preencherApontamentos(data);                
          }
        });
    },

    preencherApontamentos: function(data){
        $('#apontamentos').append("<ul id='ul-apontamentos' class='nav nav-pills nav-stacked text-center'></ul>");
        $.each(data.recursos, function( index, value ) {
            $('#ul-recursos').append("<a href='javascript:acessarRecurso("+ 
                value.id +
                ")' id='link-"+ 
                value.id +
                "'>" +            
               "<li class='linha-centro-trabalho'>" +                    
                value.nome +
              "</a>" + 
              "</li>"); 
        });
    }
};


function acessarRecurso(idRecurso){
    localStorage.setItem("idRecurso", idRecurso);
    window.location.replace("recurso.html");
}