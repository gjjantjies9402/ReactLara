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
        ]);

        StudentTeacher::create($request->all());

        return redirect()->route('studentTeachers.index')->with('success', 'Student Teacher added successfully!');
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
