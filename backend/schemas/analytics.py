from pydantic import BaseModel


class AnalyticsResponse(BaseModel):
    total_organizations: int
    total_projects: int
    ongoing_projects: int
    completed_projects: int
    planned_projects: int
    on_hold_projects: int
    total_activities: int
    recent_activities_count: int
