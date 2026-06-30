# Database Scripts

This folder contains scripts to reset and reseed your database depending on your operating system.

## MacOS / Linux

To run the full database reset (applies migrations and reseeds database) on macOS or Linux, use the `reset-db.sh` script.

**Important:** You must first ensure the script has execution permissions:

```bash
chmod +x doctor-patient-app/scripts/reset-db.sh
```

Then you can run the script:

```bash
./doctor-patient-app/scripts/reset-db.sh
```

## Windows

To run the full database reset on Windows, use the `reset-db.bat` script. You do not need elevated permissions to run this batch file.

Just run this command in your command prompt or PowerShell:

```cmd
.\doctor-patient-app\scripts\reset-db.bat
```

> **Note:** These scripts use Prisma under the hood to completely drop the current database structure, apply all existing migrations from start to finish, run the defined seeding logic, and generate an updated Prisma client automatically.