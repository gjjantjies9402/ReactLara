<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    
    
        public function index()
        {
            $schools = School::all();
            return Inertia::render('Schools/Schools', [
                'schools' => $schools
            ]);
        }
  
    public function create()
    {
        return view('schools.create'); 
    }

    public function store(Request $request)
    {
       
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'email' => 'required|email|unique:schools,email',
            'status' => 'required|in:active,inactive',
        ]);


        $school = School::create([
            'name' => $request->name,
            'location' => $request->location,
            'email' => $request->email,
            'status' => $request->status,
        ]);

        // Return a response with the created school data
        return response()->json($school, 201);
    }

 
    public function show(School $school)
    {
        return view('schools.show', compact('school')); 
    }

  
    public function edit(School $school)
    {
        return view('schools.edit', compact('school')); 
    }

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


    public function destroy(School $school)
    {
        $school->delete();

        return redirect()->route('schools.index')->with('success', 'School deleted successfully!');
    }
}
