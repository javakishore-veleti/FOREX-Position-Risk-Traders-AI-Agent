from sqlmodel import SQLModel, create_engine, Session

sqlite_url = "sqlite:///db.sqlite3"
engine = create_engine(sqlite_url, echo=True)

def get_session():
    return Session(engine)

def init_db():
    import models.trader_model
    import models.book_model
    import models.customer_model
    import models.trade_model
    SQLModel.metadata.create_all(engine)
