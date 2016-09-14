@extends('template.base')

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <h1>APG Challenge <small class="pull-right"><a href="{{route('home')}}">Upload</a></small></h1>
        </div>
        <div class="col-xs-12 col-sm-8">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">All</th>
                        <td>{{$classification->sum('numHashes')}}</td>
                    </tr>
                    <tr><td colspan="2"></td></tr>
            @foreach($classification as $name)
                @include('partial.classification_type', ['name' => $name])
            @endforeach
                </tbody>
            </table>
        </div>
        <div class="col-xs-12 col-sm-4">
            @if(count($classification) == 0)
                <h3>You need more data!</h3>
            @else
                <canvas id="myChart" width="400" height="400"></canvas>
            @endif
        </div>
    </div>
    <script>
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            labels: {!! $classification->pluck('name') !!},
            type: 'polarArea',
            data: {
                labels: {!! $classification->pluck('name') !!},
                datasets: [{
                    label: '# of Records',
                    data: {!! $classification->pluck('numHashes') !!},
                    backgroundColor: [
                        @foreach($classification as $n)
                            'rgba({{rand(0,255)}},{{rand(0,255)}},{{rand(0,255)}},0.6)',
                        @endforeach
                    ],
                    borderWidth: 0
                }]
            }
        });
    </script>
@endsection