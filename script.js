
function Pres_ENTER(comando,console_id){

    var line_DE_COMANDOS=document.getElementById(console_id);
                var valor_onclick=line_DE_COMANDOS.getAttribute("oninput");
                
                line_DE_COMANDOS.setAttribute("onclick",valor_onclick);
                
                const PRESS_ENTER = new KeyboardEvent("keyup", {
                bubbles: true, cancelable: true,keyCode: 13,target:line_DE_COMANDOS,key:"Enter",code:"Enter"
                });
                
                line_DE_COMANDOS.value=comando;
            
                    
                   line_DE_COMANDOS.click();
                   line_DE_COMANDOS.dispatchEvent(PRESS_ENTER)       
}

//! VARIABLES DE ENTORNO
var coche_consola_W// guarda  el id de la consola de forma global 
var coche_consola_I// guarda  el id de la consola para el robot
var array_coches_CVN=[]// guarda los coches encontrados y que no tienen CVN
var text_analytic// este es el texto que sale por consola 
var con//contador para los cvp
var status_CMD// indica en que comando tenemos que continuar 

//!VARIABLES DE ENTORNO

//este evento recoge el elemento donde se ha realizado el click para extraer su id de esta  forma sabremos el numero de consola donde se va a ejecutar los comandos-- inicio
document.body.addEventListener("click",(e)=>{

    var Data_texarea=e.path[0].getAttribute("id")
    var es_un_id_V=/cryptics\d{1,}_cmd_shellbridge_shellWindow_top_left_modeString_cmdPromptInput/.test(Data_texarea)
    if(es_un_id_V){
        coche_consola_W=e.path[0].getAttribute("id")
        var n_id=/\d/.exec(coche_consola_W);
        var idSPAN="cryptics"+n_id+"_cmd_shellbridge_shellWindow_top_left_modeString_cmdPrompt";
        var line_DE_COMANDOS=document.getElementById(idSPAN).getElementsByTagName("span").item(0);
        line_DE_COMANDOS.setAttribute("style","transform: rotate(-90deg);")
        line_DE_COMANDOS.innerText="🔰"
        
            setTimeout(() => {
        line_DE_COMANDOS.setAttribute("style","transform: rotate(0deg);")
        line_DE_COMANDOS.innerText=">"
        coche_consola_W="";
            },4000);

    }
})
//este evento recoge el elemento donde se ha realizado el click para extraer su id de esta  forma sabremos el numero de consola donde se va a ejecutar los comandos-- FIN
// funcion iniciar ===> esta funcion realiza la asignacion del id para la consola obteniendolo del global, luego realiza una comprobacion determinando si el usuario quiere o no iniciar el robot 
function iniciar(){
    coche_consola_I=coche_consola_W
    var hayConsola=/cryptics\d{1,}_cmd_shellbridge_shellWindow_top_left_modeString_cmdPromptInput/.test(coche_consola_I)
    if(hayConsola){
        new R_coches()
    }else{
        alert("Tiene que hacer un  click en la linea de comandos 👉 : > (Aquí alado)")
    }
    
  

}
// funcion iniciar ===> esta funcion realiza la asignacion del id para la consola obteniendolo del global, luego realiza una comprobacion determinando si el usuario quiere o no iniciar el robot 


// class R_coches===> esta clase realiza una evaluacion del texto de la consola  y así rastrear los coches que aparecen, de  no tener ningun coche seguimos con la clase criterio_M>>>
class R_coches{
    constructor(){
        this.evaluacionCRR()
    }


    evaluacionCRR(){
        //obtenemos el texto de consola -- inicio
        var numero_id_console=/\d/.exec(coche_consola_I);
        var text_numero_id="cryptics"+numero_id_console[0]+"_cmd_shellbridge_shellWindow_top_left_modeString_currentCommand"
        var text_console=document.getElementById(text_numero_id);
         text_analytic=text_console.innerText;
         //obtenemos el texto de consola -- fin
         var coche=/CCR.*HK/.test(text_analytic)
         if(coche){
            this.R_texto()
         }else{
            new criterio_M()
         }

        
    }

