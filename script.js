function buscar_Match(expresionregular,textoareaw){
    var  buscando_Match=expresionregular.test(textoareaw);
    var  buscando_Match_Plano=expresionregular.exec(textoareaw);

        if(buscando_Match===true ){


                return buscando_Match_Plano[0];

            }
            }
            function creartexto(inpuText){
                var TextoAcolocar=document.createTextNode(inpuText);
                return TextoAcolocar;
                }
                var tempo=0;   
               
class correNuevo{
  constructor(){
      this.analisis()
      this.tope=0;
     }
     
  analisis(){
    var fuente=document.getElementsByClassName("speedModePanel")[0];
    
    if(fuente!=null||fuente!=undefined){
        tempo=0;
        this.inicializarBusqueda()

    }else{
        tempo++
        console.log("cargando..."+tempo);
        if(tempo===20){
        
        
        
    }else{
        
        setTimeout(()=> this.analisis(),1000);
    }

  }
  }

  inicializarBusqueda(){
    
    var codigo_Fuente=document.getElementsByClassName("speedModePanel")[0].innerText;
   // console.log(codigo_Fuente);
   // var coche=codigo_Fuente.indexOf(/CCR.*HK.*/)>1; //? hay coche en esta pantalla ?
    var coche=/CCR.*HK/.test(codigo_Fuente); //? hay coche en esta pantalla ?
    var numero_lineas_Y=codigo_Fuente.match(/(?<=\n\s{0,2})\d{1,}/g);
    var numero_Reserva=codigo_Fuente.match(/(?<=\s{3}.*\d{2}.*\/.*\s{3}).*(?=\n\s{0,}1)/);
    var ultima_linea_numero_Y=numero_lineas_Y.pop();
    //console.log("valor de Y : "+ultima_linea_numero_Y);
    var array=[];
   
    
    //console.log(ultima_linea_numero_Y);
    
        
    var numeroMAS=0;

    if(coche===true){
        //AHORA QUE HEMOS ENCONTRADO LOS COCHES LOS ANALISAMOS 
        var Coches_Encontrados=codigo_Fuente.match(/\d{1,}\s{0,}CCR.*HK.*(\n.*){1,10}(\*\*SEE RTSVCC\*\*)|\d{1,}\s{0,}CCR.*(\n.*){1,10}.*(?=\n\)\>)/g);
        var numero_Coches=Coches_Encontrados.length;
        
        
        for(var i=0;i<=numero_Coches;i++){
           
            var EVN=/EVN\-\w{1,}/.test(Coches_Encontrados[i]);
           var numero_segmento=buscar_Match(/^\s{0,2}\d{1,}/,Coches_Encontrados[i])
            
            if(numero_segmento!=undefined){
               // var numero_lineas_CCR=Coches_Encontrados[i].match(/.*\n/g)
                     
                if(EVN!=true){
                        console.log("En la reserva:>> "+numero_Reserva+"\n"+"Se ha emitido el segmeto  : \n"+numero_segmento);
                        
                                array.push(numero_segmento);// ACCION
                        

                        
                     }else{
                         //console.log("El segmento "+numero_segmento+" tiene EVN")
                     
                       //
                       
                      
                           
                            
                        }
                
        }
    
    
    }
    if(array.length === 0){
        var  AP=/\d{1,}\s{0,}AP/.test(codigo_Fuente);
        if(AP===true){
            setTimeout(()=> this.Pulsar_Enter_QD(),700);
            //this.Pulsar_Enter_QD();
        }else{
            this.Pulsar_Enter_M()
        }
    //this.inicializarBusqueda()
    }else{
   var CVP = setInterval(CVPSEGMENTO,1500);

    function CVPSEGMENTO(){
        
        if(array[numeroMAS]!=undefined){
           
            var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
            var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
            line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
            
            const PRESS_ENTER = new KeyboardEvent("keyup", {
            bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
            });
            //line_DE_COMANDOS[0].value=segmento_V;
          
          
            line_DE_COMANDOS[0].value="CVP/S"+array[numeroMAS]+"/ET";
            line_DE_COMANDOS[0].click();
           
            line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
            var line_x = localStorage.getItem('CVP_NUMERO');
    
    if(line_x!=null){
        if(line_x===array[numeroMAS]){
            clearInterval(CVP);
          // console.log("si coincide");
         // return this.Pulsar_Enter_QD();
          localStorage.removeItem('CVP_NUMERO');
          var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
          var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
          line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
          
          const PRESS_ENTER = new KeyboardEvent("keyup", {
          bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
          });
          
          line_DE_COMANDOS[0].value="QD"
      
             line_DE_COMANDOS[0].click();
             line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
           
           return  setTimeout(()=> new correNuevo(),700)
        

        }else{
            //console.log("no coincide");
        }
    }
    
    localStorage.setItem('CVP_NUMERO',array[numeroMAS]);
        }
        
        //aqui tenemos que implementar si la hora de inicio se paso 
        
        if(numeroMAS >= array.length){
            
        clearInterval(CVP);
        var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
            var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
            line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
            
            const PRESS_ENTER = new KeyboardEvent("keyup", {
            bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
            });
            //line_DE_COMANDOS[0].value=segmento_V;
          
          
            line_DE_COMANDOS[0].value="RT";
           
            line_DE_COMANDOS[0].click();
           
            line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
            setTimeout(()=> new correNuevo(),700);
            
        }
        numeroMAS++;
         
    }
}
 }else{
        //no hay coches introducimos comando M 
        var  AP=/\d{1,}\s{0,}AP/.test(codigo_Fuente);
            if(AP===true){
                setTimeout(()=> this.Pulsar_Enter_QD(),700);
                //this.Pulsar_Enter_QD();
            }else{
                this.Pulsar_Enter_M()
            }
        //this.inicializarBusqueda()
    }
    
  }

  Pulsar_Enter_RT(){
    var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
    var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
    line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
    
    const PRESS_ENTER = new KeyboardEvent("keyup", {
    bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
    });
    //line_DE_COMANDOS[0].value=segmento_V;
  
  
    line_DE_COMANDOS[0].value="RT";
    line_DE_COMANDOS[0].click();
   
    line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
    setTimeout(()=> new correNuevo(),1000);

      
}
  Pulsar_Enter_EVN(segmento_V){
    var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
    var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
    line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
    
    const PRESS_ENTER = new KeyboardEvent("keyup", {
    bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
    });
    //line_DE_COMANDOS[0].value=segmento_V;
  
  
    line_DE_COMANDOS[0].value="CVP/S"+segmento_V+"/ET";
    line_DE_COMANDOS[0].click();
   
    line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
   //
   // setTimeout(()=> this.Pulsar_Enter_RT(),2500);
       // line_DE_COMANDOS[0].click();
       // line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
}
Pulsar_Enter_M(num){
    
    var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
    var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
    line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
    
    const PRESS_ENTER = new KeyboardEvent("keyup", {
    bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
    });
    
    line_DE_COMANDOS[0].value="m"

    setTimeout(()=>{
        line_DE_COMANDOS[0].click();
        line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
        setTimeout(()=> new correNuevo(),700);
    },1000);
    
}

