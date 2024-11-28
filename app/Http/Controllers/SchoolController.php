<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
        /**
         * Display a listing of the resource.
         */
        public function index()
        {
            $schools = School::all();
            return Inertia::render('Schools/Index', [
                'schools' => $schools
            ]);
        }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('schools.create'); // Assuming a view exists at resources/views/schools/create.blade.php
    }

    /**
     * Store a newly created resource in storage.
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

        return redirect()->route('schools.schools')->with('success', 'School added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        return view('schools.show', compact('school')); // Assuming a view exists at resources/views/schools/show.blade.php
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school)
    {
        return view('schools.edit', compact('school')); // Assuming a view exists at resources/views/schools/edit.blade.php
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'street_address' => 'required|string|max:255',
        ]);

        $school->update($request->all());

        return redirect()->route('schools.schools')->with('success', 'School updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school)
    {
        $school->delete();

        return redirect()->route('schools.index')->with('success', 'School deleted successfully!');
    }
}
