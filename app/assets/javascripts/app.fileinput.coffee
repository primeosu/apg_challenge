# app/assets/javascripts/app.fileinput.coffee

class App.FileInput
  constructor: (@el) ->
    # intialize some stuff

  render: ->
    # do some stuff

$(document).on "page:change", ->
  # Initialize: fileinput
  $('#input-1').fileinput
    uploadUrl: '/threats/import'
    uploadAsync: false
    maxFileCount: 1
    browseOnZoneClick: true
    allowedFileExtensions: [ 'csv' ]

  # Event: fileuploaded
  $('#input-1').on 'fileuploaded', ->
    uploadComplete()

  # Event: filebatchuploadcomplete
  $('#input-1').on 'filebatchuploadcomplete', ->
    uploadComplete()


uploadComplete = ->
  console.log 'uploadComplete!'
  # "location.reload()",
  Turbolinks.visit location.toString()

