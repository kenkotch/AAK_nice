$(document).ready(() => {

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
