from pydantic import BaseModel, EmailStr
from typing import Optional

class Customer(BaseModel):
    customer_id: str
    full_name: str
    company: Optional[str]
    city: str
    country: str
    phone_1: Optional[str]
    phone_2: Optional[str]
    email: EmailStr
    subscription_date: str
    website: Optional[str]
