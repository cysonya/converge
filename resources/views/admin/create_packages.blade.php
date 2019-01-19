@extends('layouts.app')
@section('content')
	<h2>CREATE EVENT</h2>

	<form class="" action={{ route('postCreateEventPackage', ['event' => $event_id]) }} method="post">
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
	    <label>Price</label>
	    <input name="price" />
		</div>
		<div>
	    <label>Quantity Available</label>
	    <input name="quantity_available" />
		</div>
	    <br />
	    <button type="submit">Create</button>
	</form>
@endsection