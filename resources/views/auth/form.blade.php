@extends('layouts.admin')
@section('head')
    <link href="{{ mix('/css/forms.css') }}" rel="stylesheet">
@endsection

@section('content')
<div class="form-wrapper">
    <div class="form-header">Converge</div>
    {{ $slot }}
</div>
@endsection