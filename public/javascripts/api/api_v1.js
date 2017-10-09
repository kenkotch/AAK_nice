$(document).ready(() => {
  if (document.location.href.match(/myschedule$/)) {
    console.log('matching correct page: /myschedule')

    $("#schedule").click((e) => {
      e.preventDefault()
      console.log(e.target.id.replace(/^d/, '').replace(/^e/, ''))

    })






  }
})
