(() => {
  'use strict'

  const isDelete = (event) => {
    if (confirm('Are you sure?')) {
      return true
    }

    event.preventDefault()
  }

  document.querySelectorAll('.btn-danger').forEach(currentValue => currentValue.addEventListener('click', isDelete))
})()
