/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//locale = "../../untitled/web/client_check_data";
//server url = "http://95.238.92.51/untitled/web/client_check_data"
const SERVER_URL = "http://localhost:80/client_check_data";
var CHECK_CONNESSIONE = "undefined";    //utilizzata dentro callServer() per stabilire se il server è down o meno
var RESPONSE = "undefined";             //variabile globale utilizzata dal metodo callServer() per comunicare con le funzioni chiamanti (per qualche ragione la chiamata ajax non restituisce valori, quindi ho dovuto fare così per forza)

//funzioni per la chiamata al server
function callServer(parameters){
    $.ajax({
        type         : "POST",
        url          : SERVER_URL,
        data         : parameters,
        async        : false,
        crossBrowser : true,
        success      : function(response) {
            RESPONSE = JSON.parse(response);

        },
        error        : function() {
            CHECK_CONNESSIONE = false;
        }
    });
}
function isOnline(){
    //questa serve per verificare che il telefono abbia almeno una connessione a internet attiva
    //decommentare in fase di produzione

    //var networkState = navigator.connection.type;
    //return ((networkState != Connection.NONE) && (networkState != Connection.UNKNOWN));
    return true;
}
function isServerOnline() {
    var params = {'mode': 'check_connessione'};
    callServer(params);

    while (typeof(RESPONSE) == "undefined"){}

    if (RESPONSE.response == true) {
        RESPONSE = "undefined";
        return true;
    }

    RESPONSE = "undefined";
    return false;
}

