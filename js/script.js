$( document ).ready(function() {
	$('#url_sistema').val("http://192.168.1.22:8080/pcp/");
	$('#usuario_sistema').val("MenorAprendiz");
	$('#senha_sistema').val("123456");


	$('#salvar_configuracao').click(function() {    
  	localStorage.setItem("url_sistema", $('#url_sistema').val());
  	localStorage.setItem("usuario_sistema", $('#usuario_sistema').val());
  	localStorage.setItem("senha_sistema", $('#senha_sistema').val());

    login();
	});

});

function login(){
  validarPreenchimento();
  var jsonUsuario = "{\"login\":\""+  localStorage.getItem("usuario_sistema") + "\", \"senha\": \"" + localStorage.getItem("senha_sistema") + "\"}";
  var url = localStorage.getItem("url_sistema") + "APIDispositivoMovel.do?metodo=loginPcpJSONP&data="+ jsonUsuario;

  $.ajax({ 
          type: 'GET',
          url: url,
          dataType: 'jsonp', 
          jsonp: false,
          jsonpCallback: "resposta",
          success: function(data) {
            if(data.sucesso == "true"){
              $.cookie('sessaoCookie', data.sessaoCookie);
              $.cookie('JSESSIONID', data.sessaoCookie);

              localStorage.setItem("JSESSIONID", data.sessaoCookie); 
              ocultarSenha();
                       
            }else{
              alert("Falha ao conectar ao Nomus PCP");
            }              
          }
      });
}

function ocultarSenha(){
  $('#senha-sistema').hide();
  $('#usuario_sistema').prop('disabled', true);
  $('#label-login').text("Logado como:"); 
}

function validarPreenchimento(){
  if (localStorage.getItem("url_sistema") == null || localStorage.getItem("url_sistema") == ""){
    alert("Preencha o campo URL Nomus PCP nas configurações");
  }

  if (localStorage.getItem("usuario_sistema") == null || localStorage.getItem("usuario_sistema") == ""){
    alert("Preencha o campo Login nas configurações");
  }

  if (localStorage.getItem("senha_sistema") == null || localStorage.getItem("senha_sistema") == ""){
    alert("Preencha o campo Senha nas configurações");
  }
}