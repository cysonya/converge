<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, width=device-width">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>
        @hasSection('title')
            @yield('title') - {{ config('app.name', 'Converge') }}
        @else
            {{ config('app.name', 'Converge') }}
        @endif
    </title>

    <!-- Scripts -->
    <script src="{{ mix('/js/app.js') }}" defer></script>
    <script src="https://js.stripe.com/v3/"></script>

    @include('layouts._global_site_vars')

    <link rel="icon" href="{{asset('favicon.png')}}" type="image/gif" sizes="16x16">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    <!-- Styles -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>

    @if (App::environment(['staging', 'production']))
        @include('layouts._analytics')
    @endif

  </body>
</html>
