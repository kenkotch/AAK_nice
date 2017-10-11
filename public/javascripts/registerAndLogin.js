$(document).ready(() => {
  console.log('ready!')

  if (document.location.href.match(/register$/)) {
    console.log('on page: register')

    $('#newOwner').submit((event) => {
      event.preventDefault()

      let data = $('#newOwner').serialize()
      delete data.hashed_password
      console.log(data)

      $.post("/register", data, null, 'json').then((data) => {
        console.log('Input data', data)
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

      let data = $('#loginForm').serialize()

      $.post('/token', data, null, 'json').then((data) => {
        document.location = '/schedule'
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
