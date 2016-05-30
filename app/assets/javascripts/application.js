// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .

(function(){

    $(document).ready(function() {
        
        $('.datatable').DataTable({});

        
        // [].forEach.call(document.getElementsByClassName("class-type"), function (el) {
        //     if (el.innerHTML === "trojan" || el.innerHTML === "Trojan" || el.innerHTML === "TROJAN") {
        //         el.innerHTML = "<img src='/assets/trojan.png' style='display: inline;'><p style='display: inline;'>  Trojan</p>";
            
        //     } else if (el.innerHTML === "virus" || el.innerHTML === "Virus" || el.innerHTML === "VIRUS") {
        //         el.innerHTML = "<img src='/assets/virus.png' style='display: inline;'><p style='display: inline;'>  Virus</p>";
            
        //     } else if (el.innerHTML === "clean" || el.innerHTML === "Clean" || el.innerHTML === "CLEAN") {
        //         el.innerHTML = "<img src='/assets/check.png' style='display: inline;'><p style='display: inline;'>  Clean</p>";
            
        //     } else if (el.innerHTML === "pup" || el.innerHTML === "Pup" || el.innerHTML === "PUP") {
        //         el.innerHTML = "<img src='/assets/warning.png' style='display: inline;'><p style='display: inline;'>  PUP</p>";
            
        //     } else if (el.innerHTML === "unknown" || el.innerHTML === "Unknown" || el.innerHTML === "UNKNOWN") {
        //         el.innerHTML = "<i class='fa fa-question-circle' aria-hidden='true'></i> <p style='display: inline;'>   Unknown</p>";
            
        //     } else if (el.innerHTML === "spooky" || el.innerHTML === "Spooky" || el.innerHTML === "SPOOKY") {
        //         el.innerHTML = "<i class='fa fa-code' aria-hidden='true'></i> <p style='display: inline;'>   Spooky</p>";
        //     }
        // });
    });
}());
