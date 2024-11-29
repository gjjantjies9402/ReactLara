<?php

namespace App\Http\Controllers;

use App\Models\BlacklistRecord;
use App\Models\School;
use App\Models\StudentTeacher;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BlacklistRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blacklistRecords = BlacklistRecord::with(['school', 'studentTeacher'])->get();
        return Inertia::render('BlacklistRecord/BlacklistRecord', [
            'blacklistRecords' => $blacklistRecords,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $schools = School::all();
        $studentTeachers = StudentTeacher::all();
        return Inertia::render('BlacklistRecords/Create', [
            'schools' => $schools,
            'studentTeachers' => $studentTeachers,
        ]);
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
        return Inertia::render('BlacklistRecords/Show', [
            'blacklistRecord' => $blacklistRecord,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlacklistRecord $blacklistRecord)
    {
        $schools = School::all();
        $studentTeachers = StudentTeacher::all();
        return Inertia::render('BlacklistRecords/Edit', [
            'blacklistRecord' => $blacklistRecord,
            'schools' => $schools,
            'studentTeachers' => $studentTeachers,
        ]);
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
    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
        ]);

        $file = $request->file('csv_file');
        $blacklist = [];

        // Process the CSV file
        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            $header = fgetcsv($handle); // Assuming the first row is the header
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $blacklistedData = array_combine($header, $row);
                $blacklist[] = $blacklistedData;

                // Insert each row into the database
                StudentTeacher::create([
                    'student_teacher_id' => $blacklistedData['student_teacher_id'] ?? '',
                    'school_id' => $blacklistedData['school_id'] ?? '',
                    'reason' => $blacklistedData['reason'] ?? '',
                    'proof' => $blacklistedData['proof'] ?? '',
                    ]);
            }
            fclose($handle);
        }

        return response()->json([
            'message' => 'CSV uploaded and processed successfully!',
            'blacklist' => $blacklist,
        ], 200);
    }
}
