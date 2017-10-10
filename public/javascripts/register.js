$(document).ready(() => {
  console.log('ready!')

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

})