    // la funcion R_texto  ===> se encarga de evaluar si los coches tienen EVN o no de esta  forma podemos insertar los que no tienen coches en  un array para poder listarlos mas adelante
    R_texto(){//obtenemos el texto en pantalla y buscamos los coches  y los guardamos en el array de coches 
        
        //!obtenemos todos los coches que aparecen en la pantalla 
        var full_coches=text_analytic.match(/\d{1,}\s{0,}CCR.*HK.*(\n.*){1,5}(\*\*SEE RTSVCC\*\*)|\d{1,}\s{0,}CCR.*HK.*(\n.*){1,16}(\*\*SEE RTSVCC\*\*)|\d{1,}\s{0,}CCR.*HK.*(\n.*){1,10}.*(?=\n\)\>)/g)
        
        for (let index = 0; index <= full_coches.length; index++) {
            var element = full_coches[index];
          
            var test_evn=/EVN\-\w{1,}/.test(element);
           
            if(test_evn!=true){
                var numero_segmento=/^\d{1,}/.exec(element)
                
                if(numero_segmento!=null){
                    array_coches_CVN.push(numero_segmento)
                }
                
            }
        }
  
        new criterio_M()
    }

    



}
// class R_coches===> esta clase realiza una evaluacion del texto de la consola  y así rastrear los coches que aparecen, de  no tener ningun coche seguimos con la clase criterio_M>>>

// classe criterio_M  esta clase se encarga de evaluar mejor dicho,si hay un "AP" en la pantalla ya que de estarlo tenemos que dejar de buscar ya que no hay mas coches apartir de ahi-
// Por lo que  si hay un Ap tenemos que ejecutar el comando CVP para los coches que no tengan EVN que se encuentran en el array "array_coches_CVN" (class CVP -- LEER COMENTARIO)
// de no tener AP  en la pantalla continuamos presionando M para seguir buscando , en este caso definimos el status_CMD para indicar que seguira despues (CLASS CONTINUAR --LEER COMENTARIO)
class criterio_M{
    constructor(){
        this.evaluar()
    }

    evaluar(){
        var hay_M=/\d{1,}\s{0,}AP/.test(text_analytic)
        if(hay_M!=false){
            //alert("TOCA PONER LOS QUE NO TIENEN EVN Y DAR QN")
            new CVP()
            console.log(array_coches_CVN)
        }else{
            // ESTE FRAGMENTO DE CODIGO DETERMINA SI HAY QUE PARAR LA EJECICIO YA QUE AL FINAL DE LA COLA SI  NO HAY VALOR EL ROBOT EJECUTARA M SIEMPRE POR LO QUE HAY QUE DECIRLE QUE CUANDO SALGA 
            // "CATEGORIA DE COLA VACIA" HAY QUE  PARAR
            var detener=/CATEGORIA DE COLA VACIA/.test(text_analytic)
            if(detener){
                alert("El robot de colas ha terminado")
                parar()
            }else{
            status_CMD="M";
            Pres_ENTER("M",coche_consola_I)
            new cargando()
        }
        }
    }

}

// Esta clase realiza  la introduccion de todos los coches que no tengan EVN , previamente se han ingresado en el array  array_coches_CVN.
class CVP{
constructor(){
    this.intro_cvp()
}
intro_cvp(){
    if(array_coches_CVN[con]!=undefined){
        var segmento="CVP/S"+array_coches_CVN[con]+"/ET"
        Pres_ENTER(segmento,coche_consola_I)
        status_CMD="CVP"
        new cargando()
    }else{
        array_coches_CVN=[]
        con=0;
        Pres_ENTER("QN",coche_consola_I)
        status_CMD="QN"
        new cargando()
    }
    
}
}