//validazione email
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
function isValidName(name){
    var pattern = /[a-zA-Z]+/g;
    return pattern.test(name);
}
function isValidNumber(number){
    var pattern = /^[0-9]*$/;
    return pattern.test(number);
}
function isValidPassword(password){
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
}

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
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('backbutton', this.onBackButton, false);


        //bindo le funzioni da chiamare quando i vari bottoni vengano tappati
        $('#btnLogin').on('tap', function(){
            app.receivedEvent('login');
        });

        $('#txtNome').change(function (){
            if(!$(this).val()){
                    $(this).css("border","none");
                    $(this).removeClass("validated");
                }
                else{
                    if(isValidName($(this).val())){
                        $(this).css("border","green thin solid");
                        $(this).addClass("validated");
                    }
                    else{
                        $(this).css("border","red thin solid");
                        $(this).removeClass("validated");
                    }
            }
        });
        $('#txtCognome').change(function (){
            if(!$(this).val()){
                $(this).css("border","none");
                $(this).removeClass("validated");
            }
            else{
                if(isValidName($(this).val())){
                    $(this).css("border","green thin solid");
                    $(this).addClass("validated");
                }
                else{
                    $(this).css("border","red thin solid");
                    $(this).removeClass("validated");
                }
            }
        });
        $('#txtTelefono').change(function (){
            if(!$(this).val()){
                $(this).css("border","none");
                $(this).removeClass("validated");
            }
            else{
                if(isValidNumber($(this).val())){
                    $(this).css("border","green thin solid");
                    $(this).addClass("validated");
                }
                else{
                    $(this).css("border","red thin solid");
                    $(this).removeClass("validated");
                }
            }
        });
        $('#txtEmailRegister').change(function (){
            if(!$(this).val()){
                $(this).css("border","none");
                $(this).removeClass("validated");
            }
            else {
                var email = $(this).val();
                if (isValidEmailAddress(email)) {
                    if (isOnline()) {
                        if (isServerOnline()) {
                            var params = {'mode': 'check_email', 'email': email};

                            callServer(params);

                            if (RESPONSE.response == true) {
                                $(this).css("border", "red thin solid");
                                $(this).removeClass('validated');
                            }
                            else {
                                $(this).css("border", "green thin solid");
                                $(this).addClass('validated');
                            }

                            RESPONSE = "undefined";
                        }
                        else {
                            alert("Server irraggiungibile. Perfavore riprova più tardi.");
                        }
                    }
                    else {
                        alert("Controlla connessione del tuo telefono.");
                    }
                }
                else {
                    $(this).css("border", "red thin solid");
                    $(this).removeClass('validated');
                    alert("Per favore inserisci un formato email corretto.");
                }
            }
        });
        $('#txtEmailRegisterConfirm').change(function (){
            if(!$(this).val()){
                $(this).css("border","none");
                $(this).removeClass("validated");
            }
            else{
                if($('#txtEmailRegister').val() === $(this).val()){
                    $(this).css("border","green thin solid");
                    $(this).addClass("validated");
                    $('#txtEmailRegister').addClass("validated");
                }
                else{
                    $(this).css("border","red thin solid");
                    $(this).removeClass("validated");
                }
            }
        });
        $('#txtPasswordRegister').change(function (){
            if(!$(this).val()){
                $(this).css("border","none");
                $(this).removeClass("validated");
            }
            else{
                if(isValidPassword($(this).val())){
                    $(this).css("border","green thin solid");
                    $(this).addClass("validated");
                }
                else{
                    $(this).css("border","red thin solid");
                    $(this).removeClass("validated");
                }
            }
        });
        $('#txtPasswordRegisterConfirm').change(function (){
            if(!$(this).val()){
                $(this).css("border","none");
                $(this).removeClass("validated");
            }
            else {
                if ($('#txtPasswordRegister').val() === $(this).val()) {
                    $(this).css("border", "green thin solid");
                    $(this).addClass("validated");
                    $('#txtPasswordRegister').addClass("validated");
                }
                else {
                    $(this).css("border", "red thin solid");
                    $('#txtPasswordRegister').removeClass("validated");
                }
            }
        });
        $('#btnRegistrati').on('tap', function(){
            if($('#txtNome').hasClass('validated')
                && $('#txtCognome').hasClass('validated') && $('#txtTelefono').hasClass('validated')
                && $('#txtEmailRegister').hasClass('validated') && $('#txtEmailRegisterConfirm').hasClass('validated')
                && $('#txtPasswordRegister').hasClass('validated') && $('#txtPasswordRegisterConfirm').hasClass('validated')
            ){
                app.receivedEvent('registrazione');
                $.mobile.changePage('#loginPage');
                $('#txtNome').val('');
                $('#txtCognome').val('');
                $('#txtTelefono').val('');
                $('#txtEmailRegister').val('');
                $('#txtEmailRegisterConfirm').val('');
                $('#txtPasswordRegister').val('');
                $('#txtPasswordRegisterConfirm').val('');
                $('#txtNome').removeClass('validated');
                $('#txtCognome').removeClass('validated');
                $('#txtTelefono').removeClass('validated');
                $('#txtEmailRegister').removeClass('validated');
                $('#txtEmailRegisterConfirm').removeClass('validated');
                $('#txtPasswordRegister').removeClass('validated');
                $('#txtPasswordRegisterConfirm').removeClass('validated');
                $('#txtNome').css("border","none");
                $('#txtCognome').css("border","none");
                $('#txtTelefono').css("border","none");
                $('#txtEmailRegister').css("border","none");
                $('#txtEmailRegisterConfirm').css("border","none");
                $('#txtPasswordRegister').css("border","none");
                $('#txtPasswordRegisterConfirm').css("border","none");
            }
            else{
                alert("Compila tutti i campi.");
            }
        });
        $('#btnRecupera').on('tap', function(){
            app.receivedEvent('recupera_password');
        });
        $('#btnModifica').on('tap', function(){
            app.receivedEvent('modifica_password');
        });
        $('#logoutButton').on('tap', function(){
            app.receivedEvent('logout');
        });
        $('#txtVecchiaPassword').change(function() {
            var utente = JSON.parse(window.localStorage.getItem('utente'));
            if($(this).val() === utente.password){
                $(this).css("border","green thin solid");
                $(this).addClass("validated");
            }
            else{
                $(this).css("border","red thin solid");
                $(this).removeClass("validated");
            }
        });
        $('#txtNuovaPassword').change(function() {
            $(this).css("border","green thin solid");
        });
        $('#txtNuovaPasswordConfirm').change(function() {
            if($('#txtNuovaPassword').val() === $(this).val()){
                $(this).css("border","green thin solid");
                $('#txtNuovaPassword').addClass("validated");
                $(this).addClass("validated");
            }
            else{
                $(this).css("border","red thin solid");
                $(this).removeClass("validated");
                $('#txtNuovaPassword').removeClass("validated");
            }
        });
        $('#btnModificaPassword').on("tap", function() {
            if ($('#txtVecchiaPassword').hasClass('validated') && $('#txtNuovaPassword').hasClass('validated') && $('#txtNuovaPasswordConfirm').hasClass('validated')) {
                //se va tutto bene rimuovo la classe validated, cosicché i campi non risultino pre-validati ad un successivo tap del bottone di modifica
                app.receivedEvent('modifica_password');
                $.mobile.changePage('#userHome');

                $('#txtVecchiaPassword').val('');
                $('#txtNuovaPassword').val('');
                $('#txtNuovaPasswordConfirm').val('');
                $('#txtVecchiaPassword').removeClass('validated');
                $('#txtNuovaPassword').removeClass('validated');
                $('#txtNuovaPasswordConfirm').removeClass('validated');
                $('#txtVecchiaPassword').css("border","none");
                $('#txtNuovaPassword').css("border","none");
                $('#txtNuovaPasswordConfirm').css("border","none");
            }
            else{
                alert("Compila tutti i campi.");
            }
        });

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onResume: function(){
        app.receivedEvent('resume');
    },
    onPause: function(){
        app.receivedEvent('pause');
    },
    onBackButton: function(e){
        //if(typeof(window.sessionStorage.getItem("logged")) != 'undefined' && window.sessionStorage.getItem("logged") == true){
        //   alert(app.activePage.attr('id'));
        //}
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        switch(id) {
            case "deviceready":
                //prima tento la connessione con i dati salvati localmente. Se i dati esistono E sono validi, loggo senza chiedere altro all'utente.
                if(typeof(window.localStorage.getItem("loggedIn"))){
                    if(window.localStorage.getItem("loggedIn") == "true") {
                        var utente = JSON.parse(window.localStorage.getItem("utente"));
                        popolaVistaScheda();
                        //reindirizzo alla user home
                        $('#userHome').find('h3').html("Benvenuto " + utente.nome);
                        $.mobile.changePage("#userHome");
                    }
                }
                break;
            case "resume":

                break;
            case "pause":

                break;
            case "login":
                //login button premuto
                //se i dati locali non sono validi, eseguo la normale procedura di login
                if(isOnline()){
                    if(isServerOnline()){
                        if(loginFunction($('#txtEmail').val(),$('#txtPassword').val()) == true){
                            //verifica se i dati locali della scheda sono aggiornati alla data in cui l'admin ha aggiornato la scheda (arriverà anche una notifica push oppure un'email, però il check lo faccio lo stesso)
                            //se non sono aggiornati riscarico tutti i dati e aggiorno la cache locale (window.localstorage.setItem("scheda"))
                            var utente = JSON.parse(window.localStorage.getItem("utente"));
                            //se data ultimo aggiornamento scheda == null, l'utente non ha mai ricevuto una scheda
                            if(utente.data_ultimo_aggiornamento_scheda == '0000-00-00'){
                                $('#userHomeContent').find('#listview').disabled;
                                setSchermataVuota(utente.nome);
                                $('#userHome').find('h3').html("Benvenuto "+utente.nome);
                                $.mobile.changePage("#userHome");
                            }
                            else{
                                if(!checkSchedaFunction()){ //false vuol dire che la scheda va scaricata di nuovo, vuoi perché sia stata aggiornata oppure perché non ancora presente localmente
                                    //scarica ex-novo la scheda dal server e popola i dati locali
                                    aggiornaSchedaFunction()
                                }
                                var scheda = JSON.parse(window.localStorage.getItem("scheda"));
                                if(scheda[0].id_utente == utente.id){
                                    $('#userHomeContent').find('#nuovoUtente').disabled;
                                    //popolo la vista con la scheda degli esercizi
                                    popolaVistaScheda();

                                    //reindirizzo alla user home
                                    $('#userHome').find('h3').html("Benvenuto "+utente.nome);
                                    $.mobile.changePage("#userHome");
                                }
                            }

                        }
                        else{
                            //mando un alert che informa del fatto che i dati di login non sono validi
                            alert("Dati di login non validi.");
                        }
                    }
                    else{
                        alert("Server irraggiungibile. Perfavore riprova più tardi.");
                    }
                }
                else{
                    alert("Controlla la connessione.");
                }

                //login
                function loginFunction(email,pass){
                    var params = {'mode' : 'login', 'email': email, 'password': pass};  //parametri da passare alla funzione callServer
                    callServer(params);
                    var isLogged = false;

                    while(typeof(RESPONSE) == "undefined"){}

                    if(RESPONSE.response == true){
                        //carico l'utente in memoria locale
                        window.localStorage.setItem("utente", JSON.stringify(RESPONSE.utente));
                        window.localStorage.setItem("loggedIn", "true");
                        isLogged = true;
                    }
                    else {
                        isLogged = false;
                    }
                    RESPONSE = "undefined";
                    return isLogged;
                }

                //funzioni di supporto allo scaricamento dei dati delle schede
                function setSchermataVuota(nome){
                    $('#userHome').find('#userHomeContent').append("" +
                        "<div id='nuovoUtente'></div><p>Ciao "+nome+", ricorda che prima di poter visualizzare la scheda, il tuo allenatore deve fornirtene una.<br/>" +
                        "Riceverai un avviso sul tuo smartphone e una mail che ti informerà della presenza della scheda e di eventuali aggiornamenti.<br/>" +
                        "</p></div>");
                }
                function checkSchedaFunction(){
                    var res = false;

                    if(window.localStorage.getItem("scheda") != null){
                        var utente = JSON.parse(window.localStorage.getItem("utente"));
                        var scheda = JSON.parse(window.localStorage.getItem("scheda"));

                        if(scheda.data_ultimo_aggiornamento_scheda == null){
                            res = false;
                        }
                        else{
                            if (scheda[0].id_utente != utente.id){
                                window.localStorage.setItem("scheda", "");
                            }
                            else {
                                var data_scheda_server = utente.data_ultimo_aggiornamento_scheda;
                                var data_scheda_locale = scheda.data_ultimo_aggiornamento_scheda;

                                if (new Date(data_scheda_locale).getTime() < new Date(data_scheda_server).getTime()) { //se la data locale è inferiore a quella del server, devo riaggiornare
                                    res = false;
                                }
                                else { //altrimenti lascio così com'è
                                    res = true;
                                }
                            }
                        }
                    }
                    else{
                        res = false
                    }

                    return res;
                }
                function aggiornaSchedaFunction(){
                    var params = {'mode': 'recupero_scheda', 'id_utente': JSON.parse(window.localStorage.getItem('utente')).id};
                    var res = false;
                    callServer(params);

                    while(typeof(RESPONSE) == "undefined"){}

                    if(RESPONSE.response == true){
                        $utente = JSON.parse(window.localStorage.getItem('utente'));
                        RESPONSE.response['data_ultimo_aggiornamento_scheda'] = $utente.data_ultimo_aggiornamento_scheda;
                        window.localStorage.setItem("scheda", JSON.stringify(RESPONSE.scheda));
                        res = true;
                    }
                    else{
                        res = false;
                    }
                    RESPONSE = "undefined";
                    return res;
                }

                //funzioni per la creazione della vista utente
                function popolaVistaScheda(){
                //utilizzando i dati della scheda contenuti nella memoria locale, creare la vista degli esercizi
                //composizione dei campi della scheda: nome_categoria, nome_esercizio, quantita_esercizio
                var scheda = JSON.parse(window.localStorage.getItem("scheda"));
                var num = 0;
                var i = 0;
                while(typeof(scheda[i]) != "undefined"){
                    num++;
                    i++;
                }

                //stampo le categorie
                if(!$('#userHome').find('#listaCategorie').length){
                    $('#userHome').find('#userHomeContent').append("<ul data-role='listview' data-inset='true' id='listaCategorie'> </ul>");
                }

                for(i=0; i<num; i++){
                    var cat = scheda[i].nome_categoria;
                    var classTag = ".";
                    var idTag = "#";
                    var idCat = idTag.concat(cat);
                    var classCat = classTag.concat(cat);

                    if(!$("#userHome").find(classCat).length){
                        //se la categoria non esiste, aggiungila
                        $('#userHome').find('#listaCategorie').append("<li class="+cat+"><a href="+idCat+">"+cat+"</a></li>");
                        //per ogni categoria, aggiungi la pagina relativa
                        $('#userHome').after("" +
                            "<div data-role='page' id="+cat+"> " +
                            "<div data-theme='' data-role='header'> " +
                            "<a class='btnBack' data-role='button' href='#userHome' data-icon='back' data-iconpos='left' class='ui-btn-left'></a> " +
                            "<h3>"+cat+"</h3> " +
                            "</div> " +
                            "<div data-role='content' id='content'></div>" +
                            "</div>"
                        );

                        //in ogni pagina aggiungo gli esercizi di categoria
                        var j = i;
                        var exit = false;
                        //itero finché nome_categoria della scheda è uguale alla categoria in cui sto lavorando (salvata nel ciclo esterno), oppure quando arrivo alla fine della lista di esercizi
                        //ossia quando j == num
                        while (exit == false && scheda[j].nome_categoria.localeCompare(cat) == 0) {
                            var nomeEsercizio = scheda[j].nome_esercizio;
                            var idEsercizio = idTag.concat(nomeEsercizio.replace(/\s/g, '')); //servirà per popolare l'href a cui linkare quando si clicka il singolo esercizio

                            //se non esiste già, aggiungo l'html che conterrà la lista di esercizi
                            if (!$(idCat).find('#listaEsercizi').length) {
                                $(idCat).find('#content').append("<ul data-role='listview' data-inset='true' id='listaEsercizi'> </ul>");
                            }
                            //aggiungo tutti gli esercizi di categoria
                            $(idCat).find("#listaEsercizi").append("<li><a href=" + idEsercizio + ">" + nomeEsercizio + "</a></li>");

                            //creo le singole pagine per ogni esercizio
                            $('#userHome').after("" +
                                "<div data-role='page' id=" + nomeEsercizio.replace(/\s/g, '') + "> " +
                                "<div data-theme='' data-role='header'> " +
                                "<a class='btnBack' data-role='button' href=" + idCat + " data-icon='back' data-iconpos='left' class='ui-btn-left'></a> " +
                                "<h3>" + nomeEsercizio + "</h3> " +
                                "</div> " +
                                "<div data-role='content' id='content'></div>" +
                                "</div>"
                            );

                            //dentro ogni pagina visualizzo l'immagine dell'esercizio e la quantità impostata dall'admin
                            $(idEsercizio).find('#content').append("" +
                                " <div data-role='fieldcontain'> " +
                                " <img class='immaginiEsercizi' src='img/"+nomeEsercizio.replace(/\s/g, '')+".jpg' alt='foto_esercizio'/>"+
                                " </div> " +
                                " <h3>"+scheda[j].quantita_esercizio+"</h3>");

                            j++;
                            if (j == num) {
                                exit = true;
                            }
                        }
                    }
                }
            }
                break;
            case "recupera_password":
                $email = $('#txtRecuperaMail').val();
                var params = {"mode" : "recupera_password", "email" : $email};
                if(isOnline()){
                    if(isServerOnline()){
                        callServer(params);
                        while (typeof(RESPONSE) == "undefined"){}

                        if(RESPONSE.response == true){
                            alert("Abbiamo inviato una email con la tua password all'indirizzo fornito.");
                        }
                        else{
                            alert("Non abbiamo trovato nessuna corrispondenza dell'indirizzo immesso nel database.\nPerfavore controlla di non aver commesso errori nella digitazione dell'indirizzo email e riprova.");
                        }
                    }
                    else{
                        alert("Connessione al server scaduta.\nRiprova più tardi.");
                    }
                }
                else{
                    alert("Dispositivo disconnesso. Perfavore abilita la connessione a internet prima di proseguire.");
                }
                RESPONSE = "undefined";
                break;
            case "modifica_password":
                var idUtente = JSON.parse(window.localStorage.getItem('utente')).id;
                var nuovaPassword = $('#txtNuovaPassword').val();
                var params = {"mode" : "modifica_password", "idUtente" : idUtente, "nuovaPassword" : nuovaPassword};

                if(isOnline()){
                    if(isServerOnline()){
                        callServer(params);
                        while (typeof(RESPONSE) == "undefined"){}

                        if(RESPONSE.response == true){
                            var utente = JSON.parse(window.localStorage.getItem('utente'));
                            utente['password'] = nuovaPassword;
                            window.localStorage.setItem('utente', JSON.stringify(utente));
                            alert("Password modificata correttamente.");
                        }
                        else{
                            alert("Non è stato possibile modificare la password. Si prega di contattare l'admin.");
                        }
                    }
                    else{
                        alert("Connessione al server scaduta.\nRiprova più tardi.");
                    }
                }
                RESPONSE = "undefined";
                break;
            case "registrazione":
                var nome = $('#txtNome').val();
                var cognome = $('#txtCognome').val();
                var telefono = $('#txtTelefono').val();
                var email = $('#txtEmailRegister').val();
                var password = $('#txtPasswordRegister').val();

                var params = {'mode' : 'registrazione', 'nome' : nome, 'cognome' : cognome, 'telefono' : telefono, 'email' : email, 'password' : password};
                callServer(params);

                while(typeof(RESPONSE) == "undefined"){}

                if(RESPONSE.response == true){
                    alert("Per completare la registrazione controlla la tua email e fai click sul link di conferma.");
                }
                else{
                    alert("La registrazione non è andata a buon fine. Contatta l'amministratore.");
                }

                RESPONSE = "undefined";
                break;
            case "logout":
                window.localStorage.setItem("loggedIn", "false");
                $.mobile.changePage("#loginPage");
                break;
        }
    }
};

app.initialize();