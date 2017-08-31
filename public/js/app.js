$('document').ready(function(){
  var map = new Map('map');
  var db = {
    hotel: hotels,
    restaurant: restaurants,
    activity: activities
  }

  $('#day-details').data('1', {
    hotel: [],
    restaurant: [],
    activity: [],
    markerArr: []
  })
  $('#day-details').data('2', {
    hotel: [],
    restaurant: [],
    activity: [],
    markerArr: []
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

  // recompose data

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
      createItem(target, name)

      //$('#day-details').data()

      if (target === 'hotel') {
        $('#day-details').data($('.active').text().trim())['hotel'].push(name)
      }
      else if (target === 'restaurant') {
        $('#day-details').data($('.active').text().trim())['restaurant'].push(name)
      }
      else if (target === 'activity') {
        $('#day-details').data($('.active').text().trim())['activity'].push(name)
      }

      // create Mark
      // 1. search for hotel location
      var info = db[target].filter(function(item) {
        return item.name === name
      })[0]

      var myLatlng = new google.maps.LatLng(info.place.location[0], info.place.location[1]);

      var marker = new google.maps.Marker({
        position: myLatlng,
        title: name
      });
      marker.setMap(map.targetMap)
      $('#day-details').data($('.active').text().trim())['markerArr'].push(marker)
    }

  })

  $('#day-details').on('click', 'button', function(){
    var target = $(this).parent().parent().attr('id').split('-')[0]
    var name = $(this).prev().text()
    // remove from info
    $('#day-details').data($('.active').text().trim())[target] = $('#day-details').data($('.active').text().trim())[target].filter(function(ele){
      return ele !== name
    })

    // update view
    $(this).parent()[0].remove()
    $('#day-details').data($('.active').text().trim())['markerArr'].forEach(function(mark){
      if (mark.title === name) {
        mark.setMap(null)
      }
    })

    // remove marker
    $('#day-details').data($('.active').text().trim())['markerArr'] = $('#day-details').data($('.active').text().trim())['markerArr'].filter(function(ele){
      return ele.title !== name
    })

  })


  $('#dayAddBtn').on('click', function() {
    var next = $('.nav li').length + 1;
    $('.nav').append(`<li><a href='#'>${next}</a></li>`);
    $('#day-details').data(next.toString(), {
      hotel: [],
      restaurant: [],
      activity: [],
      markerArr: []
    })
  });

  $('.nav').on('click', 'li', function() {
    if (this.className !== 'class') {
      // remove markers
      $('#day-details').data($('.active').text().trim())['markerArr'].forEach(function(mark){
        mark.setMap(null)
      })
      $('.active').removeClass('active');
      $(this).addClass('active');
    }

    // remove current info
    reRenderPanel($(this).children().text().trim())
  });

  $('#dayRmBtn').on('click', function() {
    var days = $('.nav li').length;
    var currentNode = $('.active')
    var currentDay = currentNode.text().trim()
    var oldData = $('#day-details').data()
    var reassign = 1;

    // remove marker
    $('#day-details').data(currentDay)['markerArr'].forEach(function(mark){
      mark.setMap(null)
    })

    // recreate day Picker panel
    if (days > 1) {
      if (currentDay !== '1'){
        currentNode.removeClass('active').prev().addClass('active')
      }
      else {
        currentNode.removeClass('active').next().addClass('active')
      }
      currentNode.remove()

      $('.nav li').each(function(index, ele) {
        $(ele).children().text(index + 1)
      })

      // update info
      delete oldData[currentDay]
      Object.keys(oldData).forEach(function(day){
        $('#day-details').data(`${reassign}`, oldData[day])
        reassign++
      })

      // re-render data
      reRenderPanel($('.active').text().trim())
    }

  });


  function createItem(target, name) {
    var dayItem = `<li class='list-group-item'><span>${name}</span><button class='btn btn-warning btn-sm pull-right'>x</button>
    <br clear='both' /></li>`;
    $(`#${target}-day`).append(dayItem);
  }

  function reRenderPanel(activeDay) {

    var infoToBeRendered = $('#day-details').data(activeDay)
    $('#hotel-day').empty()
    $('#restaurant-day').empty()
    $('#activity-day').empty()

    infoToBeRendered['hotel'].forEach(function(targetName) {
      createItem('hotel', targetName)
    })

    infoToBeRendered['restaurant'].forEach(function(targetName) {
      createItem('restaurant', targetName)
    })

    infoToBeRendered['activity'].forEach(function(targetName) {
      createItem('activity', targetName)
    })

    infoToBeRendered['markerArr'].forEach(function(mark) {
      mark.setMap(map.targetMap)
    })
  }


});
