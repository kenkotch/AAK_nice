$(document).ready(() => {
  // if (document.location.href.match(/myschedule$/) ) {

    // called on DELETE/EDIT success- reloads only table
    function getAndRenderSchedule() {
      $.ajax({
        method: 'GET',
        url: '/myschedule',
        success: 'success'
      })
    }

    // DELETE
    $("#schedule .delete").click((e) => {
      e.preventDefault()
      console.log(`delete ${e.target.id}`)
      $.ajax({
        url: `/myschedule/${e.target.id}`,
        method: "DELETE",
        success: getAndRenderSchedule()
      })
        .then((data) => {
          $(e.target).closest('tr').hide()
        })
    })

    // UPDATE
    $("#editForm").submit((e) => {
      e.preventDefault()
      console.log('form submit')
      let id = $('input[name="id"]').val()

      $.ajax({
        url: `/myschedule/${id}`,
        method: "PATCH",
        data: $('#editForm').serialize(),
        success: (res) => {
          console.log(res)
          window.location = "/myschedule"
        }
      })
    })
    // }
})
