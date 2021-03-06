@component('auth.form')
    @section('image')
        <img class="form-vector" src={{ asset("images/vectors/get_password.svg") }} width="200" />
    @endsection
    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        @if (session('status'))
            <div class="form-feedback has-succeeded" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <div class="form-group">
            <label class="form-label">Email</label>
            <input id="email" type="email" class="form-input" name="email" value="{{ old('email') }}" autofocus autocomplete="email" required>
            @if ($errors->has('email'))
                <span class="form-feedback has-error" role="alert">
                    {{ $errors->first('email') }}
                </span>
            @endif
        </div>
        <button type="submit" class="form-button">Send Reset Link</button>
    </form>
@endcomponent

@if(false)
    @section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ __('Reset Password') }}</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <form method="POST" action="{{ route('password.email') }}">
                            @csrf

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        {{ __('Send Password Reset Link') }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endsection
@endif

