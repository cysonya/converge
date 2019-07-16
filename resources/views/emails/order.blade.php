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
				<td>${{ $attendant->package->groups()->where('group_id', $attendant->group_id)->first()->pivot->price }}</td>
			</tr>
		@endforeach
	</tbody>
	<tfoot>
		@if($donation)
			<tr>
				<td class="td-right" colspan="3" align="right">
					<strong>Donation:</strong>
				</td>
				<td>${{ (int)$donation->amount }}</td>
			</tr>
		@endif
		@if(\Carbon\Carbon::now('EST')->addHour() > \Carbon\Carbon::parse('2019-07-16 EST'))
			<tr>
				<td class="td-right" colspan="3" align="right">
					<strong>Late Fee:</strong>
				</td>
				<td>${{ count($order->attendants) * 20 }}</td>
			</tr>
		@endif
		@if($order->adjustments)
			@foreach($order->adjustments as $adjustment)
				<tr>
					<td class="td-right" colspan="3" align="right">
						<strong>{{ ucfirst($adjustment->type) }}: {{ $adjustment->label }}</strong>
					</td>
					<td>-${{ (int)-$adjustment->amount }}</td>
				</tr>
			@endforeach
		@endif
		<tr>
			<td class="td-right" colspan="3" align="right">
				<strong>Total:</strong>
			</td>
			<td>${{(int)$order->getTotalAfterAdjustments() }} USD</td>
		</tr>
	</tfoot>
</table>

Registration is from <strong>3-5pm on Friday (Aug 2)</strong>. This is when you will receive your housing information and a schedule for the weekend. CONVERGE will conclude at <strong>1pm on Sunday (Aug 4)</strong>.


You will be receiving a welcome packet email a couple of weeks prior to the event with more instructions and details for packing and preparation.


If you have any concerns or questions, contact Jerry Wierwille (<a href="mailto:contact@convergefest.com">contact@convergefest.com</a>) by replying to this email.


Thanks,<br>
{{ config('app.name') }}
@endcomponent