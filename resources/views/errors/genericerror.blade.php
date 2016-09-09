@extends('template')

@section('content')

<h1>Whoops!</h1>
<br>
<h4>Looks like you ran into an error!</h4>
<br>
<p>Error: {{ $errmsg }}</p>

<a href="/">Click here to return to the homepage</a>

@endsection
