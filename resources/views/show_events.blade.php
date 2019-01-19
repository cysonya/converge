@extends('layouts.app')
@section('content')
	<h2>CREATE EVENT</h2>

	<form class="" action={{ route('postCreateOrder', ['event' => $event_id]) }} method="post">
		@csrf
		<div>
	    <label>First Name</label>
	    <input type="text" name="first_name" value="" />
		</div>
		<div>
	    <label>Last Name</label>
	    <input type="text" name="last_name" value="" />
		</div>
		<div>
	    <label>Email</label>
	    <input name="email" type="email" />
		</div>
		<div>
			<label>Choose Package</label>
			<select name="package">
				<option value=""></option>
				@foreach($packages as $package)
					<option value={{ $package->id}}>
						{{ $package->title}}
					</option>
				@endforeach
			</select>
		<div>
    <br />
    <button type="submit">Create</button>
	</form>
@endsection