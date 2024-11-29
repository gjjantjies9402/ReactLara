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

#  Student Teachers Blacklist Management System  

This project is a Laravel-based web application to manage student teachers, schools, and blacklist records. It uses SQLite as the database.  

## Prerequisites  

Ensure the following are installed on your system:  
- [PHP 8.1+](https://www.php.net/)  
- [Composer](https://getcomposer.org/)  
- [Node.js 18+](https://nodejs.org/)  
- SQLite (comes pre-installed with most PHP distributions)  

## Installation  
  # use the files in the CSV files folder to upload to bulk info
### Clone the Repository  
```bash  
git clone <repository-url>  
cd <repository-folder>  
```  

### Install PHP Dependencies  
```bash  
composer install  
```  

### Install JavaScript Dependencies  
```bash  
npm install  
```  

### Setup Environment Variables  
Copy the `.env.example` file to `.env` and configure it:  
```bash  
cp .env.example .env  
```  

Update the database configuration in `.env`:  
```env  
DB_CONNECTION=sqlite  
DB_DATABASE=/absolute/path/to/database.sqlite  
```  

> **Note:** Create the `database.sqlite` file in your project directory if it doesn't exist:  
> ```bash  
> touch database/database.sqlite  
> ```  

### Run Migrations and Seeders  
Run the migrations to create database tables:  
```bash  
php artisan migrate  
```  

(Optional) Seed the database with sample data:  
```bash  
php artisan db:seed  
```  

### Build Frontend Assets  
```bash  
npm run dev  
```  

## Running the Application  

Start the local development server:  
```bash  
php artisan serve  
```  

Visit [http://127.0.0.1:8000](http://127.0.0.1:8000) to access the application.  

## Features  
- Add, view, update, and delete student teachers.  
- Assign student teachers to schools.  
- Upload CSV files to bulk import data.  
- Manage blacklist records.  
- View statistics on the dashboard with charts.  

## Troubleshooting  

### Common Errors  
- **`[vite] Failed to resolve import`**  
  Ensure `npm run dev` is running while accessing the application.  

- **Database not found**  
  Verify the `DB_DATABASE` path in `.env` and ensure the `database.sqlite` file exists.



