$(document).ready(() => {
  $(".active").each(() => {
    $(this).removeClass("active")
  })

  switch (window.location.pathname) {
    case '/':
      $("#home").addClass("active")
      break
    case '/register':
      $("#register").addClass("active")
      break
    case '/schedule':
      $("#schedule").addClass("active")
      break
    case '/profile':
      $("#profile").addClass("active")
      break
    default:
      $("#home").addClass("active")
  }
})
