@extends('layouts.admin')
@section('head')
    <link href="{{ mix('/css/forms.css') }}" rel="stylesheet">
@endsection

@section('content')
<div class="form-wrapper">
	<div class="form">
		<img class="form-vector" src={{ asset("images/vectors/data_points.svg")}} width="200" />
    {{ $slot }}
	</div>
</div>
@endsection