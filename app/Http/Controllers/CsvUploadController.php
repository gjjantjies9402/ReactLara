<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CsvUploadController extends Controller
{
    public function uploadCsv(Request $request) {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
        ]);
    
        return response()->json(['message' => 'CSV uploaded successfully']);
    }
    
}
