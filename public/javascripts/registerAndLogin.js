$(document).ready(() => {
  console.log('ready!')

  if (document.location.href.match(/register$/)) {
    console.log('on page: register')

    $('#newOwner').submit((event) => {
      event.preventDefault()

      let data = $('#newOwner').serialize()
      console.log(data)

      $.post("/register", data, null, 'json').then((data) => {
        console.log('Input data', data)
        document.location = '/register'
      })
        .fail((err) => {
          $('#errorMessage').html(`<div>${err.responseText}</div>`)
        })
    })
  }

  if (document.location.href.match(/\/$/)) {
    console.log('on page: login')

    $('#loginForm').submit((event) => {
      event.preventDefault()

      let data = $('#loginForm').serialize()
      console.log('data from form:', data)

      $.post('/token', data, null, 'json').then((data) => {
        console.log('data being posted to /token', data)
        document.location = '/token'
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
})
