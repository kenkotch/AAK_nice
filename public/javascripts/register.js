$(document).ready(() => {
  console.log('ready!')

  $('#newOwner').submit((event) => {
    event.preventDefault()

    let data = $('#newOwner').serialize()

    $.post("/")
  })

})
