<?php

namespace App\Http\Controllers;

use App\Models\StudentTeacher;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentTeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studentTeachers = StudentTeacher::all();
        return Inertia::render('StudentTeachers/StudentTeachers', [
            'studentTeachers' => $studentTeachers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('StudentTeachers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'location_province' => 'required|string|max:255',
            'location_city' => 'required|string|max:255',
            'location_street' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'status' => 'required|in:blacklisted,notblacklisted',
            'school_id' => 'required|exists:schools,id', // Ensure school_id exists
        ]);
    
        // Get the school name from the schools table
        $school = School::findOrFail($request->school_id);
        $school_name = $school->name; // Assuming the school name is stored in the `name` column
    
        // Create the StudentTeacher
        $studentTeacher = StudentTeacher::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'location_province' => $request->location_province,
            'location_city' => $request->location_city,
            'location_street' => $request->location_street,
            'university' => $request->university,
            'status' => $request->status,
            'school_id' => $request->school_id,
            'school_name' => $school_name, // Store the school name
        ]);
    
        return redirect()->route('student-teachers.index')->with('success', 'Student Teacher added successfully!');
    }
    /**
     * Display the specified resource.
     */
    public function show(StudentTeacher $studentTeacher)
    {
        return Inertia::render('StudentTeachers/Show', [
            'studentTeacher' => $studentTeacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentTeacher $studentTeacher)
    {
        return Inertia::render('StudentTeachers/StudentTeachers', [
            'studentTeacher' => $studentTeacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentTeacher $studentTeacher)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'location_province' => 'required|string|max:255',
            'location_city' => 'required|string|max:255',
            'location_street' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'status' => 'required|in:blacklisted,notblacklisted',
            'school_id' => 'required|exists:schools,id', // Ensure school_id exists
        ]);
    
        // Get the school name from the schools table
        $school = School::findOrFail($request->school_id);
        $school_name = $school->name;
    
        // Update the StudentTeacher
        $studentTeacher->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'location_province' => $request->location_province,
            'location_city' => $request->location_city,
            'location_street' => $request->location_street,
            'university' => $request->university,
            'status' => $request->status,
            'school_id' => $request->school_id,
            'school_name' => $school_name, // Update the school name
        ]);
    
        return redirect()->route('student-teachers.index')->with('success', 'Student Teacher updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentTeacher $studentTeacher)
    {
        $studentTeacher->delete();

        return redirect()->route('studentTeachers.index')->with('success', 'Student Teacher deleted successfully!');
    }

    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
        ]);

        $file = $request->file('csv_file');
        $student_teachers = [];

        // Process the CSV file
        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            $header = fgetcsv($handle); // Assuming the first row is the header
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $studentTeachersData = array_combine($header, $row);
                $student_teachers[] = $studentTeachersData;

                // Insert each row into the database
                StudentTeacher::create([
                    'first_name' => $studentTeachersData['first_name'] ?? '',
                    'last_name' => $studentTeachersData['last_name'] ?? '',
                    'location_province' => $studentTeachersData['location_province'] ?? '',
                    'location_city' => $studentTeachersData['location_city'] ?? '',
                    'location_street' => $studentTeachersData['location_street'] ?? '',
                    'university' => $studentTeachersData['university'] ?? '',
                    'school_id' => $studentTeachersData['school_id'] ?? '',
                    'status' => $studentTeachersData['status'] ?? 'notblacklisted',
                ]);
            }
            fclose($handle);
        }

        return response()->json([
            'message' => 'CSV uploaded and processed successfully!',
            'student_teachers' => $student_teachers,
        ], 200);
    }
}
