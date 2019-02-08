@component('mail::message')

Thank you for registering for {{$order->event->title}} (Aug 2-4), held
at Hiram College:

11715 Garfield Road<br />Hiram, Ohio 44234

<h3 style="margin-bottom: 5px">Your Order Number</h3>
{{ $order->number }}

<table class="table" style="margin-top: 10px">
	<thead>
		<tr>
			<th>Name</th>
			<th>Group</th>
			<th>Housing</th>
			<th>Amount</th>
		</tr>
	</thead>
	<tbody>
		@foreach($order->attendants as $attendant)
			<tr>
				<td>{{ $attendant->fullName }}</td>
				<td>{{ $attendant->group->description }}</td>
				<td>{{ $attendant->package->title }}</td>
				<td>${{ (int)$attendant->package->price }}</td>
			</tr>
		@endforeach
	</tbody>
</table>

Registration is from 3-5pm. This is when you will receive your housing information and a schedule for the weekend.


If you have any comments or questions, please email Jerry Wierwille at <a href="mailto:jerry@lhim.org">jerry@lhim.org</a>.


Thanks,<br>
{{ config('app.name') }}
@endcomponent