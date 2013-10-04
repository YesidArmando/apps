if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(
        initialize, 
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
      );
    }
    else {
      alert("Geolocation no es soportada por el navegador que est� utilizando");
    }
function initialize(position) {
   var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   var myOptions = {
       zoom: 4,
       center: myLatlng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
   var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Hola Mundo"
  });

}

directionsDisplay = new google.maps.DirectionsRenderer();
directionsService = new google.maps.DirectionsService();
function getDirections(){
var origen = $('#origen').val()+" "+$('#ciudad').val()+","+$('#pais').val();
var destino = $('#destino').val()+" "+$('#ciudad').val()+","+$('#pais').val();
if(!origen || !destino){
alert("Origen y Destino requiere una direccion distinta");
return;
}
var request = {
       origin: origen,
       destination: destino,
       travelMode: google.maps.DirectionsTravelMode[$('#modo_viaje').val()],
       unitSystem: google.maps.DirectionsUnitSystem[$('#tipo_sistema').val()],
       provideRouteAlternatives: true
   };
directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
          //actualiza la posición del marcador
          marker.setPosition(results[0].geometry.location);
          // Cambia y mueve el centro del mapa a las coord. del objeto Latlng indicado
           map.panTo(results[0].geometry.location); 
           directionsDisplay.setMap(map);
           directionsDisplay.setPanel(document.getElementById("panel_ruta"));
           directionsDisplay.setDirections(response);
       } else {
           alert("No existen rutas entre ambos puntos");
       }
   });
}
$('#buscar').click(function(){ getDirections(); });
//$('.opciones_ruta').live('change', function(){ getDirections(); });
//$(document).ready(function() {
//   initialize();
//  }); 

