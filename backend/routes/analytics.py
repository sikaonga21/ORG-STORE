from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from ..database import get_db
from ..models.organization import Organization
from ..models.project import Project, ProjectStatus
from ..models.activity import Activity
from ..models.admin import Admin
from ..schemas.analytics import AnalyticsResponse
from ..utils.auth import get_current_admin

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/", response_model=AnalyticsResponse)
async def get_analytics(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    total_organizations = db.query(func.count(Organization.id)).scalar()
    
    total_projects = db.query(func.count(Project.id)).scalar()
    ongoing_projects = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.ONGOING
    ).scalar()
    completed_projects = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.COMPLETED
    ).scalar()
    planned_projects = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.PLANNED
    ).scalar()
    on_hold_projects = db.query(func.count(Project.id)).filter(
        Project.status == ProjectStatus.ON_HOLD
    ).scalar()
    
    total_activities = db.query(func.count(Activity.id)).scalar()
    
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_activities_count = db.query(func.count(Activity.id)).filter(
        Activity.created_at >= thirty_days_ago
    ).scalar()
    
    return AnalyticsResponse(
        total_organizations=total_organizations or 0,
        total_projects=total_projects or 0,
        ongoing_projects=ongoing_projects or 0,
        completed_projects=completed_projects or 0,
        planned_projects=planned_projects or 0,
        on_hold_projects=on_hold_projects or 0,
        total_activities=total_activities or 0,
        recent_activities_count=recent_activities_count or 0
    )
