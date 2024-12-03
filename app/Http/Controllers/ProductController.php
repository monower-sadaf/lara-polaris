<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('product/index');
    }

    public function create(){
        return Inertia::render('product/create');
    }

    public function store(Request $request){
        dd($request->all());
    }
}
