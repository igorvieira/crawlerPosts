function crawlerThisWebSite(){
		var inputFormato = document.getElementById('formato').value
		var inputFont = document.getElementById('fonte').value
			
			if(inputFormato == '' && inputFont == ''){
				swal({
					title: "Error!",
					text: "Por favor preencha os campos!",
					type: "error",
                    timer: 2000,    
					confirmButtonText: "Fechar"
					});
			}else{
				swal({
						title: "Sweet!",
						text: "Carregando os dados",
						timer: 2000,
						imageUrl: "./dist/images/loader.gif"			
					});
			}	
				
		}