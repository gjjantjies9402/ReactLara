<?php

namespace App\Http\Controllers;

use App\Models\StudentTeacher;
use Illuminate\Http\Request;

class StudentTeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studentTeachers = StudentTeacher::all();
        return view('studentTeachers.index', compact('studentTeachers')); // View for listing student teachers
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('studentTeachers.create'); // View for creating a new student teacher
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
        ]);

        StudentTeacher::create($request->all());

        return redirect()->route('studentTeachers.index')->with('success', 'Student Teacher added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentTeacher $studentTeacher)
    {
        return view('studentTeachers.show', compact('studentTeacher')); // View for displaying a single student teacher's details
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentTeacher $studentTeacher)
    {
        return view('studentTeachers.edit', compact('studentTeacher')); // View for editing a student teacher
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
        ]);

        $studentTeacher->update($request->all());

        return redirect()->route('studentTeachers.index')->with('success', 'Student Teacher updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentTeacher $studentTeacher)
    {
        $studentTeacher->delete();

        return redirect()->route('studentTeachers.index')->with('success', 'Student Teacher deleted successfully!');
    }
}
