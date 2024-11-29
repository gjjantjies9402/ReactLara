<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    /**
     * Display a listing of schools.
     */
    public function index()
    {
        $schools = School::all();
        return Inertia::render('Schools/Schools', [
            'schools' => $schools
        ]);
    }

    /**
     * Show the form for creating a new school.
     */
    public function create()
    {
        return Inertia::render('Schools/Create'); 
    }

    /**
     * Store a newly created school in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:schools,email',
            'location' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $school = School::create([
            'email' => $request->email,
            'location' => $request->location,
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'School created successfully!',
            'school' => $school
        ], 201);
    }

    /**
     * Show the specified school details.
     */
    public function show(School $school)
    {
        return Inertia::render('Schools/Show', ['school' => $school]);
    }

    /**
     * Show the form for editing the specified school.
     */
    public function edit(School $school)
    {
        return Inertia::render('Schools/SchoolEdit', ['school' => $school]); 
    }

    /**
     * Update the specified school in storage.
     */
    public function update(Request $request, School $school)
    {
        $request->validate([
            'email' => 'required|email|max:255|unique:schools,email,' . $school->id,
            'location' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $school->update([
            'email' => $request->email,
            'location' => $request->location,
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'School updated successfully!',
            'school' => $school,
        ], 200);
    }

    /**
     * Remove the specified school from storage.
     */
    public function destroy(School $school)
    {
        $school->delete();

        return response()->json([
            'message' => 'School deleted successfully!',
        ], 200);
    }

    /**
     * Upload and process a CSV file.
     */
    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
        ]);

        $file = $request->file('csv_file');
        $schools = [];

        // Process the CSV file
        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            $header = fgetcsv($handle); // Assuming the first row is the header
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $schoolData = array_combine($header, $row);
                $schools[] = $schoolData;

                // Insert each row into the database
                School::create([
                    
                    'email' => $schoolData['email'] ?? '',
                    'location' => $schoolData['location'] ?? '',
                    'name' => $schoolData['name'] ?? '',
                    'status' => $schoolData['status'] ?? 'inactive',
                ]);
            }
            fclose($handle);
        }

        return response()->json([
            'message' => 'CSV uploaded and processed successfully!',
            'schools' => $schools,
        ], 200);
    }
}
