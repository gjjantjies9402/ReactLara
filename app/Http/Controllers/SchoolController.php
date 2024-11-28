<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'province' => 'required|string|max:255',
        'city' => 'required|string|max:255',
        'street_address' => 'required|string|max:255',
    ]);

    School::create($request->all());

    return redirect()->route('schools.index')->with('success', 'School added successfully!');
}

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school)
    {
        //
    }
}
