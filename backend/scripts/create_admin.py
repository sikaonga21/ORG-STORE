import sys
from getpass import getpass
from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine, Base
from backend.models.admin import Admin

def create_admin():
    print("=== Create Admin User ===\n")
    
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        username = input("Enter username: ").strip()
        if not username:
            print("Username cannot be empty!")
            return
        
        existing_admin = db.query(Admin).filter(Admin.username == username).first()
        if existing_admin:
            print(f"Admin with username '{username}' already exists!")
            return
        
        email = input("Enter email: ").strip()
        if not email:
            print("Email cannot be empty!")
            return
        
        existing_email = db.query(Admin).filter(Admin.email == email).first()
        if existing_email:
            print(f"Admin with email '{email}' already exists!")
            return
        
        full_name = input("Enter full name (optional): ").strip() or None
        
        password = getpass("Enter password: ")
        password_confirm = getpass("Confirm password: ")
        
        if password != password_confirm:
            print("Passwords do not match!")
            return
        
        if len(password) < 6:
            print("Password must be at least 6 characters long!")
            return
        
        hashed_password = Admin.get_password_hash(password)
        admin = Admin(
            username=username,
            email=email,
            full_name=full_name,
            hashed_password=hashed_password
        )
        
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        print(f"\nAdmin user '{username}' created successfully!")
        print(f"  ID: {admin.id}")
        print(f"  Email: {admin.email}")
        if admin.full_name:
            print(f"  Full Name: {admin.full_name}")
        
    except KeyboardInterrupt:
        print("\n\nOperation cancelled.")
        sys.exit(0)
    except Exception as e:
        print(f"\nError creating admin: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
