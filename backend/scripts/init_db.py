from backend.database import engine, Base
from backend.models.admin import Admin
from backend.models.organization import Organization
from backend.models.project import Project
from backend.models.activity import Activity

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")
    print("\nTables created:")
    print("  - admins")
    print("  - organizations")
    print("  - projects")
    print("  - activities")
    print("\nNext step: Create an admin user using:")
    print("  python -m backend.scripts.create_admin")

if __name__ == "__main__":
    init_db()
