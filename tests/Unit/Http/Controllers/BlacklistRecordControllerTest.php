<?php

namespace Tests\Feature;

use App\Models\BlacklistRecord;
use App\Models\School;
use App\Models\StudentTeacher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlacklistRecordControllerTest extends TestCase
{
    use RefreshDatabase; // This will reset the database after each test

    /** @test */
    public function it_can_store_a_blacklist_record()
    {
        // Setup: Create required models
        $school = School::factory()->create();
        $studentTeacher = StudentTeacher::factory()->create();

        // Data for creating a blacklist record
        $data = [
            'school_id' => $school->id,
            'student_teacher_id' => $studentTeacher->id,
            'reason' => 'Inappropriate behavior',
        ];

        // Perform the POST request to store the record
        $response = $this->post(route('blacklist-records.store'), $data);

        // Assertions: Verify status and database entry
        $response->assertStatus(201); // 201 Created status
        $this->assertDatabaseHas('blacklist_records', $data); // Check if the record is in the database
    }

    /** @test */
    public function it_can_update_a_blacklist_record()
    {
        // Setup: Create a blacklist record
        $blacklistRecord = BlacklistRecord::factory()->create();

        // Data for updating the record
        $updatedData = [
            'reason' => 'Misconduct',
        ];

        // Perform the PUT request to update the record
        $response = $this->put(route('blacklist-records.update', $blacklistRecord->id), $updatedData);

        // Assertions: Verify status and database update
        $response->assertStatus(200); // 200 OK status
        $this->assertDatabaseHas('blacklist_records', $updatedData); // Check if the updated record is in the database
    }

    /** @test */
    public function it_can_delete_a_blacklist_record()
    {
        // Setup: Create a blacklist record
        $blacklistRecord = BlacklistRecord::factory()->create();

        // Perform the DELETE request to remove the record
        $response = $this->delete(route('blacklist-records.destroy', $blacklistRecord->id));

        // Assertions: Verify status and database deletion
        $response->assertStatus(200); // 200 OK status
        $this->assertDeleted($blacklistRecord); // Check if the record was deleted from the database
    }
}
