$(document).ready(() => {
  if (document.location.href.match(/myschedule$/)) {

    // called on DELETE/EDIT success- reloads only table
    function fetchAndRenderSchedule() {
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
        success: fetchAndRenderSchedule()
      })
        .then((data) => {
          $(e.target).closest('tr').hide()
        })
    })

    let checkId = document.location.href.match(/(\d+)$/)
    // .match(/(\d+)$/) || document.location.href.match(/(\d+)\/edit$/)

    // if (checkId) {
      let id = checkId[0]
    console.log("found id", checkId)

    // if it's the update form populated the fields
    $.getJSON(`/myschedule/${id}`).then((data) => {
      console.log("fetched a student", id, data);
      if (document.location.href.match(/students\/\d+$/)) {
        updateShow(data)
      } else if (document.location.href.match(/students\/\d+\/edit$/)) {
        updateEditForm(data)
      }
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




    // EDIT
    $('#schedule .edit').click((e) => {
      e.preventDefault()
      console.log((`edit ${e.target.id}`))

      // $.ajax({
      //   url: `/myschedule/${e.target.id}`,
      //   method: 'PATCH',
      //   // data: {
      //   //   time: updatedTime,
      //   //   item: updatedItem,
      //   //   description: updatedDescription
      //   // },
      //   contentType: 'application/json',
      //   success: fetchAndRenderSchedule
      // })



    })
  }
})
