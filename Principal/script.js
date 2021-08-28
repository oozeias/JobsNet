document.forms['cv_form'].addEventListener('submit', (event) => {
    event.preventDefault();
    const button = document.getElementById('submit-btn');
    const i = document.querySelector('i');
    button.classList.add('buttonload');
    i.classList.add('fa');
    i.classList.add('fa-circle-o-notch');
    i.classList.add('fa-spin');
    
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) 
    }).then((resp) => {
        if (resp.redirected) {
            window.location.href = resp.url;
        }
        return resp.json();
    }).then((body) => {
        if (body.error == 1) {
            alert("Esse CPF já está cadastrado!")
        } 
    }).catch((error) => {
        
    });
    button.classList.remove('buttonload');
    i.classList.remove('fa');
    i.classList.remove('fa-circle-o-notch');
    i.classList.remove('fa-spin');
});


const strCPF = document.getElementById("cpf").value;
const input = document.querySelector("input");

function ValidaCPF(){	
	var cpf=document.getElementById("cpf").value; 
	var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
    const span = document.getElementById("erro-cpf");
	 
	if (cpfValido.test(cpf) == false)	{ 
        span.innerHTML = "Digite um CPF válido";
        span.style.marginTop = "8px"
    } 
    }


  function fMasc(objeto,mascara) {
obj=objeto
masc=mascara
setTimeout("fMascEx()",1)
}

  function fMascEx() {
obj.value=masc(obj.value)
}

   function mCPF(cpf){
cpf=cpf.replace(/\D/g,"")
cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
return cpf
}


function limpa_formulário_cep() {
   
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);

    } 
    else {
        
        limpa_formulário_cep();

        
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    
    var cep = valor.replace(/\D/g, '');

    
    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {

            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";


            
            var script = document.createElement('script');

           
            const url = 'https://viacep.com.br/ws/' + cep + '/json';
            fetch(url)
                .then((response) => response.json())
                .then((body) => meu_callback(body))

        } 
        else {
            
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } 
    else {
        
        limpa_formulário_cep();
    }
};