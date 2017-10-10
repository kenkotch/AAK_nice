$(document).ready(() => {
  if (document.location.href.match(/myschedule$/)) {

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
    $("#schedule .edit").click((e) => {
      e.preventDefault()
      console.log(`delete ${e.target.id}`)
      $.ajax({
        url: `/myschedule/${e.target.id}/edit`,
        method: "PATCH",
        success: getAndRenderSchedule()
      })
        // .then((data) => {
        //   $(e.target).closest('tr').hide()
        // })
    })

    function updateShow(data) {
      $('.mantra').html(data.mantra)
      $('.name').html(data.name)
    }

    function updateEditForm(data) {
      console.log("updating form");
      $('#newStudent #name').attr("value", data.name)
      $('#newStudent #mantra').attr("value", data.mantra)
    }

    }
})
