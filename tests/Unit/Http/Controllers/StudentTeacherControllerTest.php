<?php

namespace Tests\Feature;

use App\Models\StudentTeacher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentTeacherControllerTest extends TestCase
{
    use RefreshDatabase; // This will reset the database after each test

    /** @test */
    public function it_can_store_a_student_teacher()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'school_id' => 1, // Ensure a valid school exists in the database
        ];

        $response = $this->post(route('student-teachers.store'), $data);

        // Check if the student-teacher was successfully stored
        $response->assertStatus(201); // 201 Created status
        $this->assertDatabaseHas('student_teachers', $data); // Check if the record is in the database
    }

    /** @test */
    public function it_can_update_a_student_teacher()
    {
        $studentTeacher = StudentTeacher::factory()->create();

        $updatedData = [
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
        ];

        $response = $this->put(route('student-teachers.update', $studentTeacher->id), $updatedData);

        $response->assertStatus(200); // 200 OK status
        $this->assertDatabaseHas('student_teachers', $updatedData); // Check if the updated data exists
    }

    /** @test */
    public function it_can_delete_a_student_teacher()
    {
        $studentTeacher = StudentTeacher::factory()->create();

        $response = $this->delete(route('student-teachers.destroy', $studentTeacher->id));

        $response->assertStatus(200); // 200 OK status
        $this->assertDeleted($studentTeacher); // Check if the record was deleted
    }
}