// esta clase se encarga de evaluar si el texto en pantalla ya ha cargado, lo hacemos mirando la clase del campo de carga de amadeus en este caso  "processing" 
// comprueba si esta clase se ha ido ya que si no esta significa que el texto ya es accesible , por lo contrario , si se mantiene significa que sigue cargando 
class cargando{
    constructor(){
        this.cargando()
    }
    cargando(){
        var numero_id_console=/\d/.exec(coche_consola_I);
        
    var text_numero_id="cryptics"+numero_id_console[0]+"_cmd_shellbridge_shellWindow_top_left_modeString_currentCommand"
    var text_analytic_carga=document.getElementById(text_numero_id);
    var text_error=text_analytic_carga.innerText;    
     var ejecutando_QM=/Se está ejecutando Quality Monitor\.\.\.|Se está ejecutando File Finishing\.\.\./.test(text_error)   
        var carga=document.getElementById("cryptics"+numero_id_console[0]+"_cmd_shellbridge_shellWindow_top_left_modeString_currentCommand").getElementsByTagName("div").item(0).getElementsByTagName("div").item(1).getElementsByTagName("div").item(0).getAttribute("class")    
            if(carga != "processing"& ejecutando_QM!=true){
                new CONTINUAR()
             }else{
                 setTimeout(() => {
                     new cargando()
                 }, 1000);
                 }
      
        
           
    }
}

// LA CLASE CONTINUAR DETERMINA QUE COMANDO TIENE QUE SEGUIR SEGUN EL STATUS_CMD DEFINIDO PREVIAMENTE CUANDO UTILIZAMOS LA FUNCION PRESS_ENTER DE ESTA FORMA NO TENEMOS QUE ANIDAR LOS COMANDOS YA QUE EN ESTE "PANEL" SE PODRA DETERMINAR QUE CONTINUARA
class CONTINUAR{
    constructor(){
        this.next()
    }
    next(){
        switch (status_CMD) {
            case "CVP":
                    con++
                    new CVP
                break;
        
                case "M":
                   
                    new R_coches
                break;
                case "QN":
                   
                    new R_coches
                break;
        }
    }
}
// CAMBIA EL VALOR DEL ID HA NULL PARA QUE DEJE DE OBTENER EL TEXTO Y DE ESTA FORMA PARAR LA EJECUCION. 
function parar(){
 coche_consola_I=null;
 array_coches_CVN=[]
 con=0;
}
// evaluacion del texto para detener la ejecucion 


function quitar_colas(){
   if(document.getElementById("etoolbar_toolbarSection_sellToolbar_id")){
    var nodo_menu=document.getElementById("etoolbar_toolbarSection_sellToolbar_id");
    var boton_funcion=document.createElement("li");
    boton_funcion.setAttribute("id","pmo");
    boton_funcion.setAttribute("class","item  uicItemHtml  null newPROFILE");
    boton_funcion.setAttribute("style","background: #18c8de;color: white;padding: 10px;border: solid #f4f4f4;");
    boton_funcion.innerText="FUNCION_COLAS";
    boton_funcion.addEventListener("click",iniciar);
    var boton_funcion_Parar=document.createElement("li");
    boton_funcion_Parar.setAttribute("id","pmo");
    boton_funcion_Parar.setAttribute("class","item  uicItemHtml  null newPROFILE");
    boton_funcion_Parar.setAttribute("style","background: #18c8de;color: white;padding: 10px;border: solid #f4f4f4;");
    boton_funcion_Parar.innerText="PARAR COLAS";
    boton_funcion_Parar.addEventListener("click",parar);
    if(document.getElementById("pmo")){

    }else{
        nodo_menu.appendChild(boton_funcion);
        nodo_menu.appendChild(boton_funcion_Parar);
    }
    
    
    
   }else{

    console.log("abrir terminal");
   
   }
     

}

//console.log(codeAREA,vcn);
  

document.body.addEventListener("click",quitar_colas);
