@echo off
setlocal

echo Starting database reset and seed process...

:: Navigate to the app directory (one level up from the scripts directory)
cd /d "%~dp0\.."

:: Clean up broken migrations (Error: P3015)
echo Checking for invalid migration directories...
for /d %%i in (prisma\migrations\*) do (
    if not exist "%%i\migration.sql" (
        echo Deleting invalid migration directory ^(missing migration.sql^): %%i
        rmdir /s /q "%%i"
    )
)

:: Reset the database, apply all migrations, and run the seed script
echo Running Prisma migrate reset (this drops the DB, recreates schemas from migrations, and runs seeding)...
call npx prisma migrate reset --force

:: Regenerate the Prisma client
echo Generating Prisma client...
call npx prisma generate

:: Seed the database explicitly
echo Seeding the database...
call npx prisma db seed

echo Database reset, migrations applied, and reseeding completed successfully!
endlocal
