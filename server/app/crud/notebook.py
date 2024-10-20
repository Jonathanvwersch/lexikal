from sqlalchemy.orm import Session
from ..models import notebook
from ..schemas import notebook as notebook_schema

def get_notebook(db: Session, notebook_id: int):
    return db.query(notebook.Notebook).filter(notebook.Notebook.id == notebook_id).first()

def get_notebooks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(notebook.Notebook).offset(skip).limit(limit).all()

def create_notebook(db: Session, notebook: notebook_schema.NotebookPostRequest):
    db_notebook = notebook.Notebook(title=notebook.name, content="")
    db.add(db_notebook)
    db.commit()
    db.refresh(db_notebook)
    return db_notebook

