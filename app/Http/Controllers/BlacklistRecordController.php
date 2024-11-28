<?php

namespace App\Http\Controllers;

use App\Models\BlacklistRecord;
use App\Models\School;
use App\Models\StudentTeacher;
use Illuminate\Http\Request;

class BlacklistRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blacklistRecords = BlacklistRecord::with(['school', 'studentTeacher'])->get();
        return view('blacklistRecords.index', compact('blacklistRecords')); // View for listing blacklist records
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $schools = School::all();
        $studentTeachers = StudentTeacher::all();
        return view('blacklistRecords.create', compact('schools', 'studentTeachers')); // View for creating a new blacklist record
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_teacher_id' => 'required|exists:student_teachers,id',
            'school_id' => 'required|exists:schools,id',
            'reason' => 'required|string|max:1000',
            'proof' => 'nullable|file|mimes:jpg,jpeg,png,mp3,mp4|max:20480', // Max 20 MB
        ]);

        $data = $request->all();

        if ($request->hasFile('proof')) {
            $data['proof'] = $request->file('proof')->store('proofs', 'public'); // Store file in 'storage/app/public/proofs'
        }

        BlacklistRecord::create($data);

        return redirect()->route('blacklistRecords.index')->with('success', 'Blacklist record created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlacklistRecord $blacklistRecord)
    {
        return view('blacklistRecords.show', compact('blacklistRecord')); // View for displaying a single blacklist record
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlacklistRecord $blacklistRecord)
    {
        $schools = School::all();
        $studentTeachers = StudentTeacher::all();
        return view('blacklistRecords.edit', compact('blacklistRecord', 'schools', 'studentTeachers')); // View for editing a blacklist record
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlacklistRecord $blacklistRecord)
    {
        $request->validate([
            'student_teacher_id' => 'required|exists:student_teachers,id',
            'school_id' => 'required|exists:schools,id',
            'reason' => 'required|string|max:1000',
            'proof' => 'nullable|file|mimes:jpg,jpeg,png,mp3,mp4|max:20480',
        ]);

        $data = $request->all();

        if ($request->hasFile('proof')) {
            // Delete the old proof file if it exists
            if ($blacklistRecord->proof && file_exists(storage_path('app/public/' . $blacklistRecord->proof))) {
                unlink(storage_path('app/public/' . $blacklistRecord->proof));
            }
            $data['proof'] = $request->file('proof')->store('proofs', 'public');
        }

        $blacklistRecord->update($data);

        return redirect()->route('blacklistRecords.index')->with('success', 'Blacklist record updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlacklistRecord $blacklistRecord)
    {
        // Delete the associated proof file if it exists
        if ($blacklistRecord->proof && file_exists(storage_path('app/public/' . $blacklistRecord->proof))) {
            unlink(storage_path('app/public/' . $blacklistRecord->proof));
        }

        $blacklistRecord->delete();

        return redirect()->route('blacklistRecords.index')->with('success', 'Blacklist record deleted successfully!');
    }
}
