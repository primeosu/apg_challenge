@extends('template')

@section('content')

<h1>Upload List</h1>

<table class="table">
	<thead>
		<th>Name</th>
		<th>Path</th>
		<th>Uploaded At</th>
	</thead>

	<tbody>
		@foreach($uploads as $upload)
			<tr>
				<td>{{ $upload->name }}</td>
				<td>{{ $upload->path }}</td>
				<td>{{ $upload->created_at }}</td>
			</tr>
		@endforeach
	</tbody>
</table>

{!! $uploads->render() !!}

<h3>Database Tools</h3>

<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#rebuild">Rebuild Database from Backup</button>
<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete">Delete all CSV backups</button>

<!-- Modal -->
<div id="rebuild" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Are you sure?</h4>
      </div>
      <div class="modal-body">
				@if($uploads->first() == null)
					<p>There are NO backups.  This will delete the ENTIRE SQL database.</p>
				@else
	        <p>This will delete EVERYTHING in the database and rebuild it using the backups following backups</p>
					@foreach($uploads as $upload)
						<small>&nbsp;&nbsp;&nbsp;&nbsp;{{ $upload->path }}</small>
						<br>
					@endforeach
				@endif
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

<!-- Modal -->
<div id="delete" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Are you sure?</h4>
      </div>
      <div class="modal-body">
        <p>This will delete all of the CSV backup files.  This will NOT alter the SQL database.</p>
      </div>
      <div class="modal-footer">
				<form action="/upload/delete" method="post" enctype="multipart/form-data">
		      {!!csrf_field()!!}
					<input type="hidden" name="deletekey" value="IntelRox"></input>
		      <button type="submit" class="btn btn-sm btn-success">Yes</button>
		    </form>
      </div>
    </div>

  </div>
</div>

@endsection
