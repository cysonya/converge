@extends('layouts.app')
@section('content')
	<h2>CREATE EVENT</h2>

	<form class="" action={{ route('postCreateEvent') }} method="post">
		@csrf
		<div>
	    <label>Title</label>
	    <input type="text" name="title" value="" />
		</div>
		<div>
	    <label>Description</label>
	    <textarea name="description"></textarea>
		</div>
		<div>
	    <label>Start Date</label>
	    <input name="start_date" />
		</div>
		<div>
	    <label>End Date</label>
	    <input name="end_date" />
		</div>
	    <br />
	    <button type="submit">Create</button>
	</form>
@endsection