<div>
	<p>
		<strong>Name:</strong> {{ $request['name'] }}
	</p>
	<p>
		<strong>Email:</strong> {{ $request['email'] }}
	</p>
	<p>
		<strong>Token:</strong> {{ $request['site_token'] }}
	</p>
	<p>
		<strong>User Agent:</strong> {{ $userAgent }}
	</p>
	<p>
		<strong>Time:</strong> {{ date('l, jS \of F Y h:i:s a') }} {{ date_default_timezone_get() }}
	</p>
	<p>
		<strong>Message:</strong> <br />{{ $request['message'] }}
	</p>
</div>