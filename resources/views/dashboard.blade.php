@extends('template')

@section('content')

<!-- Should Probably Change this to CSS at some point... -->
<br><br><br><br><br><br><br><br><br><br>

<div class="row">
  <div class="col-md-8 col-md-offset-4">
    <form action="/upload" method="post" enctype="multipart/form-data">
      {!!csrf_field()!!}
      <div class="form-group">
          <label for="uploaded_file">Upload CSV</label>
          <input type="file" name="uploaded_file" accept=".csv" required>
          <p class="help-block">This may take a few minutes depending on the size of the file</p>
        </div>
      <button type="submit" class="btn btn-success">Upload</button>
    </form>
  </div>
</div>

@endsection
