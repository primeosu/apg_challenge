@extends('template.base')

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <h1>APG Challenge <small class="pull-right"><a href="{{route('dashboard')}}">Dashboard</a></small></h1>
        </div>
        <div class="col-xs-12">
            @if (count($errors) > 0)
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <form action="{{route('upload')}}" method="post" enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="form-group">
                    <label>CSV File</label>
                    <input required type="file" name="upfile">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
@endsection