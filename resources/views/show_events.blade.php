@extends('layouts.app')
@section('content')
	<h2>CREATE EVENT</h2>

	<form class="" action={{ route('postCreateOrder', ['event' => $event_id]) }} method="post">
		@csrf
		<div>
	    <label>First Name</label>
	    <input type="text" name="registrants[0][first_name]" value="" />
		</div>
		<div>
	    <label>Last Name</label>
	    <input type="text" name="registrants[0][last_name]" value="" />
		</div>
		<div>
	    <label>Email</label>
	    <input name="registrants[0][email]" type="email" />
		</div>
		<div>
			<label>Age group:</label>
			<select name="registrants[0][group]">
				<option value=""></option>
				@foreach($groups as $group)
					<option value={{ $group->id}}>
						{{ $group->description}}
					</option>
				@endforeach
			</select>
		<div>
			<div>
			<label>Choose Package</label>
			<select name="registrants[0][package]">
				<option value=""></option>
				@foreach($packages as $package)
					<option value={{ $package->id}}>
						{{ $package->title}}
					</option>
				@endforeach
			</select>
		<div>
		<div>
	    <label>Roomate Pref:</label>
	    <input type="text" name="registrants[0][roomates]" value="" />
		</div>
		<div>
	    <label>Dietary:</label>
	    <input type="text" name="registrants[0][dietary]" value="" />
		</div>
		<br />
		<br />

			<div>
		    <label>First Name</label>
		    <input type="text" name="registrants[1][first_name]" value="" />
			</div>
			<div>
		    <label>Last Name</label>
		    <input type="text" name="registrants[1][last_name]" value="" />
			</div>
			<div>
		    <label>Email</label>
		    <input name="registrants[1][email]" type="email" />
			</div>
			<div>
				<label>Age group:</label>
				<select name="registrants[1][group]">
					<option value=""></option>
					@foreach($groups as $group)
						<option value={{ $group->id}}>
							{{ $group->description}}
						</option>
					@endforeach
				</select>
			<div>
				<div>
				<label>Choose Package</label>
				<select name="registrants[1][package]">
					<option value=""></option>
					@foreach($packages as $package)
						<option value={{ $package->id}}>
							{{ $package->title}}
						</option>
					@endforeach
				</select>
			<div>
			<div>
		    <label>Roomate Pref:</label>
		    <input type="text" name="registrants[1][roomates]" value="" />
			</div>
			<div>
		    <label>Dietary:</label>
		    <input type="text" name="registrants[1][dietary]" value="" />
			</div>
    <br />
    <button type="submit">Create</button>
	</form>
@endsection