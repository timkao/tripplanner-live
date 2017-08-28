$('document').ready(function(){
  var map = new Map('map');

  hotels.forEach(function(hotel){
    $('#hotels').append(`<option id=${hotel.id}>${hotel.name}</option>`)
  })

  restaurants.forEach(function(restaurant){
    $('#restaurants').append(`<option id=${restaurant.id}>${restaurant.name}</option>`)
  })

  activities.forEach(function(activity){
    $('#activitys').append(`<option id=${activity.id}>${activity.name}</option>`)
  })


  $('.list-group-item').on('click', 'button', function(){
    // request the info
    var name = $(this).prev()[0].value
    var target = $(this).prev()[0].id.slice(0, $(this).prev()[0].id.length - 1)

    // check duplicate
    var currentlist = $(`#${target}-day li span`)
    var temp = []
    if (currentlist.length > 0) {
      for (var i = 0; i < currentlist.length; i++) {
        temp.push(currentlist[i].innerText)
      }
    }

    // not duplicate => create element & create Mark
    if (currentlist.length === 0 || !temp.includes(name)) {

      // create element
      $(`#${target}-day`).append(`<li class='list-group-item'><span>${name}</span><button class='btn btn-warning btn-sm pull-right'>x</button>
      <br clear='both' /></li>`)

      // create Mark
      var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
      var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
      });
      marker.setMap(map.targetMap)
      console.log(map.targetMap)

    }

  })

});
