$('document').ready(function(){
  var map = new Map('map');
  var markerArr = []
  var db = {
    hotel: hotels,
    restaurant: restaurants,
    activity: activities
  }
  var allData = {
    hotel: [],
    restaurant: [],
    activity: []
  }

  $('#day-details').data('1', {
    hotel: [],
    restaurant: [],
    activity: []
  })
  $('#day-details').data('2', {
    hotel: [],
    restaurant: [],
    activity: []
  })
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
      var dayData = `<li class='list-group-item'><span>${name}</span><button class='btn btn-warning btn-sm pull-right'>x</button>
      <br clear='both' /></li>`;
      // create element
      $(`#${target}-day`).append(dayData);

      //$('#day-details').data()

      if (target === 'hotel') {
        $('#day-details').data($('.active').text().trim())['hotel'].push(dayData)
      }
      else if (target === 'restaurant') {
        $('#day-details').data($('.active')[0].innerText, {'restaurant': [dayData]});
      }
      else if (target === 'activity') {
        $('#day-details').data($('.active')[0].innerText, {'activity': [dayData]});
      }

      console.log($('#day-details').data());

      // create Mark
      // 1. search for hotel location
      var info = db[target].filter(function(item) {
        return item.name === name
      })[0]

      var myLatlng = new google.maps.LatLng(info.place.location[0], info.place.location[1]);
      // console.log(myLatlng)
      var marker = new google.maps.Marker({
        position: myLatlng,
        title: name
      });
      marker.setMap(map.targetMap)
      markerArr.push(marker)
    }

  })

  $('#day-details').on('click', 'button', function(){
    $(this).parent()[0].remove()
    var removeMarker = $(this).prev()[0].innerText
    markerArr.forEach(function(mark){
      if (mark.title === removeMarker) {
        mark.setMap(null)
      }
    })
  })


  $('#dayAddBtn').on('click', function() {
    var next = $('.nav li').length + 1;
    $('.nav').append(`<li><a href='#'>${next}</a></li>`);
    $('#day-details').data(next, {
    hotel: [],
    restaurant: [],
    activity: []
  })
  });


  // $('#dayRmBtn').on('click', function() {

  // });

  $('.nav').on('click', 'li', function() {
    if (this.className !== 'class') {
      $('.active').removeClass('active');
      $(this).addClass('active');
    }




    // $('#day-details').data(`day`, );


  });



});
