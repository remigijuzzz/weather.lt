<button type="button" class="btn btn-primary">Primary</button>

@extends('layouts.standard')
@section('title', 'Weather info')
@section('form')
    <form>
        <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="APP Key" id="api-key" placeholder="API Key">
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="APP Key" id="city" placeholder="City">
            <div class="input-group-append check-container">
                <span class="input-group-text">V</span>
            </div>
        </div>
    </form>
@stop
