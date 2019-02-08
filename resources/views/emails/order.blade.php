@component('mail::message')
# Order Shipped

Your order has been shipped!

@component('mail::panel')
This is the panel content.
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent