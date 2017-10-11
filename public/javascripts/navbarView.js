$(document).ready(() => {
  console.log('navBarView.js loaded')

  // default behvior
  $('#log_out').hide()
  $('#schedule').hide()
  $('#profile').hide()

  if () { // you are logged in
    $('#log_out').show()
    $('#schedule').show()
  }

  if () { // you are owner or superuser
      $('#profile').show()
  }
})