Pulsar_Enter_QD(){
    localStorage.removeItem('CVP_NUMERO');
    var line_DE_COMANDOS=document.getElementsByClassName("cmdPromptInput");
    var valor_onclick=line_DE_COMANDOS[0].getAttribute("oninput");
    line_DE_COMANDOS[0].setAttribute("onclick",valor_onclick);
    
    const PRESS_ENTER = new KeyboardEvent("keyup", {
    bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS[0],key:"Enter",code:"Enter"
    });
    
    line_DE_COMANDOS[0].value="QN"

       line_DE_COMANDOS[0].click();
       line_DE_COMANDOS[0].dispatchEvent(PRESS_ENTER)
       setTimeout(()=>{new correNuevo()},700)
  
    
}


//aqi

}

function iniciar(){
    localStorage.removeItem('CVP_NUMERO');
    new correNuevo()
}

function quitar_colas(){
   if(document.getElementById("etoolbar_toolbarSection_sellToolbar_id")){
    var nodo_menu=document.getElementById("etoolbar_toolbarSection_sellToolbar_id");
    var boton_funcion=document.createElement("li");
    boton_funcion.setAttribute("id","pmo");
    boton_funcion.setAttribute("class","item  uicItemHtml  null newPROFILE");
    boton_funcion.setAttribute("style","background: #18c8de;color: white;padding: 10px;border: solid #f4f4f4;");
    boton_funcion.innerText="FUNCION_COLAS";
    boton_funcion.addEventListener("click",iniciar);
    if(document.getElementById("pmo")){

    }else{
        nodo_menu.appendChild(boton_funcion);
    }
    
    
    
   }else{

    console.log("abrir terminal");
   
   }
     

}

//console.log(codeAREA,vcn);
  

document.body.addEventListener("click",quitar_colas);
