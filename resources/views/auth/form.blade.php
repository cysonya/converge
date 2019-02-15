@extends('layouts.admin')
@section('head')
    <link href="{{ mix('/css/forms.css') }}" rel="stylesheet">
@endsection

@section('content')
	<div class="form-wrapper">
		<div class="form">
			@hasSection('image')
				@yield('image')
			@else
				<img class="form-vector" src={{ asset("images/vectors/data_points_green.svg")}} width="200" />
			@endif
	    {{ $slot }}
		</div>
	</div>
@endsection