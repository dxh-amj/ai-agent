## Getting Started

First, login into devxhub-docker:

```bash
docker login -u devxhublimited
password: Ask to administrator.
```

Copy `.env.example` to `.env.local` and Run this command for start the project:

```bash
make dev
```

After that run this command:

```bash
make shell
python manage.py createsuperuser
python manage.py company
python manage.py load_countries
python manage.py load_timezones
python manage.py loaddata apps/core/fixtures/core.json
python manage.py loaddata core.json
```

To clean docker and delete volumes

```bash
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -q) -f
docker volume rm $(docker volume ls -q)
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

# modernize-nextjs

### Check Mail

`http://localhost:8025/`

### Admin Panel

`http://localhost:8000/en/admin`

## 📁 Route Generator

The route generator automatically creates new admin modules with all necessary
files and components.

### ✅ Step 1: Set Up Permissions

Run this command **only once** to give the script permission to run:

```bash
chmod +x route-generator.sh
```

### ✅ Step 2: Generate a New Route

Use the Makefile to create a new admin module:

```bash
make route name
```

### ✅ Step 3: What Gets Created

The generator creates a complete admin module with:

```
src/modules/your-module-name/
├── create/
│   ├── Create.tsx          # Create dialog component
│   ├── hooks.ts            # Create functionality hooks
│   └── schema.ts           # Form validation schema
├── update/
│   ├── Update.tsx          # Update dialog component
│   ├── hooks.ts            # Update functionality hooks
│   └── schema.ts           # Update validation schema
├── delete/
│   ├── Delete.tsx          # Delete confirmation dialog
│   └── hooks.ts            # Delete functionality hooks
├── details/
│   ├── Details.tsx         # Details view component
│   ├── hooks.ts            # Details data hooks
│   └── info-section.tsx    # Info display component
├── list/
│   ├── List.tsx            # Data table component
│   ├── hook.ts             # List data hooks
│   └── utils.ts            # Filter utilities
├── types.ts                # TypeScript interfaces
└── index.ts                # Module exports

src/services/your-module-name/
└── service.ts              # API service functions
```

### ✅ Step 4: Check Your Project

- Restart the IDE

After generation, you'll find:

- Route under `src/app/(protected)` folder
- New module folder in `src/modules/`
- Service files in `src/services/`
- All components ready to use
- TypeScript types defined
- API integration ready

**Need Help?** Check the Existing code under
`src/modules/manage-company`examples.

---

## 📄 License

This project is licensed under the MIT License.
