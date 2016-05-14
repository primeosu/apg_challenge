window.IntelAPG ?= {}

IntelAPG.classification_types_data_table = ->
  name_field = $('#classification_types_table_filter').find('input')
  classification_types_table = $('#classification_types_table').DataTable
    processing: true
    serverSide: true
    ajax:
      url: 'classification_types/datatable_ajax'
      data: (d) ->
        d.name = name_field.val()
        d.malware_count = $('#malware_count').val()
        return
    columns: [
      { width: "35%" }
      { width: "35%", searchable: false }
    ]
    order: [ [1, 'desc'] ]