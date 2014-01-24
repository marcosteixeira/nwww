$( document ).ready(function() {
  
	$('#url_sistema').val("http://192.168.1.22:8080/pcp/");
	$('#token_sistema').val("jmhybikb");


	$('#salvar_configuracao').click(function() {    
  	localStorage.setItem("url_sistema", $('#url_sistema').val());
  	localStorage.setItem("token_sistema", $('#token_sistema').val());

    login(false);
	});

});

function login(redireciona){
  validarPreenchimento(redireciona);
  var jsonUsuario = "{\"token\":\""+  localStorage.getItem("token_sistema") + "\"}";
  var url = localStorage.getItem("url_sistema") + "APIMobile.do?metodo=login&data="+ jsonUsuario;

  $.ajax({ 
          type: 'GET',
          url: url,
          dataType: 'jsonp', 
          jsonp: false,
          jsonpCallback: "resposta",
          success: function(data) {
            if(data.sucesso == "true"){              
              sucessoLogin(data.usuario);                       
            }else{              
              alert("Falha ao conectar ao Nomus PCP");
            }              
          }
  });
}

function sucessoLogin(usuario){
  localStorage.setItem("usuario_sistema", usuario);
  $('#token_sistema').val(usuario);
  $('#token_sistema').prop('disabled', true);
  $('#label-login').text("Logado como:"); 
}

function validarPreenchimento(redireciona){
  var validou = false;
  if (localStorage.getItem("url_sistema") == null || localStorage.getItem("url_sistema") == ""){
    alert("Preencha o campo URL Nomus PCP nas configurações");
    validou = true;
  }

  if (localStorage.getItem("token_sistema") == null || localStorage.getItem("token_sistema") == ""){
    alert("Preencha o campo Token nas configurações");
    validou = true;
  }

  if(redireciona && validou){
    window.location.replace("cfg.html");
  }

}