<?php

namespace Tests\Feature;

use App\Models\School;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Inertia;
use Illuminate\Foundation\Testing\WithFaker;

class SchoolControllerTest extends TestCase
{
    use RefreshDatabase; // This will refresh the database between tests

    /**
     * Test that the index method returns the correct view with schools.
     */
    public function test_index_returns_schools_view()
    {
        // Arrange: Create some schools using factory or manually
        $school = School::factory()->create();

        // Act: Hit the index route
        $response = $this->get(route('schools.index'));

        // Assert: The response is successful and contains the correct view and data
        $response->assertStatus(200);
        $response->assertViewIs('schools.index');
        $response->assertViewHas('schools'); // Check if 'schools' is passed to the view
    }

    /**
     * Test that the store method creates a new school.
     */
    public function test_store_creates_school()
    {
        // Arrange: School data to post
        $schoolData = [
            'name' => 'Test School',
            'province' => 'Test Province',
            'city' => 'Test City',
            'street_address' => '123 Test Street'
        ];

        // Act: Post the data to the store route
        $response = $this->post(route('schools.store'), $schoolData);

        // Assert: The new school is created in the database and redirected to the schools list
        $response->assertRedirect(route('schools.index'));
        $this->assertDatabaseHas('schools', $schoolData);
    }

    /**
     * Test that the show method returns the correct view.
     */
    public function test_show_returns_school_view()
    {
        // Arrange: Create a school
        $school = School::factory()->create();

        // Act: Hit the show route for the specific school
        $response = $this->get(route('schools.show', $school));

        // Assert: The response contains the school data and the correct view
        $response->assertStatus(200);
        $response->assertViewIs('schools.show');
        $response->assertViewHas('school', $school);
    }

    /**
     * Test that the update method updates a school.
     */
    public function test_update_updates_school()
    {
        // Arrange: Create a school and prepare updated data
        $school = School::factory()->create();
        $updatedData = [
            'name' => 'Updated School Name',
            'province' => 'Updated Province',
            'city' => 'Updated City',
            'street_address' => '456 Updated Street'
        ];

        // Act: Hit the update route with the updated data
        $response = $this->put(route('schools.update', $school), $updatedData);

        // Assert: The school is updated in the database and redirected
        $response->assertRedirect(route('schools.index'));
        $this->assertDatabaseHas('schools', $updatedData);
    }

    /**
     * Test that the destroy method deletes a school.
     */
    public function test_destroy_deletes_school()
    {
        // Arrange: Create a school
        $school = School::factory()->create();

        // Act: Hit the destroy route for the specific school
        $response = $this->delete(route('schools.destroy', $school));

        // Assert: The school is deleted from the database
        $response->assertRedirect(route('schools.index'));
        $this->assertDatabaseMissing('schools', ['id' => $school->id]);
    }
}
