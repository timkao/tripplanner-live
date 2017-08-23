$(function(){
  var map = new Map('map');
});

hotels.forEach(function(hotel){
  $('#hotels').append(`<option id=${hotel.id}>${hotel.name}</option>`)
})

restaurants.forEach(function(restaurant){
  $('#restaurants').append(`<option id=${restaurant.id}>${restaurant.name}</option>`)
})

activities.forEach(function(activity){
  $('#activities').append(`<option id=${activity.id}>${activity.name}</option>`)
})


$('#hotelbutton').on('click', function(e){
  var hotelName = $('#hotels').val()
  $('#hotel-day').append(`<li class='list-group-item'>${hotelName}<button class='btn btn-warning btn-sm pull-right'>x</button>
          <br clear='both' /></li>`)
})

$('#restaurantbutton').on('click', function(e){
  var restaurantName = $('#restaurants').val()
  $('#restaurant-day').append(`<li class='list-group-item'>${restaurantName}<button class='btn btn-warning btn-sm pull-right'>x</button>
          <br clear='both' /></li>`)
})

$('#activitybutton').on('click', function(e){
  var activityName = $('#activities').val()
  $('#activity-day').append(`<li class='list-group-item'>${activityName}<button class='btn btn-warning btn-sm pull-right'>x</button>
          <br clear='both' /></li>`)
})
