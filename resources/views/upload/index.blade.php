@extends('template')

@section('content')

<h1>Upload List</h1>

<?php

$files = glob('uploads/*');
if(count($files) == 0)
	echo 'There are no uploads';

foreach ($files as $file) {
	echo $file;
	echo '<br>';
}

?>

<h3>Database Tools</h3>

<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#rebuild">Rebuild Database from Backup</button>
<br><br>
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
				This deletes the SQL database and rebuilds it from ONLY CSV files listed on this page.
      </div>
      <div class="modal-footer">
				<form action="/malware/rebuild" method="post" enctype="multipart/form-data">
					{!!csrf_field()!!}
					<input type="hidden" name="deletekey" value="IntelRox"></input>
					<button type="submit" class="btn btn-sm btn-success">Yes</button>
				</form>
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
