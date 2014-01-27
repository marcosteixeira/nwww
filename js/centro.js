var centroTrabalho = {
    
    
    recursos: function(){
        
        var url = localStorage.getItem("url_sistema") + "APIMobile.do?metodo=listarRecursos&token="+ localStorage.getItem("token_sistema") + "&idCentroTrabalho=" + localStorage.getItem("idCentroTrabalho");
        
        $.ajax({ 
          cache : false,    
          type: 'GET',
          url: url,
          dataType: 'jsonp', 
          jsonp: false,
          jsonpCallback: "resposta",
          success: function(data) {
            centroTrabalho.preencherRecursos(data);                
          }
        });
    },

    preencherRecursos: function(data){
        $('#recursos').append("<ul id='ul-recursos' class='nav nav-pills nav-stacked text-center'></ul>");
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