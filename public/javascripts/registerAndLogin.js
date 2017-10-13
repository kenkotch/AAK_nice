$(document).ready(() => {

  function getAndRenderSchedule() {
    $.ajax({
      method: 'GET',
      url: '/schedule',
      success: 'success'
    })
  }

  if (document.location.href.match(/register$/)) {

    $('#newOwner').submit((event) => {
      event.preventDefault()

      let data = $('#newOwner').serialize()
      // delete data.password
      // console.log('type of data?', typeof(data))

      $.post("/register", data, null, 'json').then((data) => {
        document.location = '/'
      })
        .fail((err) => {
          $('#errorMessage').html(`<div>${err.responseText}</div>`)
        })
    })
  }

  if (document.location.href.match(/\/$/)) {

    $('#loginForm').submit((event) => {
      event.preventDefault()
      console.log('clicked on login')

      let data = $('#loginForm').serialize()
      console.log('data from form', data)

      $.post('/token', data, null, 'json').then((data) => {
        console.log('data from token post when logging in:', data)
        console.log('from token to schedule')
        if(Number(data.role) === 1) {
          document.location = '/super'
        }
        else {
        document.location = '/schedule'
        }
      })
        .fail((err) => {
          $('#errorMessage').html(`<div>${err.responseText}</div>`)
        })
    })
  }

  $('#logout').click(() => {
    console.log('clicked on logout')

    $.ajax({
      method: 'DELETE',
      url: '/token',
      success: 'success'
    }).then(() => {
      document.location = '/'
    })
  })

// if (document.location.href.match(/super$/)){

  $('.userSched').click((e) => {
    console.log('clicked on', e.target.id)
    let id  = e.target.id
    console.log(id)


    $.get(`/super/${id}`,
     null,
     null,
     'json')
     .then(() => {
       document.location= `/superSchedule`



     })
    })
  // }
})
