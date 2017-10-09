$(document).ready(() => {
  if (document.location.href.match(/myschedule$/)) {

    // called on EDIT success
    function fetchAndRenderSchedule() {
      $.ajax({
        method: 'GET',
        url: '/myschedule',
        success: 'success'
      })
    }

    // SUBMIT on click updates row
    // function editScheduleSubmitHandler(e) {
    //   e.preventDefault()
    //   const timeId = e.target.id.getAttribute('data-id')
    //   const inputSelector = `input[data-todo-id="${todoId}"]`
    //   const updatedItem = $(inputSelector).val().trim()
    //   updateSchedule(todoId, updatedItem)
    //
    // function appendScheduleElements(todo) {
    //   const span = $('<span>').text(todo.item)
    //
    //   const editInput = $('<input>')
    //   .val(todo.item)
    //   .attr('data-todo-id', todo.id)
    //
    //   const editSubmit = $('<input>')
    //   .attr('type', 'submit')
    //   .on('click', editScheduleSubmitHandler)
    //
    //   const editForm = $('<form>')
    //   .append(editInput)
    //   .append(editSubmit)
    //   .attr('data-todo-id', todo.id)
    //   .attr('style', 'display: inline-block')
    //
    //   const revealEditFormButton = $('<button>')
    //   .text('Edit')
    //   .on('click', function (event) {
    //     event.preventDefault()
    //     editForm.show()
    //     revealEditFormButton.hide()
    //     span.hide()
    //   })
    //
    //   const deleteBtn = $('<button>')
    //   .text('delete')
    //   .attr('data-todo-id', todo.id)
    //   .on('click', deleteBtnClickHandler)
    //
    //   const tr = $('<tr>')
    //   .append(revealEditFormButton)
    //   .append(deleteBtn)
    //   .append(span)
    //   .append(editForm)
    //
    //   editForm.hide()
    //
    //   $('tb').append(tr)
    // }
    //
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

    // $('#schedule .edit').click((e) => {
    //   e.preventDefault()
    //   console.log((`edit ${e.target.id}`))
    //   $.ajax({
    //     url: `/myschedule/${e.target.id}`,
    //     method: 'PATCH',
    //     data: {
    //       time: updatedTime,
    //       item: updatedItem,
    //       description: updatedDescription
    //     },
    //     success: fetchAndRenderSchedule
    //   })
    // })

  // }
}
})
