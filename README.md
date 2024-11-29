# Blacklist
Develop a system that will be used to blacklist student teachers for bad behavior. The system will keep record of numerous student teachers and numerous schools in South Africa.

The system should have authentication in place so that only authorized users can use it. There is no need for sign-up functionality.
The system should allow a logged-in user to import a list of student teachers in bulk. This can either be a simple CSV import with a list of student teachers.
A logged in user should be able to manually add, edit and delete a school or student teacher
The system should allow searching records. In other words, I should be able to search for a specific school by name or a student teacher by name
A user should be able to blacklist a student because of bad behavior at a school. A blacklisting record should contain the reason for blacklisting, the school where bad behavior was recorded, any pictures or proof of such bad behavior can be uploaded (images, voice recording, etc)
Student teacher records should contain the following information: First name, Last name, Location (Province, City, Street Address, etc), University
A school records should contain at least the following information: School name and Location
When navigating to the school’s page, I should be able to access a list of student teachers that have been blacklisted by the school
When navigating to a specific student teacher page, I should see a list of all school that have blacklisted the student teacher, and be able to expand each blacklisting item to see all the details if need be
